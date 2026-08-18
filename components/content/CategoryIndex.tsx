import type { Category } from "@prisma/client";
import Link from "next/link";
import { InnerPage } from "@/components/InnerPage";
import { getPublishedByCategory } from "@/lib/articles";
import { articlePath, CATEGORY_LABEL, CATEGORY_META, categoryPath } from "@/lib/categories";

type CategoryIndexProps = {
  category: Category;
};

export async function CategoryIndex({ category }: CategoryIndexProps) {
  const meta = CATEGORY_META[category];
  const articles = await getPublishedByCategory(category);

  return (
    <main id="inhalt">
      <InnerPage title={meta.title} intro={meta.intro}>
        <nav className="mb-8 flex flex-wrap gap-3 text-sm" aria-label="Weitere Themen">
          {(Object.keys(CATEGORY_META) as Category[]).map((item) => (
            <Link
              key={item}
              href={categoryPath(item)}
              className={`rounded-full px-3 py-1.5 ${
                item === category ? "bg-navy text-white" : "bg-white text-navy hover:bg-cream-dark"
              }`}
            >
              {CATEGORY_LABEL[item]}
            </Link>
          ))}
        </nav>
        {articles.length === 0 ? (
          <p className="rounded-xl border border-cream-dark bg-white p-6 text-ink-muted">
            Beiträge zu {CATEGORY_LABEL[category]} folgen in Kürze.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2">
            {articles.map((article) => (
              <li key={article.id}>
                <article className="flex h-full flex-col rounded-2xl border border-cream-dark bg-white p-6 shadow-soft">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-forest">
                    {CATEGORY_LABEL[article.category]}
                  </p>
                  <h2 className="mt-2 font-serif text-[24px] text-navy">
                    <Link href={articlePath(article.category, article.slug)} className="hover:text-forest">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-[15px] leading-7 text-ink-muted">{article.excerpt}</p>
                  <Link
                    href={articlePath(article.category, article.slug)}
                    className="mt-4 inline-flex text-[14px] font-semibold text-forest hover:underline"
                  >
                    Weiterlesen
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </InnerPage>
    </main>
  );
}
