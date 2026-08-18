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
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        className={compact ? "h-9 w-9" : "h-11 w-11"}
        {...props}
      >
        <path
          d="M8 22.5L24 9l16 13.5V39a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V22.5Z"
          stroke="#6B8B47"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M18 41V27.5h12V41"
          stroke="#6B8B47"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M29.5 12.5c2.8-1.2 6.2.4 7 3.2.6 2.1-.3 4.1-2.1 5.2"
          stroke="#6B8B47"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M32.2 16.2c1.8.2 3.4 1.6 3.6 3.4"
          stroke="#6B8B47"
          strokeWidth="2"
          strokeLinecap="round"
        />
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
