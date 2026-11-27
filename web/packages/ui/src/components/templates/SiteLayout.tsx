import type { ReactNode } from "react";
import { SiteHeader } from "../organisms/SiteHeader";
import { SiteFooter } from "../organisms/SiteFooter";
import { nav, profile } from "../../content/site";

type Props = { current?: string; spy?: boolean; children: ReactNode };

/** Chrome shared by the home page and articles. */
export function SiteLayout({ current, spy, children }: Props) {
  return (
    <div id="top" className="flex min-h-dvh flex-col bg-bg">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent">
        Skip to content
      </a>
      <SiteHeader items={nav} current={current} spy={spy} avatar={profile.avatar} />
      <main id="main" className="flex-1">{children}</main>
      <SiteFooter role={profile.role} nav={[...nav, { label: "RSS", href: "/feed.xml" }]} social={profile.social} />
    </div>
  );
}
