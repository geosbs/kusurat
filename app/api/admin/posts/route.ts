import { NextRequest, NextResponse } from "next/server";
import type { ArticleStatus } from "@prisma/client";
import { requireAdmin } from "@/lib/admin-auth";
import { parsePostInput, resolvePublishState, toArticleData, uniqueSlug } from "@/lib/admin-post";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function statusFilter(tab: string | null): { status?: ArticleStatus } | Record<string, never> {
  if (tab === "published") return { status: "PUBLISHED" };
  if (tab === "queued") return { status: "SCHEDULED" };
  if (tab === "drafts") return { status: "DRAFT" };
  return {};
}

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  const tab = request.nextUrl.searchParams.get("tab");
  const posts = await prisma.article.findMany({
    where: statusFilter(tab),
    orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
  });

  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

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

  const slug = await uniqueSlug(parsed.data.slug);
  const publish = await resolvePublishState(parsed.data);
  const data = toArticleData(parsed.data, publish, slug);

  if (parsed.data.topic) {
    await prisma.topic.upsert({
      where: { name: parsed.data.topic },
      update: {},
      create: { name: parsed.data.topic },
    });
  }

  const post = await prisma.article.create({ data });
  return NextResponse.json({ post }, { status: 201 });
}
