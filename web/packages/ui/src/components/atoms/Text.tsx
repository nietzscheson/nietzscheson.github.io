import type { ElementType, ReactNode } from "react";
import { cn } from "../../lib/cn";

type Props = {
  as?: ElementType;
  size?: "lg" | "base" | "sm" | "xs";
  tone?: "body" | "muted" | "ink";
  className?: string;
  children: ReactNode;
};
const sizes = { lg: "text-lg", base: "text-base", sm: "text-sm", xs: "text-xs" };
const tones = { body: "text-body", muted: "text-muted", ink: "text-ink" };

export function Text({ as: Tag = "p", size = "base", tone = "body", className, children }: Props) {
  return <Tag className={cn("text-pretty", sizes[size], tones[tone], className)}>{children}</Tag>;
}
