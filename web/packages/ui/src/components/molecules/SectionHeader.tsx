import { Heading } from "../atoms/Heading";
import { TextLink } from "../atoms/TextLink";

type Props = { title: string; id?: string; link?: { href: string; label: string } };

/** Sits in the left margin rail on wide screens, like a note in a book's margin. */
export function SectionHeader({ title, id, link }: Props) {
  return (
    <div className="flex items-baseline justify-between gap-4 md:sticky md:top-24 md:flex-col md:items-start md:gap-2">
      <Heading as="h2" size="rail" id={id}>
        {title}
      </Heading>
      {link && (
        <TextLink href={link.href} tone="muted" className="text-xs">
          {link.label}
        </TextLink>
      )}
    </div>
  );
}
