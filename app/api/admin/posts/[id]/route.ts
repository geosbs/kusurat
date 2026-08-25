import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { parsePostInput, resolvePublishState, toArticleData, uniqueSlug } from "@/lib/admin-post";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const { id } = await context.params;
  const post = await prisma.article.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const { id } = await context.params;

  const existing = await prisma.article.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parsePostInput(body);
  if (parsed.error || !parsed.data) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const slug = await uniqueSlug(parsed.data.slug, id);
  const publish = await resolvePublishState(parsed.data, id);
  const data = toArticleData(parsed.data, publish, slug);

  if (parsed.data.topic) {
    await prisma.topic.upsert({
      where: { name: parsed.data.topic },
      update: {},
      create: { name: parsed.data.topic },
    });
  }

  const post = await prisma.article.update({ where: { id }, data });
  return NextResponse.json({ post });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const { id } = await context.params;
  try {
    await prisma.article.delete({ where: { id } });
  } catch {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
