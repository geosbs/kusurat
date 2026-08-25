import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/articles";
import { articlePath } from "@/lib/categories";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/ratgeber", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/entruempelung", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/raeumung", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/nachhaltigkeit", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/impressum", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/datenschutz", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/kontakt", priority: 0.4, changeFrequency: "yearly" as const },
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const articles = await getPublishedArticles();
  const articleEntries = articles.map((article) => ({
    url: `${SITE.url}${articlePath(article.category, article.slug)}`,
    lastModified: article.publishedAt ?? article.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...articleEntries];
}
