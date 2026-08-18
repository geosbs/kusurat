import { createArticleMetadata, createArticlePage } from "@/lib/article-pages";

export const dynamic = "force-dynamic";
export const generateMetadata = createArticleMetadata("RATGEBER");
export default createArticlePage("RATGEBER");
