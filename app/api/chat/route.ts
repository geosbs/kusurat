import { NextRequest, NextResponse } from "next/server";
import { CHAT_HISTORY_LIMIT, createGeosChatReply } from "@/api/chat";
import { isSameOrigin } from "@/lib/admin-auth";
import { buildChatKnowledge } from "@/lib/chat-knowledge";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_MESSAGE_CHARS = 800;
const MAX_BODY_BYTES = 12_000;

type ChatRole = "user" | "assistant";

type IncomingMessage = {
  role: ChatRole;
  content: string;
};

function jsonError(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}

function sanitizeMessage(value: unknown): IncomingMessage | null {
  if (!value || typeof value !== "object") return null;
  const role = (value as { role?: unknown }).role;
  const content = (value as { content?: unknown }).content;
  if (role !== "user" && role !== "assistant") return null;
  if (typeof content !== "string") return null;
  const trimmed = content.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim();
  if (!trimmed || trimmed.length > MAX_MESSAGE_CHARS) return null;
  return { role, content: trimmed };
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return jsonError("Invalid origin", 403);
  }

  const ip = clientIp(request);
  if (!rateLimit(`chat:${ip}`, 20, 5 * 60_000)) {
    return jsonError("Zu viele Anfragen. Bitte warten Sie einen Moment.", 429);
  }

  const rawLength = Number(request.headers.get("content-length") || "0");
  if (rawLength > MAX_BODY_BYTES) {
    return jsonError("Nachricht ist zu lang.", 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Ungültige Anfrage.", 400);
  }

  const incoming = Array.isArray((body as { messages?: unknown }).messages)
    ? (body as { messages: unknown[] }).messages
    : [];

  const cleaned = incoming.map(sanitizeMessage).filter((item): item is IncomingMessage => Boolean(item));
  if (cleaned.length === 0) {
    return jsonError("Bitte geben Sie eine Nachricht ein.", 400);
  }

  const lastUser = [...cleaned].reverse().find((item) => item.role === "user");
  if (!lastUser) {
    return jsonError("Bitte geben Sie eine Nachricht ein.", 400);
  }

  const history = cleaned.slice(-CHAT_HISTORY_LIMIT);
  const siteKnowledge = await buildChatKnowledge(lastUser.content);

  try {
    const reply = await createGeosChatReply(history, siteKnowledge);
    return NextResponse.json(
      { reply },
      {
        headers: {
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff",
        },
      },
    );
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String((error as { code?: string }).code) : "";
    if (code === "NO_API_KEY") {
      return jsonError("Der Assistent ist gerade nicht erreichbar.", 503);
    }
    return jsonError("Der Assistent ist gerade nicht erreichbar.", 502);
  }
}
