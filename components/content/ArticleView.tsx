import type { Article } from "@prisma/client";
import Link from "next/link";
import { MarkdownContent } from "@/components/content/MarkdownContent";
import { getRelatedArticles } from "@/lib/articles";
import { articlePath, CATEGORY_LABEL, categoryPath } from "@/lib/categories";
import { SITE } from "@/lib/site";

type ArticleViewProps = {
  article: Article;
};

export async function ArticleView({ article }: ArticleViewProps) {
  const related = await getRelatedArticles(article.category, article.slug, 3);
  const url = `${SITE.url}${articlePath(article.category, article.slug)}`;
  const published = article.createdAt.toISOString();
  const modified = article.updatedAt.toISOString();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    datePublished: published,
    dateModified: modified,
    inLanguage: "de-AT",
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    isPartOf: { "@id": `${SITE.url}/#website` },
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
    about: CATEGORY_LABEL[article.category],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: CATEGORY_LABEL[article.category],
        item: `${SITE.url}${categoryPath(article.category)}`,
      },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };

  return (
    <main id="inhalt" className="bg-cream-soft py-16 lg:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <article className="container-content">
        <nav aria-label="Brotkrumen" className="text-[13px] text-ink-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-navy">
                Start
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={categoryPath(article.category)} className="hover:text-navy">
                {CATEGORY_LABEL[article.category]}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-navy">{article.title}</li>
          </ol>
        </nav>

        <div className="mt-8 max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-forest">
            <Link href={categoryPath(article.category)} className="hover:underline">
              {CATEGORY_LABEL[article.category]}
            </Link>
          </p>
          <h1 className="mt-3 font-serif text-[36px] leading-tight text-navy lg:text-[42px]">{article.title}</h1>
          <p className="mt-4 text-sm text-ink-muted">
            {article.createdAt.toLocaleDateString("de-AT", { dateStyle: "long" })}
          </p>
          <p className="mt-5 text-[18px] leading-8 text-ink-muted">{article.excerpt}</p>
        </div>

        <div className="prose-article mt-10 max-w-3xl">
          <MarkdownContent content={article.content} />
        </div>

        {related.length > 0 ? (
          <aside className="mt-16 border-t border-cream-dark pt-10" aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-serif text-[26px] text-navy">
              Weitere Beiträge zu {CATEGORY_LABEL[article.category]}
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id} className="rounded-2xl border border-cream-dark bg-white p-6">
                  <h3 className="font-serif text-[18px] text-navy">
                    <Link href={articlePath(item.category, item.slug)} className="hover:text-forest">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[14px] leading-6 text-ink-muted">{item.excerpt}</p>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </article>
    </main>
  );
}
