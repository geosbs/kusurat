const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const extras = {
  "wohnung-entruempeln-checkliste": `## Weiterlesen

- [Entrümpelung vor dem Umzug](/entruempelung/entruempelung-vor-dem-umzug)
- [Sperrmüll und Recyclinghof: Was wohin gehört](/entruempelung/sperrmuell-recyclinghof-was-wohin)
- [Checkliste Haushaltsauflösung](/ratgeber/checkliste-haushaltsaufloesung)

Offizielle Orientierung zu Rechten und Pflichten im Alltag finden Sie auf [oesterreich.gv.at](https://www.oesterreich.gv.at).
`,
  "entruempelung-vor-dem-umzug": `## Weiterlesen

- [Wohnung entrümpeln: Checkliste](/entruempelung/wohnung-entruempeln-checkliste)
- [Wohnungsräumung besenrein übergeben](/raeumung/wohnungsraeumung-besenrein-uebergeben)
- [Brauchbares weitergeben](/nachhaltigkeit/brauchbares-weitergeben-spenden)

Hinweise zu Wohnen und Verträgen bündelt [HELP.gv.at](https://www.help.gv.at).
`,
  "wohnungsraeumung-besenrein-uebergeben": `## Weiterlesen

- [Haushaltsauflösung in Österreich](/raeumung/haushaltsaufloesung-oesterreich-ablauf)
- [Keller räumen](/raeumung/keller-raeumen-anleitung)
- [Wohnung entrümpeln: Checkliste](/entruempelung/wohnung-entruempeln-checkliste)

Mietrechtliche Grundlagen finden Sie auf [oesterreich.gv.at](https://www.oesterreich.gv.at).
`,
  "haushaltsaufloesung-oesterreich-ablauf": `## Weiterlesen

- [Checkliste Haushaltsauflösung](/ratgeber/checkliste-haushaltsaufloesung)
- [Wohnungsräumung besenrein übergeben](/raeumung/wohnungsraeumung-besenrein-uebergeben)
- [Nachhaltig entsorgen in Österreich](/nachhaltigkeit/nachhaltig-entsorgen-oesterreich)

Für Behördengänge und Nachlassfragen ist [HELP.gv.at](https://www.help.gv.at) die zentrale Anlaufstelle.
`,
  "keller-raeumen-anleitung": `## Weiterlesen

- [Dachboden aufräumen](/ratgeber/dachboden-aufraeumen-checkliste)
- [Sperrmüll und Recyclinghof](/entruempelung/sperrmuell-recyclinghof-was-wohin)
- [Elektroaltgeräte richtig entsorgen](/nachhaltigkeit/elektroaltgeraete-richtig-entsorgen)

Umwelt- und Schadstofffragen erläutert das [Umweltbundesamt](https://www.umweltbundesamt.at).
`,
  "nachhaltig-entsorgen-oesterreich": `## Weiterlesen

- [Elektroaltgeräte richtig entsorgen](/nachhaltigkeit/elektroaltgeraete-richtig-entsorgen)
- [Brauchbares weitergeben](/nachhaltigkeit/brauchbares-weitergeben-spenden)
- [Sperrmüll und Recyclinghof](/entruempelung/sperrmuell-recyclinghof-was-wohin)

Unabhängige Tipps zur Trennung gibt die [Umweltberatung](https://www.umweltberatung.at). Zum Verpackungsrecycling informiert [ARA](https://www.ara.at).
`,
  "elektroaltgeraete-richtig-entsorgen": `## Weiterlesen

- [Nachhaltig entsorgen in Österreich](/nachhaltigkeit/nachhaltig-entsorgen-oesterreich)
- [Keller räumen](/raeumung/keller-raeumen-anleitung)
- [Entrümpelung vor dem Umzug](/entruempelung/entruempelung-vor-dem-umzug)

Hintergrund zu Schadstoffen und Kreislaufwirtschaft: [Umweltbundesamt](https://www.umweltbundesamt.at).
`,
  "brauchbares-weitergeben-spenden": `## Weiterlesen

- [Wohnung entrümpeln: Checkliste](/entruempelung/wohnung-entruempeln-checkliste)
- [Ordnung schaffen, die bleibt](/ratgeber/ordnung-schaffen-zonen-statt-motivation)
- [Nachhaltig entsorgen in Österreich](/nachhaltigkeit/nachhaltig-entsorgen-oesterreich)

Allgemeine Verbraucher- und Alltagsinfos: [oesterreich.gv.at](https://www.oesterreich.gv.at).
`,
  "dachboden-aufraeumen-checkliste": `## Weiterlesen

- [Keller räumen](/raeumung/keller-raeumen-anleitung)
- [Ordnung schaffen, die bleibt](/ratgeber/ordnung-schaffen-zonen-statt-motivation)
- [Wohnung entrümpeln: Checkliste](/entruempelung/wohnung-entruempeln-checkliste)

Bei Schimmel und Innenraumluft hilft die [Umweltberatung](https://www.umweltberatung.at).
`,
  "checkliste-haushaltsaufloesung": `## Weiterlesen

- [Haushaltsauflösung in Österreich](/raeumung/haushaltsaufloesung-oesterreich-ablauf)
- [Wohnungsräumung besenrein übergeben](/raeumung/wohnungsraeumung-besenrein-uebergeben)
- [Brauchbares weitergeben](/nachhaltigkeit/brauchbares-weitergeben-spenden)

Behördliche Checklisten und Zuständigkeiten: [HELP.gv.at](https://www.help.gv.at).
`,
  "ordnung-schaffen-zonen-statt-motivation": `## Weiterlesen

- [Wohnung entrümpeln: Checkliste](/entruempelung/wohnung-entruempeln-checkliste)
- [Dachboden aufräumen](/ratgeber/dachboden-aufraeumen-checkliste)
- [Alle Ratgeber im Überblick](/ratgeber)

Für Wohn- und Umweltfragen im Alltag: [Umweltberatung](https://www.umweltberatung.at).
`,
  "sperrmuell-recyclinghof-was-wohin": `## Weiterlesen

- [Nachhaltig entsorgen in Österreich](/nachhaltigkeit/nachhaltig-entsorgen-oesterreich)
- [Elektroaltgeräte richtig entsorgen](/nachhaltigkeit/elektroaltgeraete-richtig-entsorgen)
- [Wohnung entrümpeln: Checkliste](/entruempelung/wohnung-entruempeln-checkliste)

Verpackungen und Sammelsysteme erklärt [ARA](https://www.ara.at). Umweltinformationen bündelt das [Umweltbundesamt](https://www.umweltbundesamt.at).
`,
};

async function main() {
  const rows = await prisma.article.findMany();
  for (const row of rows) {
    const extra = extras[row.slug];
    let content = row.content.replace(/\n## Weiterlesen[\s\S]*$/m, "").trimEnd();
    if (extra) content = `${content}\n\n${extra}`;
    await prisma.article.update({
      where: { id: row.id },
      data: { coverImage: null, content },
    });
    console.log("updated", row.slug);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
