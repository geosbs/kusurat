import { jwtVerify } from "jose";
import { getAuthSecret } from "@/lib/auth-config";

export type AdminSession = {
  sub: string;
  email: string;
};

export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(getAuthSecret()), { algorithms: ["HS256"] });
    if (!payload.sub || typeof payload.email !== "string") return null;
    return { sub: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}
