export type FaqItem = {
  question: string;
  answer: string;
};

function stripMarkdown(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~`]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractFaqs(markdown: string): FaqItem[] {
  const match = markdown.split(/^## .*(?:Häufige Fragen|Häufig gestellte Fragen)\s*$/m);
  if (match.length < 2) return [];

  const section = match[1].split(/^## /m)[0] ?? "";
  return section
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const newline = block.indexOf("\n");
      const question = (newline === -1 ? block : block.slice(0, newline)).trim();
      const answer = stripMarkdown(newline === -1 ? "" : block.slice(newline + 1));
      return { question, answer };
    })
    .filter((item) => item.question.length > 0 && item.answer.length > 0);
}
