import { NextRequest, NextResponse } from "next/server";
import { getPublishedArticles, getPublishedByCategory } from "@/lib/articles";
import { isCategory } from "@/lib/categories";
import { clamp, jsonHeaders, publicArticleListItem } from "@/lib/public-article";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!rateLimit(clientIp(request))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: jsonHeaders() });
  }

  const categoryParam = request.nextUrl.searchParams.get("category");
  if (categoryParam && !isCategory(categoryParam)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400, headers: jsonHeaders() });
  }

  const limit = clamp(Number.parseInt(request.nextUrl.searchParams.get("limit") ?? "20", 10) || 20, 1, 50);
  const offset = clamp(Number.parseInt(request.nextUrl.searchParams.get("offset") ?? "0", 10) || 0, 0, 10_000);

  try {
    const articles = categoryParam
      ? await getPublishedByCategory(categoryParam)
      : await getPublishedArticles();

    const page = articles.slice(offset, offset + limit).map(publicArticleListItem);

    return NextResponse.json(
      {
        items: page,
        total: articles.length,
        limit,
        offset,
      },
      { headers: jsonHeaders() },
    );
  } catch {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503, headers: jsonHeaders() });
  }
}
