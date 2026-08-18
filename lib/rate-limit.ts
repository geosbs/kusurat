const hits = new Map<string, { count: number; resetAt: number }>();

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

export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  return ip && ip.length < 64 ? ip : "unknown";
}
