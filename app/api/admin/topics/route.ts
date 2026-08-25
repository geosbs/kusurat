import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const topics = await prisma.topic.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json({ topics });
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  let body: { name?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: "Category name must be 2–80 characters." }, { status: 400 });
  }

  const topic = await prisma.topic.upsert({
    where: { name },
    update: {},
    create: { name },
  });

  return NextResponse.json({ topic }, { status: 201 });
}
