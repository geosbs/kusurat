export function looksLikeHtml(content: string) {
  return /<(p|h[1-6]|ul|ol|li|blockquote|div|table|pre|article)\b/i.test(content);
}
