"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { NAV_ITEMS } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, searchOpen]);

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/ratgeber?q=${encodeURIComponent(value)}` : "/ratgeber");
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <header className="sticky top-0 z-50 bg-navy">
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-navy"
      >
        Zum Inhalt springen
      </a>
      <div className="container-content flex h-[78px] items-center justify-between gap-6">
        <Link href="/" aria-label="GEOSBAU Startseite" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${active ? "nav-link-active text-white" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="text-white/90 transition hover:text-white"
            aria-label="Suche öffnen"
          >
            <Search className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="text-white"
            aria-label="Suche öffnen"
          >
            <Search className="h-5 w-5" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="text-white"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobiles Menü"
          className="border-t border-white/10 bg-navy px-5 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-md px-3 py-3 text-base ${
                      active ? "bg-white/10 text-white" : "text-white/85"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}

      {searchOpen ? (
        <div className="fixed inset-0 z-[70] bg-navy/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="search-title">
          <div className="mx-auto mt-24 max-w-lg rounded-xl bg-white p-6 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <h2 id="search-title" className="font-serif text-xl text-navy">
                Beiträge durchsuchen
              </h2>
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="Suche schließen">
                <X className="h-5 w-5 text-ink-muted" />
              </button>
            </div>
            <form onSubmit={onSearch}>
              <label htmlFor="site-search" className="sr-only">
                Suchbegriff
              </label>
              <input
                id="site-search"
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="z. B. Entrümpelung, Checkliste, Keller…"
                className="w-full rounded-md border border-cream-dark bg-cream-soft px-4 py-3 text-ink outline-none ring-forest focus:ring-2"
              />
              <button type="submit" className="btn-primary mt-4 w-full">
                Suchen
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </header>
  );
}
