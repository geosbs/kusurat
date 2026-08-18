import type { Metadata } from "next";
import { CategoryIndex } from "@/components/content/CategoryIndex";
import { CATEGORY_META } from "@/lib/categories";
import { canonical } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: CATEGORY_META.NACHHALTIGKEIT.title,
  description: CATEGORY_META.NACHHALTIGKEIT.description,
  alternates: canonical("/nachhaltigkeit"),
};

export default function NachhaltigkeitPage() {
  return <CategoryIndex category="NACHHALTIGKEIT" />;
}
