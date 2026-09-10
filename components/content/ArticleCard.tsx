import Link from "next/link";
import type { ArticleListCard } from "@/lib/articles";
import { articlePath, CATEGORY_LABEL } from "@/lib/categories";

export function ArticleCard({ article }: { article: ArticleListCard }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-cream-dark bg-white p-6 shadow-soft">
      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-forest">
        {CATEGORY_LABEL[article.category]}
      </p>
      <h2 className="mt-2 font-serif text-[24px] text-navy">
        <Link href={articlePath(article.category, article.slug)} className="hover:text-forest">
          {article.title}
        </Link>
      </h2>
      <p className="mt-3 line-clamp-4 flex-1 text-[15px] leading-7 text-ink-muted">{article.excerpt}</p>
      <Link href={articlePath(article.category, article.slug)} className="mt-4 inline-flex text-[14px] font-semibold text-forest hover:underline">
        Weiterlesen
      </Link>
    </article>
  );
}
