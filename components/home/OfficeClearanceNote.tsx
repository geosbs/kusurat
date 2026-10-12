const ENTRUEMPELUNG_WIEN_URL = "https://sofortentrumpelung.at/entruempelung-wien-1010";
const RAEUMUNG_WIEN_URL = "https://objektraeumung.at";

const linkClassName = "font-medium text-forest underline-offset-2 hover:underline";

export function OfficeClearanceNote() {
  return (
    <section aria-label="Haus, Objekt und Räumung" className="cv-auto bg-cream-soft py-12 lg:py-16">
      <div className="container-content grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-cream-dark bg-white px-6 py-8 sm:px-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-forest">Haus &amp; Objekt</p>
          <h2 id="haus-heading" className="mt-3 font-serif text-[26px] leading-tight text-navy sm:text-[30px]">
            Vom Keller bis zum Dachboden
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-ink-muted">
            Ein komplettes Haus vom Keller bis zum Dachboden zu leeren, erfordert enorme Arbeitskraft und eine
            durchdachte Logistik. Um Zeit und Nerven zu sparen, lohnt es sich, eine professionelle Entrümpelungsfirma
            mit erfahrenen Spezialisten zu beauftragen, die für eine besenreine Räumung und die fachgerechte Entsorgung
            aller Altlasten sorgt. Für Wohnungen und Häuser in der Stadt gilt dasselbe: Eine strukturierte{" "}
            <a href={ENTRUEMPELUNG_WIEN_URL} target="_blank" rel="noopener" className={linkClassName}>
              Entrümpelung Wien
            </a>{" "}
            reduziert Wege, schützt das Objekt und macht den gesamten Ablauf planbar.
          </p>
        </article>

        <article className="rounded-2xl border border-cream-dark bg-white px-6 py-8 sm:px-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-forest">Wohnung &amp; Nachlass</p>
          <h2 id="raeumung-heading" className="mt-3 font-serif text-[26px] leading-tight text-navy sm:text-[30px]">
            Wenn Räume vollständig geleert werden müssen
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-ink-muted">
            Haushaltsauflösung, Wohnungsräumung oder ein über Jahre gefüllter Keller: In Wien entscheiden Stiegenhaus,
            Lift, Innenhof und Hausordnung oft über den tatsächlichen Aufwand. Wer den Ablauf nicht dem Zufall
            überlassen will, braucht klare Mengen, geschützte Transportwege und eine Übergabe, nach der das Objekt
            wieder nutzbar ist. Eine professionelle{" "}
            <a href={RAEUMUNG_WIEN_URL} target="_blank" rel="noopener" className={linkClassName}>
              Räumung Wien
            </a>{" "}
            plant genau das: Sortierung vor dem Abtransport, fachgerechte Entsorgung und eine besenreine Fläche – ohne
            dass Räume mehrfach angefasst werden.
          </p>
        </article>
      </div>
    </section>
  );
}
