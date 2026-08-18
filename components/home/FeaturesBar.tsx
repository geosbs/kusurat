import Link from "next/link";
import { BookOpen, ClipboardList, Leaf, Lightbulb } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Praxisnahe Ratgeber",
    text: "Verständlich, ehrlich und auf den Punkt gebracht.",
    href: "/ratgeber",
  },
  {
    icon: ClipboardList,
    title: "Checklisten & Vorlagen",
    text: "Sofort einsetzbar für Wohnung, Haus und Objekt.",
    href: "/ratgeber/checkliste-haushaltsaufloesung",
  },
  {
    icon: Lightbulb,
    title: "Klare Entscheidungshilfen",
    text: "Wissen, das entlastet – ohne Verkaufsdruck.",
    href: "/entruempelung/wohnung-entruempeln-checkliste",
  },
  {
    icon: Leaf,
    title: "Nachhaltige Lösungen",
    text: "Gute Entscheidungen für Zuhause und Umwelt.",
    href: "/nachhaltigkeit",
  },
];

export function FeaturesBar() {
  return (
    <section aria-labelledby="features-heading" className="cv-auto bg-cream py-10">
      <div className="container-content">
        <h2 id="features-heading" className="sr-only">
          Was dieser Ratgeber bietet
        </h2>
        <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((item) => (
            <li key={item.title}>
              <Link href={item.href} className="flex items-start gap-4 hover:opacity-90">
                <item.icon className="mt-0.5 h-8 w-8 shrink-0 text-forest" strokeWidth={1.5} />
                <div>
                  <h3 className="text-[15px] font-semibold text-navy">{item.title}</h3>
                  <p className="mt-1 text-[13px] leading-5 text-ink-muted">{item.text}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
