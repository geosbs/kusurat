import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublishedArticles } from "@/lib/articles";
import { articlePath, CATEGORY_LABEL, categoryPath } from "@/lib/categories";

export async function HomeArticles() {
  const articles = await getPublishedArticles();

  return (
    <section aria-labelledby="home-articles-heading" className="cv-auto bg-white py-16 lg:py-20">
      <div className="container-content">
        <div className="flex flex-col gap-6 border-b border-cream-dark pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-forest">Ratgeber &amp; Wissen</p>
            <h2 id="home-articles-heading" className="mt-3 font-serif text-[32px] leading-tight text-navy sm:text-[40px]">
              Aktuelle Beiträge für mehr Ordnung
            </h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-7 text-ink-muted">
              Checklisten, Abläufe und Entscheidungshilfen zu{" "}
              <Link href="/entruempelung" className="font-medium text-forest hover:underline">
                Entrümpelung
              </Link>
              ,{" "}
              <Link href="/raeumung" className="font-medium text-forest hover:underline">
                Räumung
              </Link>{" "}
              und{" "}
              <Link href="/nachhaltigkeit" className="font-medium text-forest hover:underline">
                nachhaltiger Entsorgung
              </Link>
              .
            </p>
          </div>
          <Link href="/ratgeber" className="inline-flex items-center gap-2 text-[15px] font-semibold text-navy hover:text-forest">
            Alle Ratgeber
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {articles.length === 0 ? (
          <p className="mt-10 text-[16px] text-ink-muted">
            Beiträge werden geladen, sobald die Datenbank erreichbar ist.
          </p>
        ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <li key={article.id}>
              <article className="flex h-full flex-col rounded-2xl border border-cream-dark bg-cream-soft p-7 shadow-soft transition hover:border-forest/30">
                <Link
                  href={categoryPath(article.category)}
                  className="text-[12px] font-semibold uppercase tracking-[0.18em] text-forest hover:underline"
                >
                  {CATEGORY_LABEL[article.category]}
                </Link>
                <h3 className="mt-3 font-serif text-[22px] leading-snug text-navy">
                  <Link href={articlePath(article.category, article.slug)} className="hover:text-forest">
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-7 text-ink-muted">{article.excerpt}</p>
                <Link
                  href={articlePath(article.category, article.slug)}
                  className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-forest hover:underline"
                >
                  Weiterlesen
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
        )}
      </div>
    </section>
  );
}
