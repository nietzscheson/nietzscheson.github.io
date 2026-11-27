import type { AnchorHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "./Icon";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { external?: boolean; tone?: "ink" | "muted" };

/** Inline link. External links get a small ↗ glyph because they leave the site. */
export function TextLink({ external, tone = "ink", className, children, ...rest }: Props) {
  return (
    <a
      className={cn(
        "inline-flex items-baseline gap-1 underline decoration-1 underline-offset-4 transition-colors",
        tone === "ink" ? "text-ink decoration-line hover:decoration-accent" : "text-muted decoration-transparent hover:text-ink hover:decoration-line",
        className,
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
      {external && <Icon name="external" size={14} className="translate-y-[2px] shrink-0" />}
    </a>
  );
}
