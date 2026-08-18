import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Leaf, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-white">
      <div className="relative min-h-[540px] sm:min-h-[580px] lg:min-h-[640px]">
        <Image
          src="/hero.webp"
          alt="Geosbau Räumung und Entrümpelung"
          fill
          priority
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #ffffff 0%, #ffffff 32%, rgba(255,255,255,0.82) 44%, rgba(255,255,255,0.28) 56%, rgba(255,255,255,0) 68%)",
          }}
        />

        <div className="container-content relative z-10 flex min-h-[540px] flex-col justify-between gap-10 py-12 sm:min-h-[580px] sm:py-14 lg:min-h-[640px] lg:py-16">
          <div className="max-w-2xl pt-2 lg:max-w-[44rem]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-forest">
              Mehr Ordnung. Weniger Ballast.
            </p>
            <h1
              id="hero-heading"
              className="mt-4 font-serif text-[34px] font-bold leading-[1.18] text-navy sm:text-[44px] lg:text-[50px]"
            >
              Ihr Ratgeber für Räumung, Entrümpelung{" "}
              <span className="text-forest">&amp; Ordnung</span>
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-7 text-ink-muted sm:text-[17px]">
              Praxisnahes Wissen, klare Checklisten und nachvollziehbare Schritte
              für Wohnungen, Häuser, Keller, Dachböden und Gewerberäume – damit
              Räumung und Entrümpelung planbar, fair und nachhaltig gelingen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/ratgeber" className="btn-primary">
                <Leaf className="h-4 w-4" strokeWidth={2} />
                Ratgeber entdecken
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </Link>
              <Link href="/ratgeber/checkliste-haushaltsaufloesung" className="btn-secondary">
                Checklisten &amp; Vorlagen
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5 pb-1 lg:flex-row lg:items-end lg:justify-between">
            <ul className="grid max-w-2xl gap-4 sm:grid-cols-3 sm:gap-6">
              <li className="flex items-start gap-3">
                <Leaf className="mt-0.5 h-5 w-5 shrink-0 text-forest" strokeWidth={1.7} />
                <span className="text-[13px] font-medium leading-5 text-navy">
                  Klar. Praktisch.
                  <br />
                  Nachhaltig.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-forest" strokeWidth={1.7} />
                <span className="text-[13px] font-medium leading-5 text-navy">
                  Praxisnah. Ehrlich.
                  <br />
                  Unabhängig.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="mt-0.5 h-5 w-5 shrink-0 text-forest" strokeWidth={1.7} />
                <span className="text-[13px] font-medium leading-5 text-navy">
                  Wissen,
                  <br />
                  das entlastet.
                </span>
              </li>
            </ul>

            <aside className="flex max-w-sm items-center gap-3 rounded-xl bg-navy px-5 py-4 text-white shadow-soft">
              <Leaf className="h-5 w-5 shrink-0 text-forest-mid" strokeWidth={1.8} />
              <p className="text-[13px] leading-5">
                Gute Entscheidungen für Ihr Zuhause und die Umwelt.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
