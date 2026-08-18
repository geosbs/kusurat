import type { Category } from "@prisma/client";

export const CATEGORY_PATH = {
  ENTRUEMPELUNG: "entruempelung",
  RAEUMUNG: "raeumung",
  NACHHALTIGKEIT: "nachhaltigkeit",
  RATGEBER: "ratgeber",
} as const satisfies Record<Category, string>;

export const CATEGORY_LABEL: Record<Category, string> = {
  ENTRUEMPELUNG: "Entrümpelung",
  RAEUMUNG: "Räumung",
  NACHHALTIGKEIT: "Nachhaltigkeit",
  RATGEBER: "Ratgeber",
};

export const CATEGORY_META: Record<
  Category,
  { title: string; description: string; intro: string }
> = {
  ENTRUEMPELUNG: {
    title: "Entrümpelung",
    description:
      "Ratgeber zur Entrümpelung von Wohnung, Haus, Keller und Dachboden – mit klaren Schritten, Checklisten und Entscheidungshilfen.",
    intro:
      "Wie Sie systematisch entrümpeln, Entscheidungen treffen und Räume entlasten – ohne Chaos und ohne unnötige Kosten.",
  },
  RAEUMUNG: {
    title: "Räumung",
    description:
      "Wissen zur Räumung von Wohnungen, Häusern und Objekten: Planung, Übergabe, Dokumentation und nachhaltige Entsorgung.",
    intro:
      "Von der ersten Sichtung bis zur sauberen Übergabe: Orientierung für Wohnungsräumung, Haushaltsauflösung und Objektübergabe.",
  },
  NACHHALTIGKEIT: {
    title: "Nachhaltigkeit",
    description:
      "Nachhaltig räumen und entrümpeln: Wiederverwenden, recyceln und umweltbewusst entsorgen – mit klaren Entscheidungshilfen.",
    intro:
      "Gute Entscheidungen für Ihr Zuhause und die Umwelt: Brauchbares erhalten, Altlasten korrekt entfernen und ressourcenschonend entsorgen.",
  },
  RATGEBER: {
    title: "Ratgeber",
    description:
      "Praxisnahe Ratgeber zu Räumung, Entrümpelung, Ordnung und nachhaltiger Entsorgung – verständlich und unabhängig.",
    intro:
      "Praxisnahe Beiträge, Checklisten und Vorlagen zu Räumung, Entrümpelung, Haushaltsauflösung und mehr Ordnung im Alltag.",
  },
};

export function articlePath(category: Category, slug: string) {
  return `/${CATEGORY_PATH[category]}/${slug}`;
}

export function categoryPath(category: Category) {
  return `/${CATEGORY_PATH[category]}`;
}

export function isCategory(value: string | null | undefined): value is Category {
  return typeof value === "string" && value in CATEGORY_PATH;
}
