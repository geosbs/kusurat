export const SESSION_COOKIE = "admin_session";
export const CSRF_COOKIE = "admin_csrf";
export const SESSION_MAX_AGE = 60 * 60 * 8;

const DEV_SECRET = "dev-only-insecure-auth-secret-min-32-chars";

export function getAuthSecret() {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET must be set to at least 32 characters");
  }
  return DEV_SECRET;
}

export function sessionCookieOptions() {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export function csrfCookieOptions() {
  return {
    httpOnly: false as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}
