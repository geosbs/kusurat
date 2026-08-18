import type { ReactNode } from "react";

type InnerPageProps = {
  title: string;
  intro: string;
  children?: ReactNode;
};

export function InnerPage({ title, intro, children }: InnerPageProps) {
  return (
    <section className="bg-cream-soft py-16 lg:py-20">
      <div className="container-content">
        <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
          Unabhängiger Ratgeber
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-[36px] leading-tight text-navy">{title}</h1>
        <p className="mt-5 max-w-3xl text-[17px] leading-7 text-ink-muted">{intro}</p>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
