import type { ElementType, ReactNode } from "react";
import { cn } from "../../lib/cn";

type Size = "display" | "xl" | "lg" | "md" | "rail";
const sizes: Record<Size, string> = {
  display: "font-serif font-light text-[2.5rem] leading-[1.06] tracking-[-0.02em] sm:text-4xl md:text-5xl",
  xl: "font-serif font-light text-2xl md:text-3xl tracking-[-0.015em]",
  lg: "font-serif font-normal text-xl md:text-2xl tracking-[-0.01em]",
  md: "font-sans font-semibold text-base tracking-[-0.005em]",
  rail: "font-serif italic font-normal text-lg",
};

type Props = { as?: ElementType; size?: Size; className?: string; children: ReactNode; id?: string };

export function Heading({ as: Tag = "h2", size = "lg", className, children, ...rest }: Props) {
  return (
    <Tag className={cn("text-ink text-balance", sizes[size], className)} {...rest}>
      {children}
    </Tag>
  );
}
