import type { SVGProps } from "react";

type LogoProps = SVGProps<SVGSVGElement> & {
  variant?: "light" | "dark";
  compact?: boolean;
};

export function Logo({ variant = "light", compact = false, className, ...props }: LogoProps) {
  const titleColor = variant === "light" ? "text-white" : "text-navy";
  const subtitleColor = variant === "light" ? "text-forest-mid" : "text-forest";

  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className={compact ? "h-9 w-9" : "h-11 w-11"}
        {...props}
      >
        <rect width="32" height="32" rx="8" fill={variant === "light" ? "#16324A" : "#0B1F33"} />
        <path
          fill="#6B8B47"
          d="M16.1 7.1 6.4 14.8a1.1 1.1 0 0 0-.4.8v.9c0 .4.3.7.7.7h1.1v7.2c0 .9.7 1.6 1.6 1.6h4.2v-6.1h4.8v6.1h4.2c.9 0 1.6-.7 1.6-1.6v-7.2h1.1c.4 0 .7-.3.7-.7v-.9c0-.3-.1-.6-.4-.8L16.1 7.1Z"
        />
        <path fill="#F4EFE6" d="M14.2 19.9h3.6V26H14.2z" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`text-[22px] font-bold tracking-[0.08em] ${titleColor}`}>GEOSBAU</span>
        <span className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${subtitleColor}`}>
          Ratgeber &amp; Blog
        </span>
      </span>
    </span>
  );
}
