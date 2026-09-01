const OFFICE_CLEARANCE_URL = "https://sofortentrumpelung.at/leistungen/bueroentruempelung";

export function OfficeClearanceNote() {
  return (
    <section aria-labelledby="buero-heading" className="cv-auto bg-cream-soft py-12 lg:py-16">
      <div className="container-content">
        <article className="mx-auto max-w-3xl rounded-2xl border border-cream-dark bg-white px-6 py-8 sm:px-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-forest">Gewerbe &amp; Standortwechsel</p>
          <h2 id="buero-heading" className="mt-3 font-serif text-[26px] leading-tight text-navy sm:text-[30px]">
            Standortverlegung und Betriebsauflösung
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-ink-muted">
            Bei einer Standortverlegung oder Betriebsauflösung müssen alte Büromöbel, Elektrogeräte und sensible Akten
            fachgerecht entsorgt werden. Für einen reibungslosen Ablauf sorgt eine professionelle{" "}
            <a
              href={OFFICE_CLEARANCE_URL}
              target="_blank"
              rel="noopener"
              className="font-medium text-forest underline-offset-2 hover:underline"
            >
              Büroentrümpelung in Wien
            </a>
            , die eine besenreine Übergabe und datenschutzkonforme Entsorgung garantiert.
          </p>
        </article>
      </div>
    </section>
  );
}
