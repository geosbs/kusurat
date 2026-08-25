import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { uploadDir } from "@/lib/uploads";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ name: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const { name } = await context.params;
  if (!/^[a-zA-Z0-9_-]+\.webp$/.test(name)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const root = path.resolve(uploadDir());
  const resolved = path.resolve(path.join(root, name));
  if (!resolved.startsWith(root + path.sep)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const file = await readFile(resolved);
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
