import type { Metadata } from "next";
import { AcronymSection } from "@/components/home/AcronymSection";
import { FeaturesBar } from "@/components/home/FeaturesBar";
import { Hero } from "@/components/home/Hero";
import { StepsSection } from "@/components/home/StepsSection";
import { HomeArticles } from "@/components/home/HomeArticles";
import { canonical } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: SITE.title },
  description: SITE.description,
  alternates: canonical("/"),
  openGraph: {
    title: SITE.title,
    url: SITE.url,
  },
};

export default function HomePage() {
  return (
    <main id="inhalt">
      <Hero />
      <AcronymSection />
      <HomeArticles />
      <StepsSection />
      <FeaturesBar />
    </main>
  );
}
