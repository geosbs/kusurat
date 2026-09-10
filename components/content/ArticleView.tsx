import type { Article } from "@prisma/client";
import Link from "next/link";
import { ArticleBody } from "@/components/content/ArticleBody";
import { getRelatedArticles } from "@/lib/articles";
import { articlePath, CATEGORY_LABEL, categoryPath } from "@/lib/categories";
import { extractFaqs } from "@/lib/faq";
import { firstParagraphText, withoutFirstParagraph } from "@/lib/html-content";
import { getOrganizationNode, getPersonNode, getPlaceNode, ORG_ID, SITE_ID } from "@/lib/jsonld";
import { formatPublicDate } from "@/lib/queue";
import { SITE } from "@/lib/site";

type ArticleViewProps = {
  article: Article;
};

export async function ArticleView({ article }: ArticleViewProps) {
  const related = await getRelatedArticles(article.category, article.slug, 3);
  const url = `${SITE.url}${articlePath(article.category, article.slug)}`;
  const publishedAt = article.publishedAt ?? article.createdAt;
  const published = publishedAt.toISOString();
  const modified = article.updatedAt.toISOString();

  const faqs = extractFaqs(article.content);
  const lead = firstParagraphText(article.content) || article.excerpt;
  const bodyContent = withoutFirstParagraph(article.content);

  const organizationLd = getOrganizationNode();

  const articleLd = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: article.metaTitle || article.title,
    name: article.title,
    description: article.metaDescription || article.excerpt,
    datePublished: published,
    dateModified: modified,
    inLanguage: "de-AT",
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    isPartOf: { "@id": SITE_ID },
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    copyrightHolder: { "@id": ORG_ID },
    about: CATEGORY_LABEL[article.category],
    spatialCoverage: [
      { "@type": "City", name: "Wien" },
      { "@type": "AdministrativeArea", name: "Niederösterreich" },
    ],
  };

  const breadcrumbLd = {
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

  const faqLd =
    faqs.length > 0
      ? {
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  const graphLd = {
    "@context": "https://schema.org",
    "@graph": [getPersonNode(), organizationLd, getPlaceNode(), articleLd, breadcrumbLd, ...(faqLd ? [faqLd] : [])],
  };

  const customSchema = (() => {
    if (!article.schemaMarkup) return null;
    try {
      const parsed = JSON.parse(article.schemaMarkup);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  })();

  return (
    <main id="inhalt" className="bg-cream-soft py-16 lg:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphLd) }} />
      {customSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }} />
      ) : null}

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
          <p className="mt-4 text-sm text-ink-muted">{formatPublicDate(publishedAt)}</p>
          <p className="mt-5 text-[18px] leading-8 text-ink-muted">{lead}</p>
          <p className="mt-4 text-[13px] leading-6 text-ink-muted">
            GEOSBAU ist ein unabhängiger Ratgeber. Wir führen keine Räumungen durch und vermitteln keine Aufträge.
          </p>
        </div>

        <div className="prose-article mt-10 max-w-3xl">
          <ArticleBody article={{ ...article, content: bodyContent }} />
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
                  <p className="mt-2 line-clamp-3 text-[14px] leading-6 text-ink-muted">{item.excerpt}</p>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </article>
    </main>
  );
}
