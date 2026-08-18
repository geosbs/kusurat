import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValidSlug, jsonHeaders, publicArticleDetail } from "@/lib/public-article";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  if (!rateLimit(clientIp(_request))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: jsonHeaders() });
  }

  const { slug } = await context.params;
  if (!isValidSlug(slug)) {
    return NextResponse.json({ error: "Not found" }, { status: 404, headers: jsonHeaders() });
  }

  try {
    const article = await prisma.article.findFirst({
      where: { published: true, slug },
    });

    if (!article) {
      return NextResponse.json({ error: "Not found" }, { status: 404, headers: jsonHeaders() });
    }

    return NextResponse.json(publicArticleDetail(article), { headers: jsonHeaders() });
  } catch {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503, headers: jsonHeaders() });
  }
}
