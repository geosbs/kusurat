import type { Article } from "@prisma/client";
import { articlePath } from "@/lib/categories";
import { SITE } from "@/lib/site";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidSlug(value: string) {
  return SLUG_PATTERN.test(value) && value.length <= 96;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function publicArticleListItem(article: Article) {
  return {
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    category: article.category,
    coverImage: article.coverImage,
    url: `${SITE.url}${articlePath(article.category, article.slug)}`,
    publishedAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  };
}

export function publicArticleDetail(article: Article) {
  return {
    ...publicArticleListItem(article),
    content: article.content,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
  };
}

export function jsonHeaders() {
  return {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "same-origin",
  };
}
