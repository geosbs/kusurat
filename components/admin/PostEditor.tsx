"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Article, Topic } from "@prisma/client";
import { adminFetch } from "@/components/admin/admin-fetch";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { looksLikeHtml } from "@/lib/looks-like-html";
import { slugify } from "@/lib/slugify";

const MAIN_SECTIONS = [
  { value: "ENTRUEMPELUNG", label: "Entrümpelung" },
  { value: "RAEUMUNG", label: "Räumung" },
  { value: "NACHHALTIGKEIT", label: "Nachhaltigkeit" },
  { value: "RATGEBER", label: "Ratgeber" },
] as const;

const META_MAX = 320;

type PostEditorProps = {
  post?: Article;
  topics: Topic[];
};

function toDatetimeLocal(value?: Date | string | null) {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function PostEditor({ post, topics: initialTopics }: PostEditorProps) {
  const router = useRouter();
  const isEdit = Boolean(post);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [mainSection, setMainSection] = useState(post?.category ?? "RATGEBER");
  const [topic, setTopic] = useState(post?.topic ?? "");
  const [topics, setTopics] = useState(initialTopics);
  const [newTopic, setNewTopic] = useState("");
  const [metaDescription, setMetaDescription] = useState(post?.metaDescription ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [schemaMarkup, setSchemaMarkup] = useState(post?.schemaMarkup ?? "");
  const [publishMode, setPublishMode] = useState<"automatic" | "manual">(post?.status === "PUBLISHED" ? "manual" : "automatic");
  const [manualStatus, setManualStatus] = useState(post?.status ?? "DRAFT");
  const [manualPublishedAt, setManualPublishedAt] = useState(toDatetimeLocal(post?.publishedAt));
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);

  const editorMode = useMemo<"visual" | "source">(() => {
    if (!post?.content) return "visual";
    return looksLikeHtml(post.content) ? "visual" : "source";
  }, [post?.content]);

  async function createTopic() {
    const name = newTopic.trim();
    if (name.length < 2) return;
    const response = await adminFetch("/api/admin/topics", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    const data = (await response.json()) as { topic?: Topic; error?: string };
    if (!response.ok || !data.topic) {
      setError(data.error || "Could not create category.");
      return;
    }
    setTopics((current) => [...current.filter((item) => item.name !== data.topic!.name), data.topic!].sort((a, b) => a.name.localeCompare(b.name)));
    setTopic(data.topic.name);
    setNewTopic("");
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const payload = {
        title,
        slug,
        mainSection,
        topic,
        metaDescription,
        content,
        schemaMarkup,
        publishMode,
        manualStatus,
        manualPublishedAt: manualPublishedAt || null,
      };
      const response = await adminFetch(isEdit ? `/api/admin/posts/${post!.id}` : "/api/admin/posts", {
        method: isEdit ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Could not save the post.");
        return;
      }
      router.push("/admin/posts");
      router.refresh();
    } catch {
      setError("Could not save the post.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-2xl bg-cream-soft p-6 shadow-soft" lang="en">
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-semibold text-navy">
          Title
        </label>
        <input id="title" className="admin-input" value={title} onChange={(event) => setTitle(event.target.value)} required />
      </div>

      <div>
        <label htmlFor="slug" className="mb-1.5 block text-sm font-semibold text-navy">
          Slug
        </label>
        <input
          id="slug"
          className="admin-input"
          value={slug}
          onChange={(event) => {
            setSlugTouched(true);
            setSlug(event.target.value);
          }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="mainSection" className="mb-1.5 block text-sm font-semibold text-navy">
            Main Section
          </label>
          <select
            id="mainSection"
            className="admin-input"
            value={mainSection}
            onChange={(event) => setMainSection(event.target.value as typeof mainSection)}
          >
            {MAIN_SECTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="topic" className="mb-1.5 block text-sm font-semibold text-navy">
            Category
          </label>
          <select id="topic" className="admin-input" value={topic} onChange={(event) => setTopic(event.target.value)}>
            <option value="">Select a category</option>
            {topics.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <div className="mt-2 flex gap-2">
            <input
              className="admin-input"
              placeholder="Add New Category"
              value={newTopic}
              onChange={(event) => setNewTopic(event.target.value)}
            />
            <button type="button" onClick={createTopic} className="btn-secondary shrink-0 px-4 py-2 text-sm">
              Create
            </button>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="meta" className="mb-1.5 block text-sm font-semibold text-navy">
          Meta Description
        </label>
        <textarea
          id="meta"
          className="admin-input min-h-[96px]"
          maxLength={META_MAX}
          value={metaDescription}
          onChange={(event) => setMetaDescription(event.target.value.slice(0, META_MAX))}
        />
        <p className="mt-1 text-right text-xs text-ink-muted">
          {metaDescription.length} / {META_MAX} characters
        </p>
      </div>

      <fieldset className="rounded-lg border border-cream-dark bg-white p-4">
        <legend className="px-1 text-sm font-semibold text-navy">Publishing Options</legend>
        <label className="flex items-center gap-2 text-sm text-navy">
          <input
            type="radio"
            name="publishMode"
            checked={publishMode === "automatic"}
            onChange={() => setPublishMode("automatic")}
          />
          Automatic Queue (7/day)
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm text-navy">
          <input type="radio" name="publishMode" checked={publishMode === "manual"} onChange={() => setPublishMode("manual")} />
          Manual Date / Status
        </label>
        {publishMode === "manual" ? (
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <select
              className="admin-input"
              value={manualStatus}
              onChange={(event) => setManualStatus(event.target.value as typeof manualStatus)}
            >
              <option value="PUBLISHED">Published</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="DRAFT">Draft</option>
            </select>
            <input
              type="datetime-local"
              className="admin-input"
              value={manualPublishedAt}
              onChange={(event) => setManualPublishedAt(event.target.value)}
            />
          </div>
        ) : (
          <p className="mt-3 text-sm text-ink-muted">
            The next free Vienna slot (08:30–20:30, 7 per day) will be assigned automatically.
          </p>
        )}
      </fieldset>

      <div>
        <p className="mb-1.5 text-sm font-semibold text-navy">Content</p>
        <RichTextEditor value={content} onChange={setContent} initialMode={editorMode} />
      </div>

      <div>
        <label htmlFor="schema" className="mb-1.5 block text-sm font-semibold text-navy">
          Schema Markup (JSON-LD, optional)
        </label>
        <textarea
          id="schema"
          spellCheck={false}
          className="admin-input min-h-[140px] font-mono text-[13px]"
          placeholder='{"@context": "https://schema.org", "@type": "BlogPosting", ...}'
          value={schemaMarkup}
          onChange={(event) => setSchemaMarkup(event.target.value)}
        />
      </div>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-navy hover:bg-gold-dark disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save / Schedule"}
        </button>
        <Link href="/admin/posts" className="btn-secondary px-5 py-2.5 text-sm">
          Cancel
        </Link>
      </div>
    </form>
  );
}
