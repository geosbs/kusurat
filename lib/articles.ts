import type { Category } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
import { isDatabaseUnreachable, prisma } from "@/lib/prisma";
import { liveArticleWhere, promoteDueArticles } from "@/lib/live-articles";

async function readyLiveQuery() {
  noStore();
  await promoteDueArticles();
}

function logQueryError(label: string, error: unknown) {
  if (isDatabaseUnreachable(error)) return;
  console.error(label, error);
}

export async function getPublishedArticles() {
  await readyLiveQuery();
  try {
    return await prisma.article.findMany({
      where: liveArticleWhere(),
      orderBy: { publishedAt: "desc" },
    });
  } catch (error) {
    logQueryError("getPublishedArticles", error);
    return [];
  }
}

export async function getPublishedByCategory(category: Category) {
  await readyLiveQuery();
  try {
    return await prisma.article.findMany({
      where: { ...liveArticleWhere(), category },
      orderBy: { publishedAt: "desc" },
    });
  } catch (error) {
    logQueryError("getPublishedByCategory", error);
    return [];
  }
}

export async function getLatestArticles(limit = 6) {
  await readyLiveQuery();
  try {
    return await prisma.article.findMany({
      where: liveArticleWhere(),
      orderBy: { publishedAt: "desc" },
      take: clampLimit(limit, 1, 12),
    });
  } catch (error) {
    logQueryError("getLatestArticles", error);
    return [];
  }
}

export const CATEGORY_PAGE_SIZE = 20;

const LIST_SELECT = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  category: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
} as const;

function clampLimit(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.trunc(value)));
}

export type ArticleListCard = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: Category;
};

export async function getPublishedPage(options: { category?: Category; take?: number; cursor?: string }) {
  const take = clampLimit(options.take ?? CATEGORY_PAGE_SIZE, 1, CATEGORY_PAGE_SIZE);
  await readyLiveQuery();
  try {
    const rows = await prisma.article.findMany({
      where: {
        ...liveArticleWhere(),
        ...(options.category ? { category: options.category } : {}),
      },
      orderBy: [{ publishedAt: "desc" }, { id: "desc" }],
      take: take + 1,
      ...(options.cursor ? { cursor: { id: options.cursor }, skip: 1 } : {}),
      select: LIST_SELECT,
    });
    const hasMore = rows.length > take;
    const page = hasMore ? rows.slice(0, take) : rows;
    return {
      items: page.map((row) => ({
        id: row.id,
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt,
        category: row.category,
      })),
      hasMore,
      nextCursor: hasMore ? page[page.length - 1]?.id ?? null : null,
    };
  } catch (error) {
    logQueryError("getPublishedPage", error);
    return { items: [] as ArticleListCard[], hasMore: false, nextCursor: null as string | null };
  }
}

export async function getRelatedArticles(category: Category, slug: string, limit = 3) {
  await readyLiveQuery();
  try {
    return await prisma.article.findMany({
      where: { ...liveArticleWhere(), category, slug: { not: slug } },
      orderBy: { publishedAt: "desc" },
      take: clampLimit(limit, 1, 6),
    });
  } catch (error) {
    logQueryError("getRelatedArticles", error);
    return [];
  }
}

export async function getPublishedArticle(category: Category, slug: string) {
  await readyLiveQuery();
  try {
    return await prisma.article.findFirst({
      where: { ...liveArticleWhere(), category, slug },
    });
  } catch (error) {
    logQueryError("getPublishedArticle", error);
    return null;
  }
}
