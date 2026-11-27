import type { ReactNode } from "react";

/** A plain-text technology label. Deliberately not a pill: it reads as part of the prose. */
export function Tag({ children }: { children: ReactNode }) {
  return <span className="text-xs text-muted after:mx-2 after:text-line after:content-['/'] last:after:content-none">{children}</span>;
}
