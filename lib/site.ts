export const SITE_ORIGIN = "https://geosbau.at";

function publicOrigin() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return SITE_ORIGIN;
  try {
    const parsed = new URL(raw.includes("://") ? raw : `https://${raw}`);
    if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
      return SITE_ORIGIN;
    }
    return parsed.origin;
  } catch {
    return SITE_ORIGIN;
  }
}

export const SITE = {
  name: "GEOSBAU",
  tagline: "Ratgeber & Blog",
  url: publicOrigin(),
  locale: "de_AT",
  language: "de",
  title: "Ratgeber für Räumung, Entrümpelung & Ordnung | GEOSBAU",
  description:
    "Unabhängiger Ratgeber zu Räumung, Entrümpelung, Haushaltsauflösung und Entsorgung in Österreich – redaktionell, ohne Verkaufsabsicht.",
  email: "info@geosbau.at",
  publisherName: "Nuran Duman",
  publisherStreet: "Dr. Karl-Swoboda-Str 25",
  publisherPostalCode: "2486",
  publisherCity: "Pottendorf",
  publisherRegion: "Niederösterreich",
  publisherCountry: "Österreich",
  publisherPhone: "+43 660 871 77 20",
  publisherPhoneHref: "tel:+436608717720",
  publisherPhoneE164: "+436608717720",
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Start" },
  { href: "/ratgeber", label: "Ratgeber" },
  { href: "/entruempelung", label: "Entrümpelung" },
  { href: "/raeumung", label: "Räumung" },
  { href: "/nachhaltigkeit", label: "Nachhaltigkeit" },
] as const;

export const FOOTER_LINKS = [
  ...NAV_ITEMS,
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const ACRONYM = [
  { letter: "G", word: "Gebäude", icon: "building", href: "/raeumung" },
  { letter: "E", word: "Entrümpelung", icon: "gift", href: "/entruempelung" },
  { letter: "O", word: "Objekt", icon: "home", href: "/raeumung/wohnungsraeumung-besenrein-uebergeben" },
  { letter: "S", word: "Service", icon: "handshake", href: "/ratgeber" },
  { letter: "B", word: "Bau", icon: "hammer", href: "/ratgeber/ordnung-schaffen-zonen-statt-motivation" },
  { letter: "A", word: "Auflösung", icon: "clipboard", href: "/raeumung/haushaltsaufloesung-oesterreich-ablauf" },
  { letter: "U", word: "Umzug", icon: "truck", href: "/entruempelung/entruempelung-vor-dem-umzug" },
] as const;

export const STEPS = [
  {
    letter: "G",
    title: "Gründlich räumen",
    text: "Räume vollständig erfassen, dokumentieren und priorisieren – damit nichts übersehen wird und der Ablauf planbar bleibt.",
    href: "/raeumung/keller-raeumen-anleitung",
  },
  {
    letter: "E",
    title: "Effizient entrümpeln",
    text: "Systematisch sortieren, entscheiden und reduzieren. So entsteht Fortschritt ohne Chaos, Zeitdruck oder unnötige Kosten.",
    href: "/entruempelung/wohnung-entruempeln-checkliste",
  },
  {
    letter: "O",
    title: "Ordnung schaffen",
    text: "Klare Zonen, nachvollziehbare Abläufe und Strukturen, die bleiben – in Wohnung, Haus, Keller oder Gewerbeobjekt.",
    href: "/ratgeber/ordnung-schaffen-zonen-statt-motivation",
  },
  {
    letter: "S",
    title: "Sauber übergeben",
    text: "Besenrein, dokumentiert und übergabefähig: für Vermietung, Verkauf, Nachlass oder den nächsten Lebensabschnitt.",
    href: "/raeumung/wohnungsraeumung-besenrein-uebergeben",
  },
  {
    letter: "B",
    title: "Brauchbares erhalten",
    text: "Möbel, Geräte und Materialien prüfen, weitergeben oder sinnvoll wiederverwenden – statt vorschnell alles zu entsorgen.",
    href: "/nachhaltigkeit/brauchbares-weitergeben-spenden",
  },
  {
    letter: "A",
    title: "Altlasten entfernen",
    text: "Problematische Stoffe erkennen und korrekt, sicher sowie gesetzeskonform entsorgen – ohne Risiko für Mensch und Umwelt.",
    href: "/nachhaltigkeit/elektroaltgeraete-richtig-entsorgen",
  },
  {
    letter: "U",
    title: "Umweltbewusst entsorgen",
    text: "Recycling, Wiederverwendung und ressourcenschonende Wege konsequent nutzen. Gute Entscheidungen bis zum letzten Schritt.",
    href: "/nachhaltigkeit/nachhaltig-entsorgen-oesterreich",
  },
] as const;

export const TRUSTED_SOURCES = [
  { href: "https://www.oesterreich.gv.at", label: "oesterreich.gv.at" },
  { href: "https://www.umweltbundesamt.at", label: "Umweltbundesamt" },
  { href: "https://www.umweltberatung.at", label: "Umweltberatung" },
] as const;
