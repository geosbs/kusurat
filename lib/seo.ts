import { SITE } from "@/lib/site";

const BRAND_SUFFIX = /\s*[|–—-]\s*GEOSBAU(?:\s+Ratgeber)?\s*$/i;

export function absoluteUrl(path = "/") {
  const base = SITE.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function canonical(path = "/") {
  return { canonical: absoluteUrl(path) };
}

/** Topic only – layout template appends "| GEOSBAU" once. */
export function topicTitle(raw: string) {
  return raw.replace(BRAND_SUFFIX, "").trim();
}

export function brandedTitle(raw: string) {
  const topic = topicTitle(raw);
  return topic ? `${topic} | ${SITE.name}` : SITE.name;
}
