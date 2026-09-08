"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Category } from "@prisma/client";
import { ArticleCard } from "@/components/content/ArticleCard";
import type { ArticleListCard } from "@/lib/articles";

type CategoryInfiniteListProps = {
  category?: Category;
  initialItems: ArticleListCard[];
  initialHasMore: boolean;
  initialCursor: string | null;
};

export function CategoryInfiniteList({
  category,
  initialItems,
  initialHasMore,
  initialCursor,
}: CategoryInfiniteListProps) {
  const [items, setItems] = useState(initialItems);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [cursor, setCursor] = useState(initialCursor);
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [error, setError] = useState("");
  const sentinelRef = useRef<HTMLDivElement>(null);
  const inFlight = useRef(false);

  useEffect(() => {
    if (!loading) {
      setShowSpinner(false);
      return;
    }
    const timer = window.setTimeout(() => setShowSpinner(true), 350);
    return () => window.clearTimeout(timer);
  }, [loading]);

  const loadMore = useCallback(async () => {
    if (!hasMore || inFlight.current || !cursor) return;
    inFlight.current = true;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ cursor });
      if (category) params.set("category", category);
      const response = await fetch(`/api/articles?${params.toString()}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        setError("Weitere Beiträge konnten nicht geladen werden.");
        return;
      }
      const data = (await response.json()) as {
        items?: ArticleListCard[];
        hasMore?: boolean;
        nextCursor?: string | null;
      };
      const nextItems = Array.isArray(data.items) ? data.items : [];
      setItems((current) => {
        const seen = new Set(current.map((item) => item.id));
        return [...current, ...nextItems.filter((item) => item.id && !seen.has(item.id))];
      });
      setHasMore(Boolean(data.hasMore) && Boolean(data.nextCursor));
      setCursor(data.nextCursor ?? null);
    } catch {
      setError("Weitere Beiträge konnten nicht geladen werden.");
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  }, [category, cursor, hasMore]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void loadMore();
        }
      },
      { rootMargin: "480px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return (
    <div>
      <ul className="grid gap-6 sm:grid-cols-2">
        {items.map((article) => (
          <li key={article.id}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
      <div ref={sentinelRef} className="h-8" aria-hidden="true" />
      {showSpinner ? (
        <div className="mt-4 flex flex-col items-center gap-3 py-6" role="status" aria-live="polite">
          <span className="page-loader" aria-hidden="true" />
          <p className="text-sm text-ink-muted">Weitere Beiträge werden geladen…</p>
        </div>
      ) : null}
      {error ? (
        <p className="mt-4 text-center text-sm text-ink-muted" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
