import type { Category } from "@prisma/client";
import Link from "next/link";
import { CategoryInfiniteList } from "@/components/content/CategoryInfiniteList";
import { InnerPage } from "@/components/InnerPage";
import { CATEGORY_PAGE_SIZE, getPublishedPage } from "@/lib/articles";
import { CATEGORY_LABEL, CATEGORY_META, categoryPath } from "@/lib/categories";

type CategoryIndexProps = {
  category?: Category;
};

export async function CategoryIndex({ category }: CategoryIndexProps) {
  const all = !category;
  const meta = category ? CATEGORY_META[category] : null;
  const page = await getPublishedPage({
    ...(category ? { category } : {}),
    take: CATEGORY_PAGE_SIZE,
  });

  const title = all ? "Alle Ratgeber" : meta!.title;
  const intro = all
    ? "Alle Beiträge zu Räumung, Entrümpelung, Nachhaltigkeit und Ordnung – Checklisten, Abläufe und unabhängige Orientierung."
    : meta!.intro;

  return (
    <main id="inhalt">
      <InnerPage title={title} intro={intro}>
        <nav className="mb-8 flex flex-wrap gap-3 text-sm" aria-label="Weitere Themen">
          <Link
            href="/ratgeber"
            className={`rounded-full px-3 py-1.5 ${all ? "bg-navy text-white" : "bg-white text-navy hover:bg-cream-dark"}`}
          >
            Alle
          </Link>
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
        {page.items.length === 0 ? (
          <p className="rounded-xl border border-cream-dark bg-white p-6 text-ink-muted">
            {all ? "Beiträge folgen in Kürze." : `Beiträge zu ${CATEGORY_LABEL[category!]} folgen in Kürze.`}
          </p>
        ) : (
          <CategoryInfiniteList
            category={category}
            initialItems={page.items}
            initialHasMore={page.hasMore}
            initialCursor={page.nextCursor}
          />
        )}
      </InnerPage>
    </main>
  );
}
