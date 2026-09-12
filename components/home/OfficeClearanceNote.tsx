const HOUSE_CLEARANCE_URL = "https://sofortentrumpelung.at";

export function OfficeClearanceNote() {
  return (
    <section aria-labelledby="haus-heading" className="cv-auto bg-cream-soft py-12 lg:py-16">
      <div className="container-content">
        <article className="mx-auto max-w-3xl rounded-2xl border border-cream-dark bg-white px-6 py-8 sm:px-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-forest">Haus &amp; Objekt</p>
          <h2 id="haus-heading" className="mt-3 font-serif text-[26px] leading-tight text-navy sm:text-[30px]">
            Vom Keller bis zum Dachboden
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-ink-muted">
            Ein komplettes Haus vom Keller bis zum Dachboden zu leeren, erfordert enorme Arbeitskraft und eine
            durchdachte Logistik. Um Zeit und Nerven zu sparen, lohnt sich eine professionelle{" "}
            <a
              href={HOUSE_CLEARANCE_URL}
              target="_blank"
              rel="noopener"
              className="font-medium text-forest underline-offset-2 hover:underline"
            >
              Hausentrümpelung Wien
            </a>{" "}
            durch erfahrene Spezialisten, die für eine besenreine Räumung und fachgerechte Entsorgung aller Altlasten
            sorgen. Für Wohnungen und Häuser in der Stadt gilt dasselbe: Eine strukturierte{" "}
            <a
              href={HOUSE_CLEARANCE_URL}
              target="_blank"
              rel="noopener"
              className="font-medium text-forest underline-offset-2 hover:underline"
            >
              Entrümpelung Wien
            </a>{" "}
            reduziert Wege, schützt das Objekt und macht den Ablauf planbar.
          </p>
        </article>
      </div>
    </section>
  );
}
