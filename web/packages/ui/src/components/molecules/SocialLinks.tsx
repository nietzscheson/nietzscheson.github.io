import { Icon, type IconName } from "../atoms/Icon";
import { cn } from "../../lib/cn";

type Links = Partial<Record<"github" | "linkedin" | "x" | "rss", string>>;
const labels: Record<keyof Links, string> = { github: "GitHub", linkedin: "LinkedIn", x: "X", rss: "RSS feed" };

export function SocialLinks({ links, className }: { links: Links; className?: string }) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {(Object.entries(links) as [keyof Links, string][]).map(([key, href]) => (
        <li key={key}>
          <a
            href={href}
            className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-highlight hover:text-ink"
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <Icon name={key as IconName} size={18} label={labels[key]} />
          </a>
        </li>
      ))}
    </ul>
  );
}
