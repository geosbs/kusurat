import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  CSRF_COOKIE,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  csrfCookieOptions,
  getAuthSecret,
  sessionCookieOptions,
} from "@/lib/auth-config";
import { verifyAdminToken, type AdminSession } from "@/lib/admin-token";

export type { AdminSession } from "@/lib/admin-token";

function secretKey() {
  return new TextEncoder().encode(getAuthSecret());
}

export async function signAdminToken(user: AdminSession) {
  return new SignJWT({ email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey());
}

export function createCsrfToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function applyAuthCookies(response: NextResponse, token: string, csrf: string) {
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
  response.cookies.set(CSRF_COOKIE, csrf, csrfCookieOptions());
  return response;
}

export function clearAuthCookies(response: NextResponse) {
  const expired = { ...sessionCookieOptions(), maxAge: 0 };
  const csrfExpired = { ...csrfCookieOptions(), maxAge: 0 };
  response.cookies.set(SESSION_COOKIE, "", expired);
  response.cookies.set(CSRF_COOKIE, "", csrfExpired);
  return response;
}

export function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) {
    const referer = request.headers.get("referer");
    if (!referer) return false;
    try {
      return new URL(referer).origin === request.nextUrl.origin;
    } catch {
      return false;
    }
  }
  return origin === request.nextUrl.origin;
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  const left = new TextEncoder().encode(a);
  const right = new TextEncoder().encode(b);
  let mismatch = 0;
  for (let i = 0; i < left.length; i += 1) {
    mismatch |= left[i] ^ right[i];
  }
  return mismatch === 0;
}

export async function getSessionFromRequest(request: NextRequest): Promise<AdminSession | null> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = await verifyAdminToken(token);
  if (!session) return null;
  const user = await prisma.adminUser.findUnique({
    where: { id: session.sub },
    select: { id: true, email: true },
  });
  if (!user || user.email !== session.email) return null;
  return { sub: user.id, email: user.email };
}

export async function requireAdmin(request: NextRequest) {
  if (!isSameOrigin(request) && request.method !== "GET" && request.method !== "HEAD") {
    return { error: NextResponse.json({ error: "Invalid origin" }, { status: 403 }), session: null };
  }

  const session = await getSessionFromRequest(request);
  if (!session) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }), session: null };
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    const header = request.headers.get("x-csrf-token") ?? "";
    const cookie = request.cookies.get(CSRF_COOKIE)?.value ?? "";
    if (!header || !cookie || !timingSafeEqual(header, cookie)) {
      return { error: NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 }), session: null };
    }
  }

  return { error: null, session };
}
