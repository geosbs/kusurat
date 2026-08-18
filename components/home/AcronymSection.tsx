import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  ClipboardList,
  Gift,
  Hammer,
  Handshake,
  Home,
  Leaf,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { ACRONYM } from "@/lib/site";

const icons: Record<(typeof ACRONYM)[number]["icon"], LucideIcon> = {
  building: Building2,
  gift: Gift,
  home: Home,
  handshake: Handshake,
  hammer: Hammer,
  clipboard: ClipboardList,
  truck: Truck,
};

export function AcronymSection() {
  return (
    <section aria-labelledby="acronym-heading" className="cv-auto bg-white py-6 lg:py-8">
      <div className="container-content grid gap-10 lg:grid-cols-3 lg:gap-0">
        <article className="flex flex-col items-center px-2 text-center lg:px-8">
          <div className="w-full bg-white px-6 py-2 sm:px-8 sm:py-3">
            <figure className="relative mx-auto aspect-square w-full max-w-[360px] lg:max-w-[400px]">
              <Image
                src="/house.webp"
                alt="Gebäude und Zuhause"
                fill
                sizes="(max-width: 1024px) 360px, 400px"
                quality={75}
                className="object-contain mix-blend-multiply"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 shadow-[inset_0_0_48px_28px_#ffffff]"
              />
            </figure>
          </div>
          <h2
            id="acronym-heading"
            className="mt-8 max-w-sm text-[20px] font-semibold leading-snug text-navy sm:text-[22px]"
          >
            Klarheit, Struktur und Lösungen, die bleiben.
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-7 text-ink-muted">
            Egal, wo Sie gerade stehen – wir zeigen Ihnen den besten Weg zu mehr{" "}
            <Link href="/ratgeber/ordnung-schaffen-zonen-statt-motivation" className="font-medium text-forest hover:underline">
              Ordnung
            </Link>
            , Werterhalt und einem guten Gefühl. Starten Sie im{" "}
            <Link href="/ratgeber" className="font-medium text-forest hover:underline">
              Ratgeber
            </Link>
            .
          </p>
        </article>

        <div className="flex items-center justify-center border-y border-[#E4E4E2] py-8 lg:border-x lg:border-y-0 lg:px-8 lg:py-0">
          <ul className="space-y-4">
            {ACRONYM.map((item) => {
              const Icon = icons[item.icon];
              return (
                <li key={item.letter} className="flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-navy text-[18px] font-bold text-white">
                    {item.letter}
                  </span>
                  <span className="inline-flex items-center gap-3 text-[16px] text-navy">
                    <Icon className="h-6 w-6 text-forest" strokeWidth={1.6} />
                    <Link href={item.href} className="hover:text-forest hover:underline">
                      {item.word}
                    </Link>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <article className="flex flex-col items-center justify-center px-2 text-center lg:items-start lg:px-10 lg:text-left">
          <div className="relative mb-6 inline-flex h-[72px] w-[72px] items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-forest/40" aria-hidden="true" />
            <span className="absolute inset-[8px] rounded-full border border-forest/25" aria-hidden="true" />
            <Leaf className="relative h-6 w-6 text-forest" strokeWidth={1.6} />
            <span className="sr-only">Nachhaltigkeit</span>
          </div>
          <p className="max-w-sm text-[15px] leading-7 text-ink-muted lg:text-justify">
            GEOSBAU verbindet genau die Bereiche, die bei{" "}
            <Link href="/raeumung" className="font-medium text-forest hover:underline">
              Räumung
            </Link>
            ,{" "}
            <Link href="/entruempelung" className="font-medium text-forest hover:underline">
              Entrümpelung
            </Link>
            , Auflösung und Umzug zusammenkommen. Wir betrachten Gebäude, Objekte und ihre
            Geschichten ganzheitlich und bieten praxisnahe{" "}
            <Link href="/ratgeber" className="font-medium text-forest hover:underline">
              Ratgeber
            </Link>
            , hilfreiche Checklisten und{" "}
            <Link href="/nachhaltigkeit" className="font-medium text-forest hover:underline">
              nachhaltige Lösungen
            </Link>{" "}
            für jede Situation.
          </p>
        </article>
      </div>
    </section>
  );
}
