import { PostsManager } from "@/components/admin/PostsManager";
import { prisma } from "@/lib/prisma";
import type { ArticleStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ tab?: string }>;
};

function whereForTab(tab: string | undefined): { status?: ArticleStatus } {
  if (tab === "published") return { status: "PUBLISHED" };
  if (tab === "queued") return { status: "SCHEDULED" };
  if (tab === "drafts") return { status: "DRAFT" };
  return {};
}

export default async function AdminPostsPage({ searchParams }: PageProps) {
  const { tab } = await searchParams;
  const active = tab === "published" || tab === "queued" || tab === "drafts" ? tab : "all";
  const posts = await prisma.article.findMany({
    where: whereForTab(active === "all" ? undefined : active),
    orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
  });

  return <PostsManager posts={posts} tab={active} />;
}
