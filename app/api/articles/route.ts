import { NextRequest, NextResponse } from "next/server";
import { CATEGORY_PAGE_SIZE, getPublishedPage } from "@/lib/articles";
import { isCategory } from "@/lib/categories";
import { isValidCursor, jsonHeaders } from "@/lib/public-article";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!rateLimit(clientIp(request), 40, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: jsonHeaders() });
  }

  const categoryParam = request.nextUrl.searchParams.get("category");
  if (categoryParam !== null && !isCategory(categoryParam)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400, headers: jsonHeaders() });
  }

  const cursorParam = request.nextUrl.searchParams.get("cursor");
  if (cursorParam !== null && !isValidCursor(cursorParam)) {
    return NextResponse.json({ error: "Invalid cursor" }, { status: 400, headers: jsonHeaders() });
  }

  try {
    const page = await getPublishedPage({
      category: isCategory(categoryParam) ? categoryParam : undefined,
      take: CATEGORY_PAGE_SIZE,
      cursor: cursorParam ?? undefined,
    });

    return NextResponse.json(
      {
        items: page.items,
        hasMore: page.hasMore,
        nextCursor: page.nextCursor,
      },
      { headers: jsonHeaders() },
    );
  } catch {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503, headers: jsonHeaders() });
  }
}
