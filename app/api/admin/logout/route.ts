import { NextRequest, NextResponse } from "next/server";
import { clearAuthCookies } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(_request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  clearAuthCookies(response);
  return response;
}
