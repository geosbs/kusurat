import { isDatabaseUnreachable, prisma } from "@/lib/prisma";

export async function promoteDueArticles() {
  const now = new Date();
  try {
    await prisma.article.updateMany({
      where: {
        status: "SCHEDULED",
        publishedAt: { lte: now },
      },
      data: {
        status: "PUBLISHED",
        published: true,
      },
    });
  } catch (error) {
    if (!isDatabaseUnreachable(error)) {
      console.error("promoteDueArticles", error);
    }
  }
}

export function liveArticleWhere() {
  const now = new Date();
  return {
    status: "PUBLISHED" as const,
    publishedAt: { lte: now },
  };
}
