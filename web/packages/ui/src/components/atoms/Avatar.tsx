import { useState } from "react";
import { cn } from "../../lib/cn";

type Props = { src?: string; name: string; size?: "sm" | "md" | "lg" | "hero"; className?: string };
const sizes = { sm: "size-8 text-xs", md: "size-12 text-sm", lg: "size-24 text-xl", hero: "size-14 md:size-24 text-xl" };

export function Avatar({ src, name, size = "sm", className }: Props) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(" ").slice(0, 2).map((p) => p[0]).join("");
  return (
    <span className={cn("relative inline-flex shrink-0 overflow-hidden rounded-full bg-highlight ring-1 ring-line", sizes[size], className)}>
      {src && !failed ? (
        <img src={src} alt={name} className="size-full object-cover grayscale-[35%]" onError={() => setFailed(true)} />
      ) : (
        <span role="img" aria-label={name} className="m-auto font-serif text-ink">{initials}</span>
      )}
    </span>
  );
}
