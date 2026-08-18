import type { Metadata } from "next";
import { InnerPage } from "@/components/InnerPage";
import { canonical } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakt zu geosbau.at – Fragen zu Ratgebern, Checklisten und Inhalten rund um Räumung, Entrümpelung und Ordnung.",
  alternates: canonical("/kontakt"),
};

export default function KontaktPage() {
  return (
    <main id="inhalt">
      <InnerPage
        title="Kontakt"
        intro="Sie haben eine Frage, einen Themenvorschlag oder Feedback zu unseren Ratgebern? Schreiben Sie uns – wir antworten so rasch wie möglich."
      >
        <article className="rounded-2xl border border-cream-dark bg-white p-6 sm:p-8">
          <h2 className="font-serif text-[22px] text-navy">So erreichen Sie uns</h2>
          <address className="mt-4 not-italic text-[16px] leading-7 text-ink-muted">
            <p className="font-medium text-navy">{SITE.publisherName}</p>
            <p>
              {SITE.publisherCity}, {SITE.publisherCountry}
            </p>
            <p className="mt-3">
              E-Mail:{" "}
              <a className="font-medium text-forest underline-offset-2 hover:underline" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </p>
          </address>
        </article>
      </InnerPage>
    </main>
  );
}
