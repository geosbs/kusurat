"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Article } from "@prisma/client";
import { adminFetch } from "@/components/admin/admin-fetch";
import { CATEGORY_LABEL } from "@/lib/categories";
import { formatViennaSlot } from "@/lib/queue";

const TABS = [
  { id: "all", label: "All Posts" },
  { id: "published", label: "Published" },
  { id: "queued", label: "Queued (Scheduled - 7/Day)" },
  { id: "drafts", label: "Drafts" },
] as const;

function statusLabel(status: Article["status"]) {
  if (status === "PUBLISHED") return "Published";
  if (status === "SCHEDULED") return "Queued";
  return "Draft";
}

export function PostsManager({ posts, tab }: { posts: Article[]; tab: string }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function publishNow(id: string) {
    setBusyId(id);
    setError("");
    const response = await adminFetch(`/api/admin/posts/${id}/publish`, { method: "POST" });
    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error || "Could not publish this post.");
    } else {
      router.refresh();
    }
    setBusyId(null);
  }

  async function remove(id: string, title: string) {
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) return;
    setBusyId(id);
    setError("");
    const response = await adminFetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error || "Could not delete this post.");
    } else {
      router.refresh();
    }
    setBusyId(null);
  }

  return (
    <div lang="en" className="rounded-2xl bg-cream-soft p-6 shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-serif text-3xl text-navy">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center justify-center rounded-md bg-gold px-4 py-2 text-sm font-semibold text-navy hover:bg-gold-dark"
        >
          New post
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {TABS.map((item) => (
          <Link
            key={item.id}
            href={item.id === "all" ? "/admin/posts" : `/admin/posts?tab=${item.id}`}
            className={`rounded-full px-3 py-1.5 text-sm ${
              tab === item.id ? "bg-navy text-white" : "bg-white text-navy hover:bg-cream-dark"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {error ? (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
      ) : null}

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-cream-dark text-ink-muted">
              <th className="py-3 pr-4 font-medium">Title</th>
              <th className="py-3 pr-4 font-medium">Category</th>
              <th className="py-3 pr-4 font-medium">Status</th>
              <th className="py-3 pr-4 font-medium">Publish slot</th>
              <th className="py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-ink-muted">
                  No posts in this view.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-cream-dark/70">
                  <td className="py-3 pr-4 font-medium text-navy">{post.title}</td>
                  <td className="py-3 pr-4 text-ink-muted">
                    {post.topic || CATEGORY_LABEL[post.category]}
                    <span className="block text-xs">{CATEGORY_LABEL[post.category]}</span>
                  </td>
                  <td className="py-3 pr-4">{statusLabel(post.status)}</td>
                  <td className="py-3 pr-4 text-ink-muted">{formatViennaSlot(post.publishedAt)}</td>
                  <td className="py-3">
                    <div className="flex flex-wrap gap-2">
                      {post.status !== "PUBLISHED" ? (
                        <button
                          type="button"
                          disabled={busyId === post.id}
                          onClick={() => void publishNow(post.id)}
                          className="rounded-md bg-gold px-3 py-1 text-xs font-semibold text-navy hover:bg-gold-dark disabled:opacity-60"
                        >
                          Publish Now
                        </button>
                      ) : null}
                      <Link href={`/admin/posts/${post.id}`} className="rounded-md bg-white px-3 py-1 text-xs font-semibold text-navy">
                        Edit
                      </Link>
                      <button
                        type="button"
                        disabled={busyId === post.id}
                        onClick={() => void remove(post.id, post.title)}
                        className="rounded-md px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
