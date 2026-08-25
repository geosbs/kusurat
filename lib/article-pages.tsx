import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Category } from "@prisma/client";
import { ArticleView } from "@/components/content/ArticleView";
import { getPublishedArticle } from "@/lib/articles";
import { articlePath } from "@/lib/categories";
import { brandedTitle, topicTitle } from "@/lib/seo";
import { SITE } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function createArticleMetadata(category: Category) {
  return async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getPublishedArticle(category, slug);
    if (!article) {
      return { title: "Beitrag nicht gefunden" };
    }

    const title = topicTitle(article.metaTitle || article.title);
    const description = article.metaDescription || article.excerpt;
    const path = articlePath(article.category, article.slug);
    const canonicalUrl = `${SITE.url}${path}`;
    const image = article.coverImage || "/hero.webp";
    const fullTitle = brandedTitle(title);

    return {
      title,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        type: "article",
        locale: SITE.locale,
        url: canonicalUrl,
        siteName: SITE.name,
        title: fullTitle,
        description,
        publishedTime: (article.publishedAt ?? article.createdAt).toISOString(),
        modifiedTime: article.updatedAt.toISOString(),
        images: [{ url: image, alt: article.coverImageAlt || article.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: fullTitle,
        description,
        images: [image],
      },
    };
  };
}

export function createArticlePage(category: Category) {
  return async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = await getPublishedArticle(category, slug);
    if (!article) notFound();
    return <ArticleView article={article} />;
  };
}
