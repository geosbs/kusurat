import type { Metadata } from "next";
import { CategoryIndex } from "@/components/content/CategoryIndex";
import { CATEGORY_META } from "@/lib/categories";
import { canonical } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: CATEGORY_META.RATGEBER.title,
  description: CATEGORY_META.RATGEBER.description,
  alternates: canonical("/ratgeber"),
};

export default function RatgeberPage() {
  return <CategoryIndex category="RATGEBER" />;
}
