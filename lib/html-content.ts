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
  const text = looksLikeHtml(content)
    ? sanitizeHtml(content, { allowedTags: [], allowedAttributes: {} })
    : content.replace(/[#>*`_\-\[\]()]/g, " ");
  const collapsed = text.replace(/\s+/g, " ").trim();
  if (collapsed) return collapsed.slice(0, 220);
  return fallback.slice(0, 220);
}

export function isHtmlContent(content: string) {
  return looksLikeHtml(content);
}
