import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: NextRequest, context: RouteContext) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const { id } = await context.params;

  const post = await prisma.article.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  const updated = await prisma.article.update({
    where: { id },
    data: {
      status: "PUBLISHED",
      published: true,
      publishedAt: new Date(),
    },
  });

  return NextResponse.json({ post: updated });
}
