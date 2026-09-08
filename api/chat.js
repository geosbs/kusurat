/**
 * Geosbau chat backend — OpenAI çağrısı (API anahtarı yalnızca sunucuda).
 * Next.js App Router bu dosyayı `app/api/chat/route.ts` üzerinden kullanır.
 */

export const GEOS_CHAT_SYSTEM_PROMPT = `Du bist der KI-Assistent von geosbau.at, einem unabhängigen Ratgeber (kein Betrieb). Deutsch, knapp, kompetent.

Rolle: Erkläre Entrümpelung, Räumung, Umzug, Haushaltsauflösung, Keller/Dachboden, Sperrmüll, Recycling. geosbau.at räumt nicht selbst und nimmt keine Aufträge an.
Partner: Ausführung IMMER an Sofort Entrümpelung.
Links IMMER nackt, mit Leerzeichen davor und danach, ohne Klammern und ohne Punkt: https://sofortentrumpelung.at
Verboten: (https://sofortentrumpelung.at) oder https://sofortentrumpelung.at.

Richtpreise sofortentrumpelung.at/preise (unverbindlich, Fixpreis nach Besichtigung): Zimmer 150–250€ (ab 50€), 30–50m² 250–400€, 50–80m² 400–600€, 80–120m² 600–800€, Haus 800–1200€.

Antwort: max. 2 kurze Absätze. Passenden geosbau.at-Link nennen, wenn mitgeliefert. Redaktion: info@geosbau.at. Praxis/Termin: sofortentrumpelung.at.`;

export const CHAT_MODEL = "gpt-4o-mini";
export const CHAT_MAX_TOKENS = 280;
export const CHAT_TEMPERATURE = 0.4;
export const CHAT_HISTORY_LIMIT = 4;
export const CHAT_CLIP_CHARS = 280;

function sanitizeReply(reply) {
  return String(reply || "")
    .replace(/\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/gi, "$1")
    .replace(
      /[\(\[\{<"'\u201e\u00ab]*\s*(?:https?:\/\/)?(?:www\.)?(sofortentrumpelung\.at|geosbau\.at)(\/[A-Za-z0-9\-_\/]*)?\s*[\)\]\}>"'\u201c\u00bb.,;:!?…]*/gi,
      (_full, host, path) => {
        const safePath = (path || "").replace(/[^A-Za-z0-9\-_\/]/g, "");
        return ` https://${String(host).toLowerCase()}${safePath} `;
      },
    )
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

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
  payloadMessages.push(...messages.filter((item) => item.content));

  const body = JSON.stringify({
    model: CHAT_MODEL,
    temperature: CHAT_TEMPERATURE,
    max_tokens: CHAT_MAX_TOKENS,
    messages: payloadMessages,
  });

  async function callOpenAI() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 35_000);
    try {
      return await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body,
        signal: controller.signal,
      });
    } catch (error) {
      if (error && typeof error === "object" && "name" in error && error.name === "AbortError") {
        const timeoutError = new Error("OpenAI timeout");
        timeoutError.code = "TIMEOUT";
        throw timeoutError;
      }
      const networkError = new Error("OpenAI network");
      networkError.code = "OPENAI_HTTP";
      throw networkError;
    } finally {
      clearTimeout(timeout);
    }
  }

  let openaiResponse = await callOpenAI();
  if (!openaiResponse.ok && (openaiResponse.status === 429 || openaiResponse.status >= 500)) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    openaiResponse = await callOpenAI();
  }

  if (!openaiResponse.ok) {
    let detail = "";
    try {
      detail = (await openaiResponse.text()).slice(0, 400);
    } catch {
      detail = "";
    }
    console.error("OpenAI chat failed", openaiResponse.status, detail);
    const error = new Error("OpenAI request failed");
    error.code = openaiResponse.status === 429 ? "RATE_LIMIT" : "OPENAI_HTTP";
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

  return sanitizeReply(reply);
}
