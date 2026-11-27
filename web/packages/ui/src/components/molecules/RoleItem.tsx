import { Text } from "../atoms/Text";
import { cn } from "../../lib/cn";

type Props = { title: string; company: string; period: string; description?: string; current?: boolean };

/** One stop on the experience timeline. Meant to be rendered inside an <ol>. */
export function RoleItem({ title, company, period, description, current }: Props) {
  return (
    <li className="relative pb-8 pl-8 last:pb-0">
      <span
        aria-hidden
        className={cn(
          "absolute left-[-5px] top-[0.45rem] size-[9px] rounded-full ring-2 ring-accent",
          current ? "bg-accent" : "bg-bg",
        )}
      />
      <p className="text-xs tabular-nums text-muted">
        {period}
        {current && <span className="ml-2 text-accent">Current</span>}
      </p>
      <h3 className="mt-1 text-base font-semibold text-ink">
        {title} <span className="font-normal text-muted">at {company}</span>
      </h3>
      {description && <Text size="sm" tone="muted" className="mt-1 max-w-measure">{description}</Text>}
    </li>
  );
}
