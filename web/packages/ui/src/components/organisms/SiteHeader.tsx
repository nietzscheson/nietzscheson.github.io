import { useState } from "react";
import { Avatar } from "../atoms/Avatar";
import { Icon } from "../atoms/Icon";
import { Wordmark } from "../atoms/Wordmark";
import { NavLink } from "../molecules/NavLink";
import { ThemeToggle } from "../molecules/ThemeToggle";
import { useActiveSection } from "../../lib/useActiveSection";

type Props = {
  items: { label: string; href: string }[];
  /** Highlight this href. On the one-page home, leave it empty and let scroll-spy decide. */
  current?: string;
  avatar?: string;
  /** Track which section is on screen and mark its nav item. */
  spy?: boolean;
};

const idOf = (href: string) => href.split("#")[1] ?? "";

export function SiteHeader({ items, current, avatar, spy = false }: Props) {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(items.map((i) => idOf(i.href)), spy);
  const isActive = (href: string) => (spy ? activeId === idOf(href) : current === href);
  return (
    <header className="sticky top-0 z-20 border-b border-line/60 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-6 px-4 sm:px-8">
        <a href="/#top" className="flex items-center gap-3" aria-label="Cristian Angulo Nova, home">
          <Avatar src={avatar} name="Cristian Angulo Nova" size="sm" />
          <Wordmark variant="name" className="hidden sm:inline" />
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {items.map((i) => (
            <NavLink key={i.href} {...i} active={isActive(i.href)} />
          ))}
        </nav>
        <div className="flex items-center">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-line px-4 pb-6 pt-2 md:hidden">
          <ul>
            {items.map((i) => (
              <li key={i.href}>
                <a
                  href={i.href}
                  aria-current={isActive(i.href) ? "location" : undefined}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3 font-serif text-xl text-ink aria-[current=location]:text-accent"
                >
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
