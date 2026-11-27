import { cn } from "../../lib/cn";

type Props = { variant?: "name" | "handle" | "monogram"; className?: string };

/** Brand marks. The monogram is the § set in a circle: a citation mark for an engineer who writes. */
export function Wordmark({ variant = "name", className }: Props) {
  if (variant === "monogram") {
    return (
      <span
        className={cn("inline-grid size-9 place-items-center rounded-full bg-accent font-serif text-xl leading-none text-on-accent", className)}
        aria-label="nietzscheson"
        role="img"
      >
        <span aria-hidden className="-translate-y-px">§</span>
      </span>
    );
  }
  if (variant === "handle") {
    return <span className={cn("font-serif italic text-lg text-ink", className)}>nietzscheson</span>;
  }
  return <span className={cn("font-sans font-medium text-sm text-ink tracking-[-0.005em]", className)}>Cristian Angulo Nova</span>;
}
