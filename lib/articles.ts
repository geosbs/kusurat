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
      take: limit,
    });
  } catch (error) {
    logQueryError("getLatestArticles", error);
    return [];
  }
}

export async function getRelatedArticles(category: Category, slug: string, limit = 3) {
  await readyLiveQuery();
  try {
    return await prisma.article.findMany({
      where: { ...liveArticleWhere(), category, slug: { not: slug } },
      orderBy: { publishedAt: "desc" },
      take: limit,
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
