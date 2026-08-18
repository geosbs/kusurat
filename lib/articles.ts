import type { Category } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getPublishedArticles() {
  try {
    return await prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function getPublishedByCategory(category: Category) {
  try {
    return await prisma.article.findMany({
      where: { published: true, category },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function getLatestArticles(limit = 6) {
  try {
    return await prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getRelatedArticles(category: Category, slug: string, limit = 3) {
  try {
    return await prisma.article.findMany({
      where: { published: true, category, slug: { not: slug } },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getPublishedArticle(category: Category, slug: string) {
  try {
    return await prisma.article.findFirst({
      where: { published: true, category, slug },
    });
  } catch {
    return null;
  }
}
