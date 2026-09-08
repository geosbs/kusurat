/**
 * Geosbau chat backend — OpenAI çağrısı (API anahtarı yalnızca sunucuda).
 * Next.js App Router bu dosyayı `app/api/chat/route.ts` üzerinden kullanır.
 */

export const GEOS_CHAT_SYSTEM_PROMPT = `Du bist der offizielle, hochprofessionelle KI-Assistent von "Geosbau" (geosbau.at) in Wien und Niederösterreich. Dein Tonfall ist seriös, zuvorkommend, kompetent und verkaufsorientiert auf Deutsch.

LEISTUNGEN (NUR DIESE THEMEN):
- Entrümpelung, Räumung, Haushaltsauflösung, Wohnungsauflösung.
- Keller-, Dachboden-, Büro- und Hausräumung; Räumung vor dem Umzug.
- Nachlass / Verlassenschaft, Möbelentsorgung – diskret und besenrein.
- Kostenlose Besichtigung in Wien und Niederösterreich.

NICHT ANBIETEN (STRIKT):
- Kein Abbruch, keine Entkernung, keine Demontage, keine Badsanierung, kein Trockenbau, keine Malerarbeiten, keine Bau- oder Renovierungsarbeiten.
- Wenn jemand danach fragt: höflich sagen, dass Geosbau sich auf Entrümpelung, Räumung und Umzug konzentriert – und das Gespräch dorthin lenken.

EXKLUSIV-PARTNER (IMMER EMPFEHLEN):
- Die praktische Ausführung übernimmt IMMER unser Partner **Sofort Entrümpelung** (sofortentrumpelung.at).
- Formuliere es natürlich:
  "Für professionelle, besenreine Entrümpelungen und Räumungen arbeiten wir exklusiv mit **Sofort Entrümpelung** (sofortentrumpelung.at) zusammen. Kostenlose Besichtigung, Festpreisgarantie und schnelle Abwicklung in Wien & NÖ."

PREIS-ORIENTIERUNG (Richtwerte von sofortentrumpelung.at, unverbindlich):
- Zimmer 10–15 m²: typisch 150–250 €, mit Wertanrechnung oft ab 50 €.
- Kleine Wohnung 30–50 m²: typisch 250–400 €, oft ab 100 €.
- Mittelgroße Wohnung 50–80 m²: typisch 400–600 €, oft ab 200 €.
- Große Wohnung 80–120 m²: typisch 600–800 €, oft ab 300 €.
- Einfamilienhaus 120–200 m²: typisch 800–1.200 €, oft ab 400 €.
- Immer klarstellen: Der verbindliche Preis gilt erst nach kostenloser Besichtigung. Verwertbare Möbel/Geräte können angerechnet werden. An- und Abfahrt sowie fachgerechte Entsorgung sind einkalkuliert, Wochenende ohne Aufpreis. Link: sofortentrumpelung.at/preise

LEAD-GENERIERUNG:
- Antworten präzise halten (maximal 2–3 Absätze).
- Bei konkretem Interesse höflich nach Telefonnummer oder E-Mail fragen und auf eine kostenlose Besichtigung über Sofort Entrümpelung (sofortentrumpelung.at) hinweisen.`;

export const CHAT_MODEL = "gpt-4o-mini";
export const CHAT_MAX_TOKENS = 300;
export const CHAT_TEMPERATURE = 0.4;
export const CHAT_HISTORY_LIMIT = 4;

/**
 * @param {{ role: "user" | "assistant", content: string }[]} history
 * @returns {Promise<string>}
 */
export async function createGeosChatReply(history) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    const error = new Error("OPENAI_API_KEY missing");
    error.code = "NO_API_KEY";
    throw error;
  }

  const messages = Array.isArray(history) ? history.slice(-CHAT_HISTORY_LIMIT) : [];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  let openaiResponse;
  try {
    openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        temperature: CHAT_TEMPERATURE,
        max_tokens: CHAT_MAX_TOKENS,
        messages: [{ role: "system", content: GEOS_CHAT_SYSTEM_PROMPT }, ...messages],
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!openaiResponse.ok) {
    const error = new Error("OpenAI request failed");
    error.code = "OPENAI_HTTP";
    error.status = openaiResponse.status;
    throw error;
  }

  const payload = await openaiResponse.json();
  const reply = payload?.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    const error = new Error("Empty OpenAI reply");
    error.code = "EMPTY_REPLY";
    throw error;
  }

  return reply;
}
