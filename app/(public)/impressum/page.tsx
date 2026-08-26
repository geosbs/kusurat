import type { Metadata } from "next";
import { InnerPage } from "@/components/InnerPage";
import { canonical } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum und Offenlegung gemäß § 25 MedienG für geosbau.at – Medieninhaber, Blattlinie und rechtliche Hinweise.",
  alternates: canonical("/impressum"),
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <main id="inhalt">
      <InnerPage
        title="Impressum / Offenlegung gemäß § 25 MedienG"
        intro="Angaben zum Medieninhaber, zur grundlegenden Richtung und zu den rechtlichen Rahmenbedingungen von geosbau.at."
      >
        <article className="space-y-10 rounded-2xl border border-cream-dark bg-white p-6 text-[16px] leading-7 text-ink-muted sm:p-8">
          <section>
            <h2 className="font-serif text-[22px] text-navy">Medieninhaber und für den Inhalt verantwortlich</h2>
            <address className="mt-4 not-italic">
              <p className="font-medium text-navy">{SITE.publisherName}</p>
              <p>{SITE.publisherStreet}</p>
              <p>
                {SITE.publisherPostalCode} {SITE.publisherCity}
              </p>
              <p>{SITE.publisherCountry}</p>
              <p className="mt-3">
                Tel.:{" "}
                <a className="font-medium text-forest underline-offset-2 hover:underline" href={SITE.publisherPhoneHref}>
                  {SITE.publisherPhone}
                </a>
              </p>
              <p>
                E-Mail:{" "}
                <a className="font-medium text-forest underline-offset-2 hover:underline" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </p>
            </address>
          </section>

          <section>
            <h2 className="font-serif text-[22px] text-navy">Grundlegende Richtung (Blattlinie)</h2>
            <p className="mt-4">
              Geosbau.at ist ein unabhängiges, redaktionelles Informations- und Ratgeberportal zu den Themen Räumung,
              Entrümpelung, Haushaltsauflösung, Ordnung, Entsorgung und damit zusammenhängenden Themen. Die Website dient
              ausschließlich der allgemeinen Information und Orientierung.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[22px] text-navy">Keine gewerblichen Räumungs- oder Entrümpelungsleistungen</h2>
            <p className="mt-4">
              Über geosbau.at werden keine eigenen Räumungs-, Entrümpelungs-, Transport- oder Haushaltsauflösungsleistungen
              angeboten oder durchgeführt. Die Website nimmt keine entsprechenden Aufträge entgegen und vermittelt keine
              Verträge oder verbindlichen Angebote für solche Leistungen.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-[22px] text-navy">Rechtliche Hinweise</h2>
            <p>
              Die auf dieser Website bereitgestellten Inhalte dienen ausschließlich der allgemeinen Information und
              Orientierung und stellen keine individuelle Rechts-, Steuer- oder sonstige Fachberatung dar.
            </p>
            <p>
              Informationen zu Preisen, Kosten, Abläufen, gesetzlichen Bestimmungen oder behördlichen Vorgaben werden mit
              größtmöglicher Sorgfalt erstellt. Dennoch kann keine Gewähr für deren Vollständigkeit, Richtigkeit und
              Aktualität übernommen werden.
            </p>
            <p>
              Eine Haftung für Schäden aufgrund der Nutzung der bereitgestellten Informationen ist, soweit gesetzlich
              zulässig, ausgeschlossen.
            </p>
            <p>
              Für Inhalte externer Websites, auf die mittels Links verwiesen wird, sind ausschließlich deren Betreiber
              verantwortlich. Bei Bekanntwerden rechtswidriger Inhalte werden entsprechende Links entfernt.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[22px] text-navy">Urheberrecht</h2>
            <p className="mt-4">
              Die auf geosbau.at veröffentlichten Texte, Grafiken und sonstigen eigenen Inhalte sind urheberrechtlich
              geschützt. Eine Verwendung außerhalb der gesetzlich zulässigen Grenzen bedarf der vorherigen Zustimmung des
              jeweiligen Rechteinhabers.
            </p>
          </section>
        </article>
      </InnerPage>
    </main>
  );
}
