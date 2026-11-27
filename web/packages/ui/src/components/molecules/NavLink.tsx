import { cn } from "../../lib/cn";

type Props = { href: string; label: string; active?: boolean; className?: string };

export function NavLink({ href, label, active, className }: Props) {
  return (
    <a
      href={href}
      aria-current={active ? "location" : undefined}
      className={cn(
        "relative text-sm transition-colors",
        active ? "text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-accent" : "text-muted hover:text-ink",
        className,
      )}
    >
      {label}
    </a>
  );
}
