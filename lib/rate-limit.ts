const hits = new Map<string, { count: number; resetAt: number }>();
const loginFailures = new Map<string, { count: number; resetAt: number }>();

const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 5 * 60 * 1000;

export function rateLimit(ip: string, limit = 60, windowMs = 60_000) {
  const now = Date.now();
  const current = hits.get(ip);

  if (!current || now > current.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  current.count += 1;
  if (current.count > limit) return false;
  return true;
}

export function loginAttemptAllowed(ip: string) {
  const now = Date.now();
  const current = loginFailures.get(ip);
  if (!current || now > current.resetAt) return true;
  return current.count < LOGIN_LIMIT;
}

export function recordLoginFailure(ip: string) {
  const now = Date.now();
  const current = loginFailures.get(ip);
  if (!current || now > current.resetAt) {
    loginFailures.set(ip, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return;
  }
  current.count += 1;
}

export function clearLoginFailures(ip: string) {
  loginFailures.delete(ip);
}

export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0]?.trim() || realIp?.trim();
  return ip && ip.length < 64 ? ip : "unknown";
}
