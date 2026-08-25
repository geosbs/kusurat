import type { ArticleStatus, Category } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { excerptFromContent, looksLikeHtml, sanitizeArticleHtml } from "@/lib/html-content";
import { nextQueueSlot } from "@/lib/queue";
import { isCategory } from "@/lib/categories";
import { slugify } from "@/lib/slugify";

const META_MAX = 320;
const COVER_WEBP = /\.webp(\?.*)?$/i;

export type PublishMode = "automatic" | "manual";

export type PostInput = {
  title: string;
  slug: string;
  mainSection: string;
  topic: string;
  metaDescription: string;
  coverImage: string;
  coverImageAlt: string;
  showCoverOnPost: boolean;
  content: string;
  schemaMarkup: string;
  publishMode: PublishMode;
  manualStatus?: ArticleStatus;
  manualPublishedAt?: string | null;
};

export function parsePostInput(body: unknown): { data?: PostInput; error?: string } {
  if (!body || typeof body !== "object") return { error: "Invalid payload" };
  const value = body as Record<string, unknown>;

  const title = typeof value.title === "string" ? value.title.trim() : "";
  const slugRaw = typeof value.slug === "string" ? value.slug.trim() : "";
  const mainSection = typeof value.mainSection === "string" ? value.mainSection : "";
  const topic = typeof value.topic === "string" ? value.topic.trim() : "";
  const metaDescription = typeof value.metaDescription === "string" ? value.metaDescription.trim() : "";
  const coverImage = typeof value.coverImage === "string" ? value.coverImage.trim() : "";
  const coverImageAlt = typeof value.coverImageAlt === "string" ? value.coverImageAlt.trim() : "";
  const showCoverOnPost = value.showCoverOnPost !== false;
  const content = typeof value.content === "string" ? value.content : "";
  const schemaMarkup = typeof value.schemaMarkup === "string" ? value.schemaMarkup.trim() : "";
  const publishMode = value.publishMode === "manual" ? "manual" : "automatic";

  if (title.length < 3) return { error: "Title must be at least 3 characters." };
  if (!isCategory(mainSection.toUpperCase()) && !isCategory(mainSection)) {
    const mapped = mapMainSection(mainSection);
    if (!mapped) return { error: "Please choose a valid main section." };
  }
  if (!coverImage) return { error: "Cover image is required." };
  if (!COVER_WEBP.test(coverImage)) return { error: "Cover image must be a .webp file." };
  if (metaDescription.length > META_MAX) return { error: `Meta description must be ${META_MAX} characters or fewer.` };
  if (!content.trim()) return { error: "Content cannot be empty." };

  if (schemaMarkup) {
    try {
      const parsed = JSON.parse(schemaMarkup);
      if (!parsed || typeof parsed !== "object") return { error: "Schema markup must be a JSON object." };
    } catch {
      return { error: "Schema markup must be valid JSON." };
    }
  }

  let manualStatus: ArticleStatus | undefined;
  let manualPublishedAt: string | null | undefined;
  if (publishMode === "manual") {
    const status = value.manualStatus;
    if (status !== "PUBLISHED" && status !== "SCHEDULED" && status !== "DRAFT") {
      return { error: "Please choose a valid manual status." };
    }
    manualStatus = status;
    manualPublishedAt = typeof value.manualPublishedAt === "string" ? value.manualPublishedAt : null;
    if (status === "SCHEDULED" && !manualPublishedAt) {
      return { error: "Scheduled posts need a publish date." };
    }
  }

  return {
    data: {
      title,
      slug: slugify(slugRaw || title),
      mainSection,
      topic,
      metaDescription,
      coverImage,
      coverImageAlt,
      showCoverOnPost,
      content,
      schemaMarkup,
      publishMode,
      manualStatus,
      manualPublishedAt,
    },
  };
}

export function mapMainSection(value: string): Category | null {
  const key = value.trim().toUpperCase().replace(/Ü/g, "UE").replace(/Ä/g, "AE");
  if (key === "ENTRÜMPELUNG" || key === "ENTRUEMPUNG" || key === "ENTRUEMPELUNG") return "ENTRUEMPELUNG";
  if (key === "RÄUMUNG" || key === "RAEUMUNG") return "RAEUMUNG";
  if (key === "NACHHALTIGKEIT") return "NACHHALTIGKEIT";
  if (key === "RATGEBER") return "RATGEBER";
  if (isCategory(value)) return value;
  if (isCategory(value.toUpperCase())) return value.toUpperCase() as Category;
  return null;
}

export async function uniqueSlug(base: string, excludeId?: string) {
  const root = slugify(base) || "post";
  let candidate = root;
  let n = 2;
  while (true) {
    const existing = await prisma.article.findUnique({ where: { slug: candidate }, select: { id: true } });
    if (!existing || existing.id === excludeId) return candidate;
    candidate = `${root}-${n}`;
    n += 1;
  }
}

export async function resolvePublishState(input: PostInput, excludeId?: string) {
  if (input.publishMode === "manual") {
    const status = input.manualStatus ?? "DRAFT";
    if (status === "DRAFT") {
      return {
        status: "DRAFT" as const,
        published: false,
        publishedAt: input.manualPublishedAt ? new Date(input.manualPublishedAt) : null,
      };
    }
    if (status === "PUBLISHED") {
      return {
        status: "PUBLISHED" as const,
        published: true,
        publishedAt: input.manualPublishedAt ? new Date(input.manualPublishedAt) : new Date(),
      };
    }
    return {
      status: "SCHEDULED" as const,
      published: false,
      publishedAt: new Date(input.manualPublishedAt as string),
    };
  }

  const occupiedRows = await prisma.article.findMany({
    where: {
      publishedAt: { not: null },
      status: { in: ["SCHEDULED", "PUBLISHED"] },
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
    select: { publishedAt: true },
  });
  const occupied = occupiedRows
    .map((row) => row.publishedAt)
    .filter((value): value is Date => value instanceof Date);

  const slot = nextQueueSlot(occupied, new Date());
  const now = Date.now();
  if (slot.getTime() <= now) {
    return { status: "PUBLISHED" as const, published: true, publishedAt: slot };
  }
  return { status: "SCHEDULED" as const, published: false, publishedAt: slot };
}

export function toArticleData(input: PostInput, publish: Awaited<ReturnType<typeof resolvePublishState>>, slug: string) {
  const category = mapMainSection(input.mainSection);
  if (!category) throw new Error("Invalid main section");

  const content = looksLikeHtml(input.content) ? sanitizeArticleHtml(input.content) : input.content;
  const excerpt = excerptFromContent(content, input.metaDescription || input.title);

  return {
    title: input.title,
    slug,
    category,
    topic: input.topic,
    excerpt,
    content,
    coverImage: input.coverImage,
    coverImageAlt: input.coverImageAlt,
    showCoverOnPost: input.showCoverOnPost,
    metaTitle: input.title,
    metaDescription: input.metaDescription || excerpt.slice(0, META_MAX),
    schemaMarkup: input.schemaMarkup || null,
    status: publish.status,
    published: publish.published,
    publishedAt: publish.publishedAt,
  };
}
