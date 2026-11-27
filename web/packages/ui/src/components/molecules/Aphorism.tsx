import { SectionMark } from "../atoms/SectionMark";
import { cn } from "../../lib/cn";

type Props = { n: number; title: string; gloss: string; className?: string };

/** One numbered aphorism. Each has a citable anchor: /#§3 */
export function Aphorism({ n, title, gloss, className }: Props) {
  const id = `§${n}`;
  return (
    <article id={id} className={cn("group grid scroll-mt-28 grid-cols-[3.25rem_1fr] gap-x-4 md:grid-cols-[4.5rem_1fr]", className)}>
      <a href={`#${id}`} className="pt-1 no-underline" title={`Link to ${id}`}>
        <SectionMark n={n} className="text-2xl md:text-3xl" />
      </a>
      <div>
        <h3 className="font-serif text-xl font-normal leading-snug text-ink text-balance md:text-2xl">{title}</h3>
        <p className="mt-2 max-w-measure text-sm text-muted text-pretty">{gloss}</p>
      </div>
    </article>
  );
}
