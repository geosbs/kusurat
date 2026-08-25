import { getPublishedArticles } from "@/lib/articles";
import { articlePath, CATEGORY_LABEL } from "@/lib/categories";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const articles = await getPublishedArticles();
  const items = articles
    .map((article) => {
      const url = `${SITE.url}${articlePath(article.category, article.slug)}`;
      return `<item>
        <title>${escapeXml(article.title)}</title>
        <link>${escapeXml(url)}</link>
        <guid isPermaLink="true">${escapeXml(url)}</guid>
        <pubDate>${(article.publishedAt ?? article.createdAt).toUTCString()}</pubDate>
        <category>${escapeXml(CATEGORY_LABEL[article.category])}</category>
        <description>${escapeXml(article.excerpt)}</description>
      </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE.name)}</title>
    <link>${escapeXml(SITE.url)}</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>de-at</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
    },
  });
}
