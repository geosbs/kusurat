import type { Metadata } from "next";
import { CategoryIndex } from "@/components/content/CategoryIndex";
import { CATEGORY_META } from "@/lib/categories";
import { canonical } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: CATEGORY_META.RAEUMUNG.title,
  description: CATEGORY_META.RAEUMUNG.description,
  alternates: canonical("/raeumung"),
};

export default function RaeumungPage() {
  return <CategoryIndex category="RAEUMUNG" />;
}
