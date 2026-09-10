import sanitizeHtml from "sanitize-html";
import { looksLikeHtml } from "@/lib/looks-like-html";

export { looksLikeHtml } from "@/lib/looks-like-html";

export function sanitizeArticleHtml(dirty: string) {
  return sanitizeHtml(dirty, {
    allowedTags: [
      "p",
      "br",
      "hr",
      "h2",
      "h3",
      "blockquote",
      "pre",
      "code",
      "ul",
      "ol",
      "li",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "a",
      "span",
      "div",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "caption",
      "img",
    ],
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
      table: ["class"],
      "*": ["class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });
}

export function excerptFromContent(content: string, fallback = "") {
  const first = firstParagraphText(content, 800);
  if (first) return first;
  const fallbackText = fallback.replace(/\s+/g, " ").trim();
  return fallbackText.length > 800 ? trimAtSentence(fallbackText, 800) : fallbackText;
}

function stripToText(html: string) {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }).replace(/\s+/g, " ").trim();
}

export function firstParagraphText(content: string, max = 800) {
  const raw = String(content || "").trim();
  if (!raw) return "";

  let para = "";
  if (looksLikeHtml(raw)) {
    for (const match of raw.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
      const text = stripToText(match[1] || "");
      if (text) {
        para = text;
        break;
      }
    }
    if (!para) para = stripToText(raw);
  } else {
    para = raw.split(/\n\s*\n/)[0] || raw;
    para = para.replace(/[#>*`_\-\[\]()]/g, " ");
  }

  para = para.replace(/\s+/g, " ").trim();
  if (!para) return "";
  return para.length > max ? trimAtSentence(para, max) : para;
}

/** Drop the first paragraph so the article body does not repeat the on-page lead. */
export function withoutFirstParagraph(content: string) {
  const raw = String(content || "").trim();
  if (!raw) return "";

  if (looksLikeHtml(raw)) {
    let remaining = raw.replace(/^(?:\s*<p\b[^>]*>\s*<\/p>)+/i, "");
    remaining = remaining.replace(/^\s*<p\b[^>]*>[\s\S]*?<\/p>\s*/i, "").trim();
    return remaining || raw;
  }

  const parts = raw.split(/\n\s*\n/);
  if (parts.length < 2) return raw;
  return parts.slice(1).join("\n\n").trim() || raw;
}

function trimAtSentence(text: string, max: number) {
  const cut = text.slice(0, max).trimEnd();
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  if (lastStop > Math.min(160, Math.floor(max * 0.45))) {
    return cut.slice(0, lastStop + 1).trim();
  }
  return `${cut.replace(/[^\s]*$/, "").trimEnd()}…`;
}

export function isHtmlContent(content: string) {
  return looksLikeHtml(content);
}
