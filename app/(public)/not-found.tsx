import Link from "next/link";

export default function NotFound() {
  return (
    <main id="inhalt" className="bg-cream-soft py-24">
      <div className="container-content max-w-xl text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-ink-muted">404</p>
        <h1 className="mt-3 font-serif text-[36px] text-navy">Seite nicht gefunden</h1>
        <p className="mt-4 text-ink-muted">
          Die angeforderte Seite existiert nicht oder wurde verschoben.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Zur Startseite
        </Link>
      </div>
    </main>
  );
}
