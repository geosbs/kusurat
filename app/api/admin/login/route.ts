import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import {
  applyAuthCookies,
  createCsrfToken,
  isSameOrigin,
  signAdminToken,
} from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { clientIp, clearLoginFailures, loginAttemptAllowed, recordLoginFailure } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const ip = clientIp(request);
  if (!loginAttemptAllowed(ip)) {
    return NextResponse.json(
      { error: "Too many failed sign-in attempts. Please wait 5 minutes." },
      { status: 429 },
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !password) {
    recordLoginFailure(ip);
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  const dummyHash = "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";
  const ok = await bcrypt.compare(password, user?.passwordHash ?? dummyHash);

  if (!user || !ok) {
    recordLoginFailure(ip);
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  clearLoginFailures(ip);
  const token = await signAdminToken({ sub: user.id, email: user.email });
  const response = NextResponse.json({ ok: true });
  applyAuthCookies(response, token, createCsrfToken());
  return response;
}
