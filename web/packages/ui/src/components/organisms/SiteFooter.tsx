import { Wordmark } from "../atoms/Wordmark";
import { SocialLinks } from "../molecules/SocialLinks";

type Props = {
  role: string;
  nav: { label: string; href: string }[];
  social: { github?: string; linkedin?: string; x?: string; rss?: string };
  year?: number;
};

export function SiteFooter({ role, nav, social, year = new Date().getFullYear() }: Props) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-12 sm:px-8 md:grid-cols-[12rem_1fr] md:gap-12">
        <Wordmark variant="monogram" />
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-sm text-ink">Cristian Angulo Nova</p>
            <p className="text-sm text-muted">{role}</p>
            <nav aria-label="Footer" className="mt-6">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {nav.map((n) => (
                  <li key={n.href}><a href={n.href} className="text-muted hover:text-ink">{n.label}</a></li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="sm:text-right">
            <SocialLinks links={social} className="-ml-3 sm:ml-0 sm:-mr-3 sm:justify-end" />
            <p className="mt-2 text-xs text-muted">© {year} Cristian Angulo Nova</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
