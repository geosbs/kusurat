import type { Category } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getPublishedArticles() {
  noStore();
  try {
    return await prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("getPublishedArticles", error);
    return [];
  }
}

export async function getPublishedByCategory(category: Category) {
  noStore();
  try {
    return await prisma.article.findMany({
      where: { published: true, category },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("getPublishedByCategory", error);
    return [];
  }
}

export async function getLatestArticles(limit = 6) {
  noStore();
  try {
    return await prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch (error) {
    console.error("getLatestArticles", error);
    return [];
  }
}

export async function getRelatedArticles(category: Category, slug: string, limit = 3) {
  noStore();
  try {
    return await prisma.article.findMany({
      where: { published: true, category, slug: { not: slug } },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch (error) {
    console.error("getRelatedArticles", error);
    return [];
  }
}

export async function getPublishedArticle(category: Category, slug: string) {
  noStore();
  try {
    return await prisma.article.findFirst({
      where: { published: true, category, slug },
    });
  } catch (error) {
    console.error("getPublishedArticle", error);
    return null;
  }
}
