import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { error, session } = await requireAdmin(request);
  if (error) return error;
  return NextResponse.json({ email: session.email });
}
