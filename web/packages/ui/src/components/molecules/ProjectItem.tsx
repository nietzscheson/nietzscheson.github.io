import { Tag } from "../atoms/Tag";
import { Text } from "../atoms/Text";
import { TextLink } from "../atoms/TextLink";

type Props = { name: string; audience: string; url: string; description: string; stack?: string[] };

export function ProjectItem({ name, audience, url, description, stack }: Props) {
  const domain = url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  return (
    <article className="border-t border-line py-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="font-serif text-2xl font-normal text-ink">{name}</h3>
        <TextLink href={url} external tone="muted" className="text-xs">{domain}</TextLink>
      </div>
      <Text size="sm" tone="ink" className="mt-1">{audience}</Text>
      <Text size="sm" tone="muted" className="mt-2 max-w-measure">{description}</Text>
      {stack && (
        <p className="mt-3">
          {stack.map((s) => <Tag key={s}>{s}</Tag>)}
        </p>
      )}
    </article>
  );
}
