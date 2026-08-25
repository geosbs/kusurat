import path from "node:path";

export function uploadDir() {
  return process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads", "covers");
}
