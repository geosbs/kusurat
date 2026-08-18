import Link from "next/link";
import { Logo } from "@/components/Logo";
import { getLatestArticles } from "@/lib/articles";
import { articlePath, CATEGORY_LABEL } from "@/lib/categories";
import { FOOTER_LINKS, SITE, TRUSTED_SOURCES } from "@/lib/site";

export async function Footer() {
  const year = new Date().getFullYear();
  const latest = await getLatestArticles(5);

  return (
    <footer className="bg-navy text-white">
      <div className="container-content py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <Link href="/" aria-label="GEOSBAU Startseite">
              <Logo />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">
              Praktische{" "}
              <Link href="/ratgeber" className="text-white hover:underline">
                Ratgeber
              </Link>
              , Checklisten und unabhängige Orientierung für{" "}
              <Link href="/raeumung" className="text-white hover:underline">
                Räumung
              </Link>{" "}
              und{" "}
              <Link href="/entruempelung" className="text-white hover:underline">
                Entrümpelung
              </Link>
              .
            </p>
            <p className="mt-6 text-sm text-white/80">
              <a className="hover:text-white hover:underline" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </p>
          </div>

          <nav aria-label="Footer-Navigation">
            <h2 className="text-sm font-semibold tracking-wide text-white">Seiten</h2>
            <ul className="mt-4 space-y-2 text-[14px] text-white/80">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Letzte Ratgeber">
            <h2 className="text-sm font-semibold tracking-wide text-white">Letzte Ratgeber</h2>
            <ul className="mt-4 space-y-3 text-[14px] text-white/80">
              {latest.map((article) => (
                <li key={article.id}>
                  <Link
                    href={articlePath(article.category, article.slug)}
                    className="leading-snug transition hover:text-white"
                  >
                    {article.title}
                  </Link>
                  <p className="mt-0.5 text-[11px] uppercase tracking-wider text-white/45">
                    {CATEGORY_LABEL[article.category]}
                  </p>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white">Offizielle Quellen</h2>
            <p className="mt-4 text-[13px] leading-6 text-white/65">
              Für rechtliche und umweltbezogene Fragen empfehlen wir unabhängige Stellen:
            </p>
            <ul className="mt-3 space-y-2 text-[14px] text-white/80">
              {TRUSTED_SOURCES.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-8 text-center text-xs tracking-wide text-white/50 md:text-left">
          © {year} GEOSBAU – Ratgeber &amp; Blog
        </p>
      </div>
    </footer>
  );
}
