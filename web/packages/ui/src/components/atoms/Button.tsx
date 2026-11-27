import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "quiet";
type Size = "md" | "lg";

type Common = { variant?: Variant; size?: Size; children: ReactNode; className?: string };
type AsLink = Common & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className">;
type AsButton = Common & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;
export type ButtonProps = AsLink | AsButton;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium transition-colors duration-200 select-none";
const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover",
  quiet: "text-ink underline decoration-line decoration-1 underline-offset-[6px] hover:decoration-accent",
};
const sizes: Record<Size, string> = {
  md: "text-sm h-10 px-5",
  lg: "text-base h-12 px-6",
};

export function Button({ variant = "primary", size = "md", className, children, ...rest }: ButtonProps) {
  const cls = cn(base, variants[variant], variant === "quiet" ? "px-1 h-auto" : sizes[size], className);
  if ("href" in rest && rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
