import type { ReactNode } from "react";
import { TextLink } from "../atoms/TextLink";
import { SiteLayout } from "./SiteLayout";

type ArticleProps = { title: string; date: string; description?: string; readingTime?: string; image?: string; children: ReactNode };

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

/** Long-form reading without site chrome: serif body at a comfortable measure. */
export function Article({ title, date, description, readingTime, image, children }: ArticleProps) {
  return (
    <article className="mx-auto w-full max-w-page px-4 pb-20 pt-16 sm:px-8 md:pt-24">
      <div className="grid gap-6 md:grid-cols-[12rem_1fr] md:gap-12">
        <div className="text-sm text-muted md:pt-3">
          <time dateTime={date} className="block">{fmt(date)}</time>
          {readingTime && <span className="block">{readingTime}</span>}
        </div>
        <div className="min-w-0">
          <h1 className="max-w-[20ch] font-serif text-3xl font-light leading-[1.1] tracking-[-0.02em] text-ink text-balance md:text-4xl">{title}</h1>
          {description && <p className="mt-5 max-w-measure text-lg text-muted text-pretty">{description}</p>}
          {image && <img src={image} alt="" className="mt-10 aspect-[16/9] w-full max-w-3xl rounded-md object-cover ring-1 ring-line" />}
          <div className="prose-article mt-10 max-w-measure">{children}</div>
          <footer className="mt-16 border-t border-line pt-6 text-sm">
            <TextLink href="/#writing" tone="muted">Back to all writing</TextLink>
          </footer>
        </div>
      </div>
    </article>
  );
}

/** Article inside the site chrome (used by Storybook; the Astro site wraps Article in its own layout). */
export function ArticleTemplate(props: ArticleProps) {
  return (
    <SiteLayout current="/#writing">
      <Article {...props} />
    </SiteLayout>
  );
}
