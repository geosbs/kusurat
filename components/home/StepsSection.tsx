import {
  Boxes,
  CheckCircle2,
  Leaf,
  Recycle,
  ShieldCheck,
  Sparkles,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { STEPS } from "@/lib/site";

const stepIcons: LucideIcon[] = [
  CheckCircle2,
  Boxes,
  Sparkles,
  ShieldCheck,
  Recycle,
  Trash2,
  Leaf,
];

export function StepsSection() {
  const firstRow = STEPS.slice(0, 4);
  const secondRow = STEPS.slice(4);

  return (
    <section aria-labelledby="steps-heading" className="cv-auto bg-cream-bar pb-16 pt-8 lg:pb-20 lg:pt-10">
      <div className="container-content">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="steps-heading" className="font-serif text-[30px] leading-tight text-navy sm:text-[34px]">
            Unser Ansatz – in 7 Schritten zu mehr Leichtigkeit
          </h2>
          <span className="mt-4 inline-flex text-forest" aria-hidden="true">
            <Leaf className="h-5 w-5" strokeWidth={1.6} />
          </span>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {firstRow.map((step, index) => (
            <StepCard key={step.title} step={step} Icon={stepIcons[index]} />
          ))}
        </div>
        <div className="mx-auto mt-5 grid max-w-[900px] gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {secondRow.map((step, index) => (
            <StepCard key={step.title} step={step} Icon={stepIcons[index + 4]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  Icon,
}: {
  step: (typeof STEPS)[number];
  Icon: LucideIcon;
}) {
  return (
    <article className="rounded-2xl bg-white px-6 py-8 text-center shadow-card transition hover:shadow-card">
      <Link href={step.href} className="block">
      <div className="mx-auto mb-5 inline-flex h-[72px] w-[72px] items-center justify-center rounded-full bg-forest-pale">
        <Icon className="h-8 w-8 text-forest" strokeWidth={1.6} />
      </div>
      <h3 className="text-[16px] font-semibold text-navy">
        {step.letter} – {step.title}
      </h3>
      <p className="mt-3 text-[14px] leading-6 text-ink-muted">{step.text}</p>
      </Link>
    </article>
  );
}
