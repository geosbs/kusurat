import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { requireAdmin } from "@/lib/admin-auth";
import { uploadDir } from "@/lib/uploads";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_BYTES = 2 * 1024 * 1024;

function isWebpMagic(buffer: Buffer) {
  return (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  );
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Please choose a .webp image." }, { status: 400 });
  }

  if (!file.name.toLowerCase().endsWith(".webp") || file.type !== "image/webp") {
    return NextResponse.json({ error: "Only .webp files are allowed." }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Cover image must be under 2 MB." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (!isWebpMagic(buffer)) {
    return NextResponse.json({ error: "The file is not a valid .webp image." }, { status: 400 });
  }

  try {
    const meta = await sharp(buffer).metadata();
    if (meta.format !== "webp") {
      return NextResponse.json({ error: "The file is not a valid .webp image." }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "The file is not a valid .webp image." }, { status: 400 });
  }

  const name = `${crypto.randomUUID()}.webp`;
  const dir = uploadDir();
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), buffer);

  return NextResponse.json({ url: `/uploads/covers/${name}` });
}
