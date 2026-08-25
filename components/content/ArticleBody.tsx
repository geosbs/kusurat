import type { Article } from "@prisma/client";
import { looksLikeHtml } from "@/lib/looks-like-html";
import { MarkdownContent } from "@/components/content/MarkdownContent";

export function ArticleBody({ article }: { article: Pick<Article, "content"> }) {
  if (looksLikeHtml(article.content)) {
    return <div dangerouslySetInnerHTML={{ __html: article.content }} />;
  }
  return <MarkdownContent content={article.content} />;
}
