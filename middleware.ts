import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth-config";
import { verifyAdminToken } from "@/lib/admin-token";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifyAdminToken(token) : null;
  const authenticated = Boolean(session);

  if (!authenticated && !isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    if (pathname !== "/admin") {
      url.searchParams.set("next", pathname);
    }
    return NextResponse.redirect(url);
  }

  if (authenticated && isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/posts";
    url.search = "";
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
