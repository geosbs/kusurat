import type { Metadata } from "next";
import { CategoryIndex } from "@/components/content/CategoryIndex";
import { canonical } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Alle Ratgeber",
  description:
    "Alle Ratgeber zu Räumung, Entrümpelung, Nachhaltigkeit und Ordnung – Checklisten, Abläufe und unabhängige Orientierung.",
  alternates: canonical("/ratgeber"),
};

export default function RatgeberPage() {
  return <CategoryIndex />;
}
