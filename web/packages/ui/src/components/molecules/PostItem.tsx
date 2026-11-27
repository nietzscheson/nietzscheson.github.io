import { Text } from "../atoms/Text";

type Props = { title: string; date: string; description?: string; href: string; image?: string; readingTime?: string };

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

/** A post teaser: image, meta, title, one-line description. The whole block is the link target. */
export function PostItem({ title, date, description, href, image, readingTime }: Props) {
  return (
    <article className="group relative">
      {image && (
        <div className="aspect-[16/10] overflow-hidden rounded-md bg-highlight ring-1 ring-line">
          <img
            src={image}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        </div>
      )}
      <p className="mt-4 text-xs tabular-nums text-muted">
        <time dateTime={date}>{fmt(date)}</time>
        {readingTime && <span>, {readingTime}</span>}
      </p>
      <h3 className="mt-1 font-serif text-xl leading-snug text-ink text-balance">
        <a href={href} className="decoration-accent decoration-1 underline-offset-4 after:absolute after:inset-0 group-hover:underline">
          {title}
        </a>
      </h3>
      {description && <Text size="sm" tone="muted" className="mt-2">{description}</Text>}
    </article>
  );
}
