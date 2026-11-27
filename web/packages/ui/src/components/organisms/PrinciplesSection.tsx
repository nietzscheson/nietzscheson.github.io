import { Aphorism } from "../molecules/Aphorism";
import { Section } from "./Section";

type Props = { principles: { title: string; gloss: string }[]; intro?: string };

/** The signature section: how I work, as numbered aphorisms. */
export function PrinciplesSection({ principles, intro = "Nine aphorisms. Cite any of them by number." }: Props) {
  return (
    <Section title="How I work" id="principles">
      <p className="mb-10 text-sm text-muted">{intro}</p>
      <div className="grid gap-y-10 md:gap-y-12">
        {principles.map((p, i) => <Aphorism key={p.title} n={i + 1} {...p} />)}
      </div>
    </Section>
  );
}
