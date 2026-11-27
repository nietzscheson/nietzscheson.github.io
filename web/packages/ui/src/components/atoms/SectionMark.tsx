import { cn } from "../../lib/cn";

/** The § aphorism number — the brand's signature glyph. Real sequence, citable by anchor. */
export function SectionMark({ n, className }: { n: number; className?: string }) {
  return (
    <span className={cn("font-serif font-light text-accent tabular-nums", className)}>
      <span className="sr-only">Aphorism {n}</span>
      <span aria-hidden className="mr-[0.15em] opacity-70">§</span>
      <span aria-hidden>{n}</span>
    </span>
  );
}
