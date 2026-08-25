"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Newspaper } from "lucide-react";
import { adminFetch } from "@/components/admin/admin-fetch";

export function AdminShell({ children, email }: { children: React.ReactNode; email?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await adminFetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div lang="en" className="min-h-screen bg-cream">
      <header className="border-b border-white/10 bg-navy text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-6">
            <Link href="/admin/posts" className="font-serif text-xl tracking-wide text-gold">
              GEOSBAU Admin
            </Link>
            <nav className="flex items-center gap-3 text-sm">
              <Link
                href="/admin/posts"
                className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 ${
                  pathname.startsWith("/admin/posts") ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
                }`}
              >
                <Newspaper className="h-4 w-4" />
                Posts
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/70">
            {email ? <span className="hidden sm:inline">{email}</span> : null}
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8 text-ink">{children}</main>
    </div>
  );
}
