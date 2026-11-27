import type { ReactNode } from "react";
import { SectionHeader } from "../molecules/SectionHeader";
import { cn } from "../../lib/cn";

type Props = {
  title?: string;
  id?: string;
  link?: { href: string; label: string };
  /** "band" sets the section on a full-bleed raised surface to break the rhythm of a long page. */
  tone?: "plain" | "band";
  children: ReactNode;
  className?: string;
};

/** Page rhythm: a margin rail for the section title, content in the reading column. */
export function Section({ title, id, link, tone = "plain", children, className }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={title && id ? `${id}-title` : undefined}
      className={cn("scroll-mt-16", tone === "band" && "border-y border-line bg-raised")}
    >
      <div className={cn("mx-auto w-full max-w-page px-4 py-16 sm:px-8 md:py-24", className)}>
        <div className="grid gap-6 md:grid-cols-[12rem_1fr] md:gap-12">
          <div>{title && <SectionHeader title={title} id={id ? `${id}-title` : undefined} link={link} />}</div>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
