/**
 * Geosbau chat backend — OpenAI çağrısı (API anahtarı yalnızca sunucuda).
 * Next.js App Router bu dosyayı `app/api/chat/route.ts` üzerinden kullanır.
 */

export const GEOS_CHAT_SYSTEM_PROMPT = `Du bist der KI-Assistent von geosbau.at, einem unabhängigen Ratgeber (kein Betrieb). Deutsch, knapp, kompetent.

Rolle: Erkläre Entrümpelung, Räumung, Umzug, Haushaltsauflösung, Keller/Dachboden, Sperrmüll, Recycling. geosbau.at räumt nicht selbst und nimmt keine Aufträge an.
Partner: Ausführung IMMER an Sofort Entrümpelung (sofortentrumpelung.at) – kostenlose Besichtigung, Festpreis, Wien & NÖ.
Kein Abbruch/Entkernung/Sanierung/Bau. Keine erfundenen Artikel.

Richtpreise sofortentrumpelung.at/preise (unverbindlich, Fixpreis nach Besichtigung): Zimmer 150–250€ (ab 50€), 30–50m² 250–400€, 50–80m² 400–600€, 80–120m² 600–800€, Haus 800–1200€.

Antwort: max. 2 kurze Absätze. Passenden geosbau.at-Link nennen, wenn mitgeliefert. Redaktion: info@geosbau.at. Praxis/Termin: sofortentrumpelung.at.`;

export const CHAT_MODEL = "gpt-4o-mini";
export const CHAT_MAX_TOKENS = 280;
export const CHAT_TEMPERATURE = 0.4;
export const CHAT_HISTORY_LIMIT = 4;
export const CHAT_CLIP_CHARS = 280;

/**
 * @param {{ role: "user" | "assistant", content: string }[]} history
 * @param {string} [siteKnowledge]
 * @returns {Promise<string>}
 */
export async function createGeosChatReply(history, siteKnowledge) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    const error = new Error("OPENAI_API_KEY missing");
    error.code = "NO_API_KEY";
    throw error;
  }

  const messages = (Array.isArray(history) ? history.slice(-CHAT_HISTORY_LIMIT) : []).map((item) => ({
    role: item.role,
    content: String(item.content || "").slice(0, CHAT_CLIP_CHARS),
  }));

  const payloadMessages = [{ role: "system", content: GEOS_CHAT_SYSTEM_PROMPT }];
  if (typeof siteKnowledge === "string" && siteKnowledge.trim()) {
    payloadMessages.push({ role: "system", content: siteKnowledge.trim() });
  }
  payloadMessages.push(...messages);

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
        messages: payloadMessages,
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
