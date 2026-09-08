export const CHAT_MODEL: "gpt-4o-mini";
export const CHAT_MAX_TOKENS: 280;
export const CHAT_TEMPERATURE: 0.4;
export const CHAT_HISTORY_LIMIT: 4;
export const GEOS_CHAT_SYSTEM_PROMPT: string;

export function createGeosChatReply(
  history: Array<{ role: "user" | "assistant"; content: string }>,
  siteKnowledge?: string,
): Promise<string>;
