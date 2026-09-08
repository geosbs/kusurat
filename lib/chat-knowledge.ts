import { articlePath, CATEGORY_LABEL } from "@/lib/categories";
import { liveArticleWhere } from "@/lib/live-articles";
import { prisma } from "@/lib/prisma";

type CatalogItem = {
  title: string;
  excerpt: string;
  path: string;
  category: string;
};

const FALLBACK: CatalogItem[] = [
  {
    title: "Wohnung entrümpeln: Checkliste",
    excerpt: "Wohnung systematisch entrümpeln.",
    path: "/entruempelung/wohnung-entruempeln-checkliste",
    category: "Entrümpelung",
  },
  {
    title: "Entrümpelung vor dem Umzug",
    excerpt: "Fehler vor dem Umzug vermeiden.",
    path: "/entruempelung/entruempelung-vor-dem-umzug",
    category: "Entrümpelung",
  },
  {
    title: "Wohnungsräumung besenrein",
    excerpt: "Nach Auszug besenrein übergeben.",
    path: "/raeumung/wohnungsraeumung-besenrein-uebergeben",
    category: "Räumung",
  },
  {
    title: "Haushaltsauflösung Österreich",
    excerpt: "Ablauf und Orientierung.",
    path: "/raeumung/haushaltsaufloesung-oesterreich-ablauf",
    category: "Räumung",
  },
  {
    title: "Keller räumen",
    excerpt: "Reihenfolge, Feuchtigkeit, Altlasten.",
    path: "/raeumung/keller-raeumen-anleitung",
    category: "Räumung",
  },
  {
    title: "Nachhaltig entsorgen",
    excerpt: "Recycling und Wiederverwendung.",
    path: "/nachhaltigkeit/nachhaltig-entsorgen-oesterreich",
    category: "Nachhaltigkeit",
  },
  {
    title: "Elektroaltgeräte entsorgen",
    excerpt: "E-Schrott korrekt abgeben.",
    path: "/nachhaltigkeit/elektroaltgeraete-richtig-entsorgen",
    category: "Nachhaltigkeit",
  },
  {
    title: "Brauchbares weitergeben",
    excerpt: "Spenden, verkaufen, nutzen.",
    path: "/nachhaltigkeit/brauchbares-weitergeben-spenden",
    category: "Nachhaltigkeit",
  },
  {
    title: "Dachboden aufräumen",
    excerpt: "Checkliste Dachboden.",
    path: "/ratgeber/dachboden-aufraeumen-checkliste",
    category: "Ratgeber",
  },
  {
    title: "Checkliste Haushaltsauflösung",
    excerpt: "Was Sie nicht vergessen sollten.",
    path: "/ratgeber/checkliste-haushaltsaufloesung",
    category: "Ratgeber",
  },
  {
    title: "Ordnung mit Zonen",
    excerpt: "Ordnung, die bleibt.",
    path: "/ratgeber/ordnung-schaffen-zonen-statt-motivation",
    category: "Ratgeber",
  },
  {
    title: "Sperrmüll und Recyclinghof",
    excerpt: "Was wohin gehört.",
    path: "/entruempelung/sperrmuell-recyclinghof-was-wohin",
    category: "Entrümpelung",
  },
];

let cache: { at: number; items: CatalogItem[] } | null = null;
const CACHE_MS = 10 * 60_000;

function clip(value: string, max = 72) {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

function tokens(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .filter((word) => word.length >= 4);
}

async function loadCatalog(): Promise<CatalogItem[]> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.items;
  try {
    const rows = await prisma.article.findMany({
      where: liveArticleWhere(),
      orderBy: { publishedAt: "desc" },
      take: 40,
      select: { title: true, excerpt: true, slug: true, category: true },
    });
    const items = rows.map((row) => ({
      title: clip(row.title, 72),
      excerpt: clip(row.excerpt, 72),
      path: articlePath(row.category, row.slug),
      category: CATEGORY_LABEL[row.category],
    }));
    if (items.length > 0) {
      cache = { at: Date.now(), items };
      return items;
    }
  } catch {
    // Fall back to the static Ratgeber-Katalog.
  }
  return FALLBACK;
}

function scoreItem(item: CatalogItem, queryTokens: string[]) {
  const haystack = tokens(`${item.title} ${item.excerpt} ${item.category} ${item.path}`);
  let score = 0;
  for (const token of queryTokens) {
    if (haystack.includes(token)) score += 2;
    else if (haystack.some((word) => word.includes(token) || token.includes(word))) score += 1;
  }
  return score;
}

export async function buildChatKnowledge(userMessage: string) {
  const catalog = await loadCatalog();
  const queryTokens = tokens(userMessage);
  if (!queryTokens.length) return "";

  const relevant = [...catalog]
    .map((item) => ({ item, score: scoreItem(item, queryTokens) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  if (!relevant.length) return "";

  const lines = relevant
    .map(({ item }) => `${item.title} → https://geosbau.at${item.path}`)
    .join("\n");

  return `Passende Ratgeber:\n${lines}`;
}
