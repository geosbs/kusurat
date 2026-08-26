import type { Metadata } from "next";
import { InnerPage } from "@/components/InnerPage";
import { canonical } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung von geosbau.at – Verantwortlicher, Hosting, Cloudflare, Cookies, Kontakt per E-Mail und Ihre Rechte nach der DSGVO.",
  alternates: canonical("/datenschutz"),
};

export default function DatenschutzPage() {
  return (
    <main id="inhalt">
      <InnerPage
        title="Datenschutzerklärung"
        intro="Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Diese Datenschutzerklärung informiert Sie darüber, welche Daten bei einem Besuch von geosbau.at verarbeitet werden, zu welchem Zweck dies geschieht und welche Rechte Ihnen dabei zustehen."
      >
        <article className="space-y-10 rounded-2xl border border-cream-dark bg-white p-6 text-[16px] leading-7 text-ink-muted sm:p-8">
          <section>
            <h2 className="font-serif text-[22px] text-navy">1. Verantwortlicher</h2>
            <p className="mt-4">Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
            <address className="mt-4 not-italic">
              <p className="font-medium text-navy">{SITE.publisherName}</p>
              <p>{SITE.publisherStreet}</p>
              <p>
                {SITE.publisherPostalCode} {SITE.publisherCity}
              </p>
              <p>{SITE.publisherCountry}</p>
              <p className="mt-3">
                Telefon:{" "}
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
            <h2 className="font-serif text-[22px] text-navy">2. Allgemeines zur Datenverarbeitung</h2>
            <p className="mt-4">
              Geosbau.at ist ein privat betriebenes, redaktionelles Informationsportal. Es werden über die Website keine
              gewerblichen Leistungen angeboten oder Aufträge entgegengenommen. Personenbezogene Daten werden nur
              verarbeitet, soweit dies für den Betrieb der Website technisch notwendig ist oder Sie uns Daten freiwillig
              zur Verfügung stellen (z.&nbsp;B. per Kontaktanfrage).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[22px] text-navy">3. Hosting und Server-Logfiles</h2>
            <p className="mt-4">
              Diese Website wird bei IONOS gehostet. Beim Aufruf der Website werden durch den Hosting-Anbieter
              automatisch sogenannte Server-Logfiles erfasst, die Ihr Browser automatisch übermittelt. Dazu gehören:
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-5">
              <li>IP-Adresse</li>
              <li>Datum und Uhrzeit der Anfrage</li>
              <li>aufgerufene Seite/Datei</li>
              <li>verwendeter Browser und Betriebssystem</li>
              <li>verweisende URL (Referrer)</li>
            </ul>
            <p className="mt-4">
              Diese Daten werden ausschließlich zur Gewährleistung eines störungsfreien Betriebs, zur Sicherheit der
              Website sowie zur technischen Fehleranalyse verarbeitet. Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1
              lit.&nbsp;f DSGVO (berechtigtes Interesse an einem stabilen und sicheren Betrieb). Eine Zusammenführung
              mit anderen Datenquellen erfolgt nicht.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[22px] text-navy">4. Content Delivery Network (Cloudflare)</h2>
            <p className="mt-4">
              Diese Website nutzt Dienste des Anbieters Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA,
              unter anderem zum Schutz vor Spam-Bots (z.&nbsp;B. E-Mail-Adressen-Verschleierung) und zur Auslieferung
              von Website-Inhalten. Dabei können technische Daten wie Ihre IP-Adresse an Cloudflare übermittelt werden.
              Cloudflare kann auch außerhalb der EU verarbeiten; für Datenübermittlungen in die USA stützt sich
              Cloudflare auf Standardvertragsklauseln gemäß Art.&nbsp;46 DSGVO bzw. das EU-US Data Privacy Framework.
              Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes Interesse an Sicherheit und
              zuverlässiger Bereitstellung der Website).
            </p>
            <p className="mt-4">
              Weitere Informationen finden Sie in der Datenschutzerklärung von Cloudflare:{" "}
              <a
                className="font-medium text-forest underline-offset-2 hover:underline"
                href="https://www.cloudflare.com/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.cloudflare.com/privacypolicy/
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[22px] text-navy">5. Cookies</h2>
            <p className="mt-4">
              Diese Website setzt keine Cookies. Es findet keine Wiedererkennung von Besuchern, kein Tracking und keine
              Analyse des Nutzerverhaltens über Cookies statt. Eine Einwilligung über ein Cookie-Banner ist daher nicht
              erforderlich.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[22px] text-navy">6. Kontaktaufnahme per E-Mail</h2>
            <p className="mt-4">
              Auf der Website ist eine E-Mail-Adresse zur Kontaktaufnahme angegeben. Ein Kontaktformular wird nicht
              bereitgestellt; Anfragen werden ausschließlich per E-Mail entgegengenommen. Wenn Sie uns per E-Mail
              kontaktieren, werden die von Ihnen mitgeteilten Daten (z.&nbsp;B. Absenderadresse, Nachrichteninhalt)
              ausschließlich zur Beantwortung Ihrer Anfrage verarbeitet. Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1
              lit.&nbsp;f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Die Daten werden gelöscht,
              sobald sie für die Bearbeitung nicht mehr erforderlich sind, sofern keine gesetzlichen
              Aufbewahrungspflichten entgegenstehen.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[22px] text-navy">7. Empfänger / Auftragsverarbeiter</h2>
            <p className="mt-4">
              Eine Übermittlung Ihrer Daten an Dritte erfolgt nur, soweit dies zur Erbringung der oben genannten Dienste
              notwendig ist (z.&nbsp;B. Hosting-Anbieter, Cloudflare). Mit allen Auftragsverarbeitern bestehen bzw.
              werden Verträge gemäß Art.&nbsp;28 DSGVO abgeschlossen. Eine Übermittlung zu Werbezwecken oder ein Verkauf
              Ihrer Daten an Dritte findet nicht statt.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[22px] text-navy">8. Speicherdauer</h2>
            <p className="mt-4">
              Personenbezogene Daten werden nur so lange gespeichert, wie dies für den jeweiligen Zweck erforderlich ist
              bzw. wie es gesetzliche Aufbewahrungsfristen vorsehen. Server-Logfiles werden in der Regel nach spätestens
              14 Tagen automatisch gelöscht oder anonymisiert.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[22px] text-navy">9. Ihre Rechte</h2>
            <p className="mt-4">Ihnen stehen nach der DSGVO folgende Rechte zu:</p>
            <ul className="mt-4 list-disc space-y-1 pl-5">
              <li>Recht auf Auskunft (Art.&nbsp;15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art.&nbsp;16 DSGVO)</li>
              <li>Recht auf Löschung (Art.&nbsp;17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art.&nbsp;18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art.&nbsp;20 DSGVO)</li>
              <li>Recht auf Widerspruch gegen die Verarbeitung (Art.&nbsp;21 DSGVO)</li>
              <li>Recht auf Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art.&nbsp;7 Abs.&nbsp;3 DSGVO)</li>
            </ul>
            <p className="mt-4">
              Zur Ausübung dieser Rechte genügt eine formlose Mitteilung per E-Mail an{" "}
              <a className="font-medium text-forest underline-offset-2 hover:underline" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[22px] text-navy">10. Beschwerderecht</h2>
            <p className="mt-4">
              Sie haben das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind,
              dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt:
            </p>
            <address className="mt-4 not-italic">
              <p className="font-medium text-navy">Österreichische Datenschutzbehörde</p>
              <p>Barichgasse 40–42, 1030 Wien</p>
              <p>
                Telefon:{" "}
                <a className="font-medium text-forest underline-offset-2 hover:underline" href="tel:+431521520">
                  +43 1 52 152-0
                </a>
              </p>
              <p>
                E-Mail:{" "}
                <a className="font-medium text-forest underline-offset-2 hover:underline" href="mailto:dsb@dsb.gv.at">
                  dsb@dsb.gv.at
                </a>
              </p>
              <p>
                Web:{" "}
                <a
                  className="font-medium text-forest underline-offset-2 hover:underline"
                  href="https://www.dsb.gv.at"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.dsb.gv.at
                </a>
              </p>
            </address>
          </section>

          <section>
            <h2 className="font-serif text-[22px] text-navy">11. Änderungen dieser Datenschutzerklärung</h2>
            <p className="mt-4">
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslagen oder bei
              Änderungen der Website bzw. der eingesetzten Dienste anzupassen.
            </p>
          </section>
        </article>
      </InnerPage>
    </main>
  );
}
