const { PrismaClient } = require("@prisma/client");
const flagshipRatgeber = require("./data/flagship-ratgeber.cjs");

const prisma = new PrismaClient();

const articles = [
  {
    title: "Wohnung entrümpeln: Checkliste für einen klaren Ablauf",
    slug: "wohnung-entruempeln-checkliste",
    category: "ENTRUEMPELUNG",
    excerpt:
      "Mit einer klaren Checkliste entrümpeln Sie Ihre Wohnung ohne Chaos: Räume priorisieren, Entscheidungen treffen und nur behalten, was wirklich gebraucht wird.",
    metaTitle: "Wohnung entrümpeln: Checkliste & Ablauf",
    metaDescription:
      "Praktische Checkliste zum Entrümpeln der Wohnung: Zimmer für Zimmer, Entscheidungen, Weitergabe und Entsorgung – klar, realistisch und zeitsparend.",
    coverImage: "/hero.webp",
    content: `## Warum eine Checkliste beim Entrümpeln entscheidet

Ohne Plan entsteht schnell ein zweites Chaos: Kartons in jedem Raum, offene Entscheidungen und am Ende mehr Stress als vorher. Eine Checkliste macht den Ablauf sichtbar – und damit steuerbar.

## Vorbereitung: 60 Minuten, die sich lohnen

- Ziel festlegen: mehr Platz, Umzug, Übergabe oder einfach weniger Ballast.
- Zeitfenster setzen: lieber drei klare Nachmittage als ein endloses Wochenende.
- Hilfsmittel bereitlegen: Müllsäcke, Kartons, Klebeband, Marker, Handschuhe, Grundreiniger.
- Vier Zonen vorbereiten: **Behalten**, **Verschenken/Verkaufen**, **Recyceln**, **Entsorgen**.

## Die richtige Reihenfolge der Räume

Beginnen Sie nicht im Wohnzimmer. Starten Sie dort, wo der Nutzen sofort spürbar ist und wenig emotionale Last liegt:

1. Abstellraum oder Flur
2. Bad und Küche (Verbrauchtes, Abgelaufenes)
3. Keller oder Balkon
4. Schlafzimmer und Kleidung
5. Wohnzimmer und Erinnerungsstücke

## Zimmer-Checkliste

### Küche
Ablaufdaten prüfen, doppelte Geräte zusammenführen, Plastikdosen ohne Deckel entsorgen, selten genutzte Kleingeräte ehrlich bewerten.

### Bad
Leere Verpackungen, abgelaufene Kosmetik und Handtücher mit Löchern gehören nicht in den „vielleicht später“-Karton.

### Kleidung
Was zwei Saisons nicht getragen wurde, braucht einen klaren Weg: weitergeben, ändern oder fachgerecht entsorgen – nicht nur umräumen.

## Entscheidungen, die Zeit sparen

Die 20-Sekunden-Regel hilft: Wenn Sie nicht sofort wissen, wofür Sie den Gegenstand in den nächsten zwölf Monaten brauchen, gehört er nicht in die Behalten-Zone.

Fotos ersetzen oft den Gegenstand selbst – besonders bei Kinderspielzeug, Geschirr-Sets oder Deko.

## Abschluss

Am Ende steht nicht nur weniger Zeug, sondern ein nachvollziehbarer Stand: Was bleibt, was geht, was muss fachgerecht entsorgt werden. Genau das entlastet – und macht den nächsten Schritt (Umzug, Renovierung, Übergabe) planbar.
`,
  },
  {
    title: "Entrümpelung vor dem Umzug: Die häufigsten Fehler",
    slug: "entruempelung-vor-dem-umzug",
    category: "ENTRUEMPELUNG",
    excerpt:
      "Wer vor dem Umzug nicht entrümpelt, zahlt doppelt: mehr Kartons, höhere Kosten, mehr Stress. So vermeiden Sie die typischen Fehler.",
    metaTitle: "Entrümpeln vor dem Umzug: Fehler vermeiden",
    metaDescription:
      "Entrümpelung vor dem Umzug: Wann starten, was mitnehmen, was weitergeben – und welche Fehler unnötig Zeit und Geld kosten.",
    coverImage: "/hero.webp",
    content: `## Der teuerste Fehler: alles mitnehmen „für später“

Umzugskartons sind ehrlich. Was Sie einpacken, zahlen Sie in Zeit, Transportraum und Nerven. Viele Haushalte ziehen 20–40 Prozent Ballast mit – oft unbewusst.

## Fehler 1: Zu spät beginnen

Zwei Wochen vor dem Umzugstermin ist zu spät für ehrliche Entscheidungen. Planen Sie die Entrümpelung **vier bis acht Wochen** vorher. Emotionale Dinge brauchen Abstand, nicht Tempo.

## Fehler 2: Beim Packen entscheiden

Wer erst im Karton sortiert, sortiert nicht – er verschiebt. Trennen Sie bewusst:

- Woche 1–2: Keller, Dachboden, Abstellräume
- Woche 3: Kleidung, Küche, Bad
- Woche 4: Wohnräume und Erinnerungsstücke
- Danach: nur noch einpacken, was wirklich mitzieht

## Fehler 3: „Irgendwann verkaufen“ als Dauerzustand

Verkaufsportale funktionieren nur mit Frist. Setzen Sie ein Enddatum. Was bis dahin nicht weg ist, wird gespendet oder korrekt entsorgt – sonst landet es im Umzugswagen.

## Fehler 4: Gefährliche Stoffe übersehen

Farbe, Lacke, Batterien, Elektrogeräte und Spraydosen gehören nicht in den Restmüll und nicht ungesichert in den Transporter. Klären Sie früh, welche Problemstoffe Sie haben.

## Fehler 5: Die neue Wohnung als Lager missbrauchen

Was im alten Keller keinen Platz hatte, braucht in der neuen Wohnung auch keinen. Entrümpeln Sie für das Leben, das Sie führen wollen – nicht für das, das Sie mitschleppen.

## Kompakte Umzugs-Entrümpelungsformel

Behalten Sie nur, was Sie **nutzen**, **reparieren** oder **bewusst aufbewahren**. Alles andere bekommt einen Weg: Mensch, Recyclinghof oder fachgerechte Entsorgung.
`,
  },
  {
    title: "Wohnungsräumung nach Auszug: Besenrein übergeben",
    slug: "wohnungsraeumung-besenrein-uebergeben",
    category: "RAEUMUNG",
    excerpt:
      "Besenrein heißt: leer, nachvollziehbar, übergabefähig. Dieser Leitfaden zeigt den Ablauf einer Wohnungsräumung nach Auszug – ohne Streit bei der Übergabe.",
    metaTitle: "Wohnungsräumung: Besenrein übergeben",
    metaDescription:
      "Wohnung nach Auszug räumen und besenrein übergeben: Checkliste für Räume, Dokumentation, Schlüsselübergabe und typische Fallstricke.",
    coverImage: "/hero.webp",
    content: `## Was „besenrein“ in der Praxis bedeutet

Besenrein ist kein Hotelstandard. Es bedeutet: Die Wohnung ist **geräumt**, grob gereinigt und ohne persönlichen Besitz. Was genau erwartet wird, steht im Mietvertrag – lesen Sie ihn, bevor Sie den letzten Karton packen.

Typisch erwartet:

- keine Möbel, Kleinteile oder Müllsäcke
- Böden gefegt oder gesaugt
- Küche und Bad entkalkt und frei von Lebensmitteln
- Keller-, Dachboden- und Garagenabteile leer

## Ablauf in fünf Schritten

### 1. Inventar machen
Gehen Sie Raum für Raum mit Foto. Notieren Sie Einbauten, die bleiben müssen (Küche, Lampen laut Vertrag).

### 2. Räumen vor Putzen
Erst alles raus, dann reinigen. Umgekehrt verdoppelt sich die Arbeit.

### 3. Außenflächen nicht vergessen
Balkon, Terrasse, Kellerverschlag, Parkplatz und Briefkasten gehören zur Übergabe dazu.

### 4. Spuren dokumentieren
Mängel, die schon bei Einzug da waren, gehören in das Übergabeprotokoll – nicht in eine Diskussion an der Tür.

### 5. Schlüssel, Codes, Nachweise
Alle Schlüssel, Chipkarten und Garagenöffner. Quittungen für fachgerechte Entsorgung können bei Streit helfen.

## Was oft zu Kautionsthemen wird

- Dübellöcher über das Vereinbarte hinaus
- starke Verfärbungen, die über normale Abnutzung gehen
- nicht entfernte Klebefolien und Teppichkleber
- volle Müllräume oder Kellerabteile

## Übergabeprotokoll: kurz und klar

Datum, Anwesende, Zählerstände, Schlüsselanzahl, sichtbare Mängel, Unterschriften. Fotos mit Zeitstempel (Handy) sichern den Stand.

Eine saubere Räumung ist keine Höflichkeit – sie ist der letzte, oft teuerste Schritt des Mietverhältnisses. Wer ihn plant, übergibt ruhiger.
`,
  },
  {
    title: "Haushaltsauflösung in Österreich: Ablauf und Orientierung",
    slug: "haushaltsaufloesung-oesterreich-ablauf",
    category: "RAEUMUNG",
    excerpt:
      "Eine Haushaltsauflösung ist mehr als Räumen. Dieser Ratgeber ordnet Ablauf, Entscheidungen und Dokumentation – verständlich und ohne Verkaufsdruck.",
    metaTitle: "Haushaltsauflösung Österreich: Ablauf",
    metaDescription:
      "Haushaltsauflösung in Österreich: Wie Sie vorgehen, was Sie dokumentieren und wie Sie Wertgegenstände, Unterlagen und Entsorgung sinnvoll trennen.",
    coverImage: "/house.webp",
    content: `## Wann eine Haushaltsauflösung ansteht

Nachlass, Pflegeheim, Trennung oder ein langer Leerstand: Eine Haushaltsauflösung betrifft nicht nur Möbel, sondern **Geschichten, Verträge und Fristen**. Wer strukturiert vorgeht, schützt Angehörige und den Nachlass.

## Der sinnvolle Ablauf

1. **Zugang und Sicherheit:** Schlüssel, Alarmanlage, Post, Versicherungen.
2. **Dokumente sichern:** Verträge, Rechnungen, Ausweise, Bankunterlagen, Vollmachten.
3. **Wertgegenstände klären:** Schmuck, Kunst, Sammlerstücke, Fahrzeuge – nicht vorschnell entsorgen.
4. **Inventar grob erfassen:** Fotos Raum für Raum.
5. **Behalten, verteilen, verwerten, entsorgen.**
6. **Wohnung räumen und übergeben.**

## Unterlagen: das oft Unterschätzte

Papiere nicht ungeprüft schreddern. Steuerlich und rechtlich relevante Dokumente können Jahre relevant bleiben. Legen Sie eine Box „prüfen lassen“ an, statt in der ersten Stunde zu entscheiden.

## Emotion und Tempo

Haushaltsauflösungen scheitern selten an der Menge, sondern am Tempo. Planen Sie Pausen. Persönliches (Fotos, Briefe) darf in einer eigenen Kiste warten – getrennt vom Sperrmüll.

## Nachhaltigkeit trotz Druck

Vieles ist noch brauchbar: Möbel, Geschirr, Textilien, Werkzeug. Sozialmärkte, gemeinnützige Stellen und Weitergabe in der Familie entlasten Deponie und Gewissen. Was gefährlich oder defekt ist, gehört in den vorgesehenen Entsorgungsweg.

## Dokumentation schützt

Wer was mitnimmt, was verkauft und was entsorgt wurde, sollte mindestens stichwortartig festgehalten werden – besonders wenn mehrere Personen beteiligt sind. Transparenz verhindert späteren Streit.

Eine Haushaltsauflösung ist ein Projekt. Mit Reihenfolge, Fotos und klaren Zonen bleibt es menschlich und machbar.
`,
  },
  {
    title: "Keller räumen: Reihenfolge, Feuchtigkeit und Altlasten",
    slug: "keller-raeumen-anleitung",
    category: "RAEUMUNG",
    excerpt:
      "Der Keller ist das Gedächtnis des Hauses – und oft das größte Zeitgrab. So räumen Sie strukturiert, erkennen Feuchteschäden und entsorgen Altlasten richtig.",
    metaTitle: "Keller räumen: Anleitung & Checkliste",
    metaDescription:
      "Keller räumen in der richtigen Reihenfolge: Sortieren, Feuchtigkeit prüfen, Problemstoffe erkennen und nachhaltig entsorgen.",
    coverImage: "/house.webp",
    content: `## Warum Keller so schwer zu räumen sind

Im Keller gilt selten das Nutzungsprinzip, sondern das Aufschiebeprinzip. Kartons ohne Beschriftung, Farbeimer, alte Elektronik und „könnte man noch brauchen“ stapeln sich über Jahre.

## Vor dem ersten Karton

- Licht und Lüftung prüfen.
- Schutzausrüstung: Handschuhe, Staubmaske, festes Schuhwerk.
- Schimmel oder starken Modergeruch nicht ignorieren – erst Ursache klären.
- Einen freien Korridor schaffen, bevor Sie Türme umwerfen.

## Reihenfolge, die funktioniert

1. Offensichtlicher Müll und Leergut
2. Gefahrstoffe (Farbe, Lösungsmittel, Spraydosen, Pflanzenschutz)
3. Elektroaltgeräte
4. Kartons mit unbekanntem Inhalt – einer nach dem anderen
5. Möbel und Großteile
6. Boden reinigen und Feuchtigkeit prüfen

## Feuchtigkeit: nicht einfach wegwischen

Feuchte Kartons, weiße Ränder an Wänden und muffiger Geruch deuten auf ein Klima- oder Bausproblem hin. Nasse Textilien und Papier gehören nicht zurück ins Regal. Trocknen, entsorgen, Ursache notieren.

## Typische Keller-Altlasten

- eingetrocknete Farben und Lacke
- Autobatterien und Werkstattöle
- alte Leuchtstoffröhren
- Pestizide und Chemikalien ohne Etikett

Diese Stoffe gehören **nicht** in den Restmüll. Informieren Sie sich über Problemstoffsammlung und Recyclinghöfe in Ihrer Gemeinde.

## Danach: System statt Rückfall

Beschriftete, stapelbare Boxen, ein feuchtigkeitsarmes Lagerprinzip und die Regel: Was zwei Jahre nicht gebraucht wurde, braucht keinen Kellerplatz.

Ein geräumter Keller ist kein leerer Raum. Er ist ein Raum, den Sie wieder steuern.
`,
  },
  {
    title: "Nachhaltig entsorgen in Österreich: Der praktische Überblick",
    slug: "nachhaltig-entsorgen-oesterreich",
    category: "NACHHALTIGKEIT",
    excerpt:
      "Restmüll ist die teuerste und schlechteste Option. Dieser Überblick zeigt, wie Sie in Österreich weitergeben, recyceln und Problemstoffe richtig abgeben.",
    metaTitle: "Nachhaltig entsorgen in Österreich",
    metaDescription:
      "Nachhaltig entsorgen in Österreich: Wiederverwenden, Recycling, Sperrmüll, Elektrogeräte und Problemstoffe – praxisnah und unabhängig erklärt.",
    coverImage: "/hero.webp",
    content: `## Die Hierarchie, die wirklich zählt

1. **Vermeiden und behalten, was genutzt wird**
2. **Weitergeben** (Familie, Sozialmarkt, Kleinanzeigen)
3. **Recyceln** (Altstoff, Elektro, Metall, Holz)
4. **Energetisch verwerten / Restmüll** nur als letzter Weg
5. **Problemstoffe** immer getrennt

Wer diese Reihenfolge kennt, trifft bessere Entscheidungen – auch unter Zeitdruck.

## Was fast immer recycelbar ist

- Papier und Karton trocken und sauber
- Glas nach Farben, ohne Keramik
- Metalle und Weißblech
- Kunststoffe laut kommunaler Vorgabe
- Elektroaltgeräte unabhängig von der Größe

Die genaue Trennung unterscheidet sich je nach Gemeinde. Die Grundlogik ist überall gleich: **sauber, sortenrein, ohne Gefahrstoffe im Gelben Sack**.

## Sperrige Dinge

Möbel, Matratzen und große Holzstücke gehören oft zum Sperrmüll oder zum Recyclinghof – nicht neben den Restmüllcontainer. Viele Kommunen haben Anmeldetermine. Unangemeldet abstellen ist illegal und teuer.

## Problemstoffe

Farben, Lacke, Batterien, Energiesparlampen, Pflanzenschutzmittel und bestimmte Reiniger sind Sondermüll. Bringen Sie sie zur Problemstoffsammlung. Unklare Flaschen nicht mischen.

## Der GEOSBAU-Blick

Nachhaltigkeit ist kein Extra-Projekt am Ende. Sie entsteht bei jeder Kartonentscheidung: Kann es jemand nutzen? Kann es stofflich verwertet werden? Ist es gefährlich?

Gute Entscheidungen für Zuhause und Umwelt beginnen mit dieser einen Pause vor dem Müllsack.
`,
  },
  {
    title: "Elektroaltgeräte richtig entsorgen: Pflichten und Wege",
    slug: "elektroaltgeraete-richtig-entsorgen",
    category: "NACHHALTIGKEIT",
    excerpt:
      "Alte Handys, Kühlschränke und Kabel gehören nicht in den Hausmüll. So entsorgen Sie Elektroaltgeräte in Österreich korrekt und ressourcenschonend.",
    metaTitle: "Elektroaltgeräte entsorgen in Österreich",
    metaDescription:
      "EAG richtig entsorgen: Kühlschrank, Handy, Kabel und Lampen – Rückgabestellen, Datenschutz und warum der Restmüll der falsche Weg ist.",
    coverImage: "/hero.webp",
    content: `## Warum Elektroschrott ein eigenes Thema ist

In Geräten stecken Metalle, Kunststoffe und oft Schadstoffe. Gleichzeitig sind sie Wertstofflager. Im Restmüll gehen beides verloren: Rohstoffe und Sicherheit.

## Was alles „EAG“ ist

Nicht nur der Fernseher. Auch:

- Handys, Tablets, Laptops
- Kabel, Netzteile, Steckerleisten
- Kaffeemaschinen, Staubsauger, Bohrmaschinen
- Kühl- und Gefriergeräte
- LED-Lampen und bestimmte Leuchtmittel
- Unterhaltungselektronik

Wenn es einen Stecker, Akku oder ein Netzteil hatte, denken Sie zuerst an **Elektroaltgeräte**, nicht an Restmüll.

## Rückgabewege

Händler nehmen bestimmte Geräte oft unentgeltlich zurück – besonders beim Neukauf und bei Kleingeräten. Recyclinghöfe und kommunale Sammlungen nehmen den Rest. Kühlgeräte nicht „selbst schrotten“.

## Datenschutz vor der Abgabe

Handys, Computer und externe Festplatten müssen **zurückgesetzt** oder physisch unbrauchbar gemacht werden, bevor sie den Haushalt verlassen. Fotos und Kontakte gehören nicht ins Second-Life-Gerät unbekannter Dritter.

## Akkus und Batterien

Lithium-Akkus nicht in den Restmüll und nicht ungesichert in Säcke mit Metallschrott. Beschädigte Akkus sind brandgefährlich. Fragen Sie bei der Sammelstelle nach dem vorgesehenen Behälter.

## Kleine Gewohnheit, große Wirkung

Eine Schachtel „Elektro & Kabel“ im Abstellraum verhindert, dass Geräte in den Restmüll rutschen. Volle Schachtel, nächster Hof-Termin. So einfach kann korrekte Entsorgung sein.
`,
  },
  {
    title: "Brauchbares weitergeben: Spenden, verkaufen, sinnvoll nutzen",
    slug: "brauchbares-weitergeben-spenden",
    category: "NACHHALTIGKEIT",
    excerpt:
      "Nicht alles, was Sie nicht mehr brauchen, ist Müll. So prüfen Sie Möbel, Geschirr und Textilien und finden einen sinnvollen nächsten Ort.",
    metaTitle: "Möbel und Hausrat spenden statt entsorgen",
    metaDescription:
      "Brauchbares weitergeben: Was sich spenden oder verkaufen lässt, worauf Sozialmärkte achten und wann Entsorgung die ehrlichere Lösung ist.",
    coverImage: "/house.webp",
    content: `## Die Prüfung in drei Fragen

1. Ist es **sauber, vollständig und sicher**?
2. Würde ich es selbst noch einem Gast zumuten?
3. Gibt es in den nächsten 14 Tagen einen realistischen Abnehmer?

Wenn dreimal ja: weitergeben. Wenn unsicher: Foto, kurze Frist, dann entscheiden.

## Was sich gut weitergeben lässt

- massive Möbel ohne starken Schaden
- Geschirr und Gläser in Sets
- funktionierende Kleingeräte mit Kabel
- Kinderwagen, Sportgeräte, Werkzeug
- Textilien ohne Schimmel und Mottenschäden

## Was meist niemand braucht

- zerbrochene IKEA-Korpusse ohne Beschläge
- vergilbte Schaumstoffmatratzen
- durchgelegenes Polstermöbel mit Geruch
- unvollständige Geschirrservice mit Sprüngen
- abgelaufene Chemie und Lacke

Hier ist fachgerechte Entsorgung ehrlicher als „vielleicht nimmt das jemand“.

## Wege der Weitergabe

- Familie und Nachbarschaft
- Sozialmärkte und karitative Einrichtungen (oft mit Abholregeln)
- Plattformen mit Abholfrist
- Reparaturcafés für defekte, aber wertvolle Stücke

Rufen Sie vor der Fahrt an. Viele Stellen nehmen nur bestimmte Kategorien und nur zu festen Zeiten.

## Fairness gegenüber Abholenden

Stellen Sie Dinge trocken, zugänglich und beschrieben bereit. Ein Zettel „funktioniert / kleine Macke rechts“ spart allen Zeit.

Weitergeben ist kein Alibi, um den Keller zu leeren. Es ist die Entscheidung, Nutzen zu erhalten, bevor Material zu Abfall wird.
`,
  },
  {
    title: "Dachboden aufräumen: Leichtigkeit unter dem First",
    slug: "dachboden-aufraeumen-checkliste",
    category: "RATGEBER",
    excerpt:
      "Hitze, Staub, Kartons ohne Label: Der Dachboden braucht eine andere Taktik als das Wohnzimmer. Checkliste für sicheres, effizientes Aufräumen.",
    metaTitle: "Dachboden aufräumen: Checkliste",
    metaDescription:
      "Dachboden aufräumen Schritt für Schritt: Sicherheit, Hitze, Sortieren, Dämmung nicht beschädigen und was wirklich auf den Speicher gehört.",
    coverImage: "/house.webp",
    content: `## Erst Sicherheit, dann Nostalgie

Dachböden sind warm, staubig und oft schlecht beleuchtet. Vor dem ersten Karton:

- Trittsicherheit der Balken und Beläge prüfen
- Lichtquelle mitnehmen, nicht nur das Handy
- bei Hitze früh morgens arbeiten
- Maske gegen Staub, besonders bei alter Mineralwolle

Betreten Sie keine ungedämmten Zwischenräume, wenn Sie die Konstruktion nicht kennen.

## Was auf dem Dachboden nichts verloren hat

- Farben, Sprays, Benzin, Lacke
- Lebensmittel und Kerzen (Hitze, Schädlinge)
- wichtige Originalunterlagen (Hitze und Feuchtigkeit)
- Elektronik mit Akkus

Der Dachboden ist ein **trockenes Archiv für Seltenes**, kein Gefahrstofflager.

## Sortierlogik

Arbeiten Sie in Bahnen, nicht in Stapeln. Eine klare Fläche, ein Karton nach dem anderen:

- **Sofort entsorgen:** Schimmel, Mäuse, Zerbrochenes
- **Weitergeben:** saisonale, gut erhaltene Dinge
- **Archiv:** beschriftet, in festen Boxen, vom Boden weg
- **Offene Fragen:** eine einzige Box, Frist 30 Tage

## Dämmung und Lüftung nicht zerstören

Treten Sie nicht in Dämmstoff. Stapeln Sie Lasten nur auf tragenden Flächen. Folien und Lüftungsschlitze nicht verdecken.

## Wenn der Dachboden leer wirkt

Dann haben Sie gewonnen. Drei bis fünf beschriftete Boxen plus ein klarer Gehweg sind ein Erfolg – nicht ein „komplett leerer“ romantischer Speicher.

Aufräumen unter dem First ist weniger Sentimentalität als Statik, Klima und Entscheidung. Danach fühlt sich das ganze Haus leichter an.
`,
  },
  {
    title: "Checkliste Haushaltsauflösung: Was Sie nicht vergessen sollten",
    slug: "checkliste-haushaltsaufloesung",
    category: "RATGEBER",
    excerpt:
      "Die kompakte Checkliste für Haushaltsauflösungen: Verträge, Räume, Wertgegenstände, Entsorgung und Übergabe – zum Abhaken.",
    metaTitle: "Checkliste Haushaltsauflösung",
    metaDescription:
      "Haushaltsauflösung Checkliste: Dokumente, Räume, Weitergabe, Entsorgung und Wohnungsübergabe – praxisnah für Angehörige und Selbstorganisation.",
    coverImage: "/hero.webp",
    content: `## Sofort nach Zugang zur Wohnung

- [ ] Schlüssel, Codes, Nachbarn informieren
- [ ] Heizung, Wasser, offensichtliche Lecks prüfen
- [ ] Post umleiten, Zeitungen stoppen
- [ ] Versicherungen und Energieanbieter notieren
- [ ] Fotos aller Räume (Übersicht, keine Kunstfotos)

## Dokumente und Werte

- [ ] Ausweise, Verträge, Testamente, Vollmachten
- [ ] Bank, Versicherungen, Steuerunterlagen
- [ ] Schmuck, Bargeld, Sammlerobjekte separat sichern
- [ ] Digitale Geräte: Zugänge klären, Daten sichern
- [ ] Fahrzeuge: Papiere, Schlüssel, Standort

## Raum für Raum

- [ ] Küche: Lebensmittel, Geräte, Unterschränke
- [ ] Bad: Medikamente (nicht in den Restmüll)
- [ ] Schlafzimmer: Wäsche, Nachttische, Tresor
- [ ] Wohnzimmer: Möbel, Elektronik, Deko
- [ ] Kinderzimmer / Gästezimmer
- [ ] Keller, Dachboden, Garage, Gartenhütte
- [ ] Balkon und Außenstellplätze

## Wege für die Dinge

- [ ] Behalten / Familie
- [ ] Spenden / Sozialmarkt (Öffnungszeiten klären)
- [ ] Verkauf mit Enddatum
- [ ] Recyclinghof / Sperrmülltermin
- [ ] Problemstoffe und Elektro getrennt

## Abschluss und Übergabe

- [ ] Zählerstände fotografieren
- [ ] Wohnung besenrein
- [ ] Kellerabteil leer
- [ ] Schlüssel vollzählig
- [ ] Protokoll und Fotos archivieren

Haken Sie nicht alles an einem Tag ab. Die Checkliste ist ein Gerüst, kein Wettlauf. Was abgehakt ist, muss nicht noch einmal entschieden werden – genau das entlastet.
`,
  },
  {
    title: "Ordnung schaffen, die bleibt: Zonen statt Motivation",
    slug: "ordnung-schaffen-zonen-statt-motivation",
    category: "RATGEBER",
    excerpt:
      "Ordnung scheitert selten am Willen, sondern am System. So bauen Sie Zonen in Wohnung und Haus, die auch nach der Entrümpelung halten.",
    metaTitle: "Ordnung schaffen, die bleibt",
    metaDescription:
      "Nachhaltige Ordnung zu Hause: Zonen, kurze Wege und realistische Systeme nach der Entrümpelung – ohne Perfektionismus.",
    coverImage: "/house.webp",
    content: `## Motivation ist ein schlechter Hausmeister

Nach einem Entrümpelungswochenende sieht alles gut aus. Drei Wochen später liegen die gleichen Dinge in der Gänge. Nicht weil Sie „unordentlich“ sind, sondern weil der Weg zur richtigen Zone zu weit oder unklar ist.

## Das Zonenprinzip

Jeder Gegenstandstyp bekommt **einen Ort**, der zum Nutzungsort passt:

- Schlüssel, Briefe, Paketband: eine Fläche direkt an der Tür
- Putzmittel: dort, wo geputzt wird – nicht im Kellerregal ganz hinten
- Werkzeug: eine Box, nicht drei Schubladen
- Papiere: eine offene Eingangsbox plus ein Archiv

Wenn etwas ständig „herumliegt“, fehlt die Zone – nicht die Disziplin.

## Weniger Stauraum kann mehr Ordnung sein

Volle Einbauschränke verzeihen schlechte Systeme. Offene, begrenzte Flächen zwingen zur Entscheidung. Nach einer Räumung nicht jeden Schrank sofort wieder füllen.

## Die 2-Minuten-Rückkehr

Was in unter zwei Minuten an seinen Ort kann, wird nicht „später“. Haken, Schalen und ein Papierkorb an den richtigen Stellen sind Infrastruktur, keine Deko.

## Saisonales auslagern – aber beschriftet

Dachboden und Keller dürfen saisonale Dinge halten. Unbeschriftete Säcke dürfen das nicht. Eine Liste am Kellerregal spart das jährliche Öffnen aller Kartons.

## Ordnung als Entlastung

GEOSBAU denkt Ordnung nicht als Pinterest-Bild. Ordnung ist, wenn Wohnen, Räumen und Entsorgen nicht jedes Mal neu erfunden werden müssen. Wer Zonen baut, muss sich nicht täglich neu motivieren.
`,
  },
  {
    title: "Sperrmüll und Recyclinghof: Was wohin gehört",
    slug: "sperrmuell-recyclinghof-was-wohin",
    category: "ENTRUEMPELUNG",
    excerpt:
      "Sperrmüll ist nicht gleich Recyclinghof. Dieser Leitfaden klärt, welche Teile der Entrümpelung wohin gehören – und was Sie nicht einfach an den Gehweg stellen.",
    metaTitle: "Sperrmüll & Recyclinghof: Was wohin gehört",
    metaDescription:
      "Sperrmüll oder Recyclinghof? Möbel, Matratzen, Holz, Metall und Elektrogeräte richtig zuordnen – für eine legale, nachhaltige Entrümpelung.",
    coverImage: "/hero.webp",
    content: `## Zwei Wege, die oft verwechselt werden

**Sperrmüll** ist in vielen Gemeinden eine angemeldete Abholung großer, überwiegend restmüllähnlicher Teile. Der **Recyclinghof** (Mistplatz, Altstoffzentrum) nimmt sortierte Wertstoffe und viele Problemfraktionen entgegen.

Was bei Ihnen gilt, steht auf der Gemeinde- oder Stadtseite. Die Logik darunter ist übertragbar.

## Typischerweise Sperrmüll (nach Anmeldung)

- große Möbel aus gemischten Materialien
- Matratzen und Polstermöbel
- Teppiche (je nach Kommune)
- große Kunststoffteile ohne eigene Sammlung

Nicht einfach am Vorabend „zur Probe“ an den Gehsteig. Illegale Ablagerung wird gestraft.

## Typischerweise Recyclinghof

- Metalle und Fahrräder
- Holz (unbehandelt / behandelt getrennt, wenn verlangt)
- Elektroaltgeräte
- Speiseöl, Farben, Batterien (Problemstoffe)
- Grünschnitt, je nach Angebot
- Kartonagen in großen Mengen

## Vor der Fahrt: drei Fragen

1. Ist es ein Gerät mit Stecker oder Akku? → Elektro, nicht Sperrmüll.
2. Ist es sortenreines Metall oder Holz? → Hof, nicht gemischter Sperrmüll.
3. Ist es gefährlich oder flüssig? → Problemstoff, nicht Container.

## Klein, aber entscheidend

Schrauben Sie, wenn möglich, Metallfüße ab. Trennen Sie Holz von Polster, wenn es ohne Zerstörung geht. Je sortenreiner, desto eher Stoffkreislauf statt Verbrennung.

Eine Entrümpelung ist erst dann sauber, wenn jedes Teil einen legalen, nachvollziehbaren Weg hat – nicht nur der Wohnraum.
`,
  },
  ...flagshipRatgeber,
];

async function main() {
  const deleted = await prisma.article.deleteMany({
    where: {
      OR: [{ category: "RATGEBER", slug: "rtgdrtgdsrtg" }, { slug: "rtgdrtgdsrtg" }, { title: "rtgdrtg" }],
    },
  });
  console.log("deleted", deleted.count);

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    });
    console.log("upserted", article.slug);
  }

  const count = await prisma.article.count();
  console.log("total", count);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
