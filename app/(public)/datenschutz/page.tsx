import type { Metadata } from "next";
import { InnerPage } from "@/components/InnerPage";

import { canonical } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung von GEOSBAU.at – Informationen zur Verarbeitung personenbezogener Daten.",
  alternates: canonical("/datenschutz"),
};

export default function DatenschutzPage() {
  return (
    <main id="inhalt">
      <InnerPage
        title="Datenschutz"
        intro="Diese Seite erläutert, welche Daten auf geosbau.at verarbeitet werden. Der vollständige Text wird vor dem Livegang rechtlich finalisiert."
      >
        <article className="space-y-4 rounded-xl border border-cream-dark bg-white p-6 text-ink-muted">
          <h2 className="font-semibold text-navy">Grundsatz</h2>
          <p>
            GEOSBAU verarbeitet personenbezogene Daten nur im erforderlichen Umfang, transparent und gemäß der DSGVO sowie dem österreichischen Datenschutzgesetz.
          </p>
          <h2 className="pt-2 font-semibold text-navy">Kontakt</h2>
          <p>
            Anfragen zum Datenschutz richten Sie bitte an{" "}
            <a className="font-medium text-forest underline-offset-2 hover:underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
            .
          </p>
        </article>
      </InnerPage>
    </main>
  );
}
