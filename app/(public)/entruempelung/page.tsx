import type { Metadata } from "next";
import { CategoryIndex } from "@/components/content/CategoryIndex";
import { CATEGORY_META } from "@/lib/categories";

import { canonical } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: CATEGORY_META.ENTRUEMPELUNG.title,
  description: CATEGORY_META.ENTRUEMPELUNG.description,
  alternates: canonical("/entruempelung"),
};

export default function EntruempelungPage() {
  return <CategoryIndex category="ENTRUEMPELUNG" />;
}
