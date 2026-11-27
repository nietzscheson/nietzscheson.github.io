import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = { title: "Foundations/Tokens", parameters: { layout: "fullscreen" } };
export default meta;
type Story = StoryObj;

const primitives = [
  ["Snow", "--snow", "#F4F6F5", "Light background"],
  ["Mist", "--mist", "#D8E0E0", "Hairlines"],
  ["Stone", "--stone", "#5A666C", "Muted text"],
  ["Slate", "--slate", "#1B2428", "Ink"],
  ["Lake", "--lake", "#1E6E76", "Accent, light theme"],
  ["Lake bright", "--lake-bright", "#7FC4C9", "Accent, dark theme"],
  ["Night", "--night", "#0E1719", "Dark background"],
];
const semantic = ["bg", "raised", "ink", "body", "muted", "line", "accent", "on-accent", "highlight"];

export const Color: Story = {
  render: () => (
    <div className="bg-bg p-8 text-body">
      <h2 className="font-serif text-2xl font-light text-ink">Palette “Engadin”</h2>
      <p className="mt-2 max-w-measure text-sm text-muted">Lake, stone and snow from Sils-Maria. Primitives are never used directly in components.</p>
      <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-7">
        {primitives.map(([name, v, hex, role]) => (
          <div key={v}>
            <div className="h-20 rounded-md ring-1 ring-line" style={{ background: `var(${v})` }} />
            <p className="mt-2 text-sm font-medium text-ink">{name}</p>
            <p className="text-xs text-muted">{hex}</p>
            <p className="text-xs text-muted">{role}</p>
          </div>
        ))}
      </div>
      <h3 className="mt-12 font-serif text-xl text-ink">Semantic tokens</h3>
      <p className="mt-1 text-sm text-muted">Switch the theme in the toolbar: these swap, components don’t.</p>
      <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
        {semantic.map((t) => (
          <div key={t}>
            <div className="h-14 rounded-md ring-1 ring-line" style={{ background: `var(--color-${t})` }} />
            <p className="mt-2 text-xs text-ink">{t}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};

const scale = [
  ["5xl", "72", "Display headline", "text-5xl"],
  ["4xl", "60", "", "text-4xl"],
  ["3xl", "48", "Page title", "text-3xl"],
  ["2xl", "36", "Section statement", "text-2xl"],
  ["xl", "24", "Aphorism", "text-xl"],
  ["lg", "21", "Lede, margin titles", "text-lg"],
  ["base", "18", "Body", "text-base"],
  ["sm", "16", "UI, secondary", "text-sm"],
  ["xs", "14", "Meta", "text-xs"],
];

export const Typography: Story = {
  render: () => (
    <div className="bg-bg p-8">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm text-muted">Display and reading</p>
          <p className="mt-2 font-serif text-4xl font-light text-ink">Spectral</p>
          <p className="mt-2 max-w-measure text-sm text-muted">A screen-first literary serif by Production Type. Light 300 for headlines, italic for margin titles, regular for aphorisms and articles.</p>
        </div>
        <div>
          <p className="text-sm text-muted">Interface and body</p>
          <p className="mt-2 font-sans text-4xl font-medium text-ink">Schibsted Grotesk</p>
          <p className="mt-2 max-w-measure text-sm text-muted">A grotesk drawn for a newsroom: plain, sturdy, a little warm. Used for UI, body copy and meta.</p>
        </div>
      </div>
      <h3 className="mt-14 font-serif text-xl text-ink">Scale</h3>
      <p className="mt-1 text-sm text-muted">The classic typographic scale from The Elements of Typographic Style.</p>
      <div className="mt-6 divide-y divide-line border-y border-line">
        {scale.map(([k, px, role, cls]) => (
          <div key={k} className="grid grid-cols-[5rem_1fr] items-baseline gap-4 py-3 sm:grid-cols-[5rem_8rem_1fr]">
            <span className="text-xs text-muted">{k}, {px}px</span>
            <span className="hidden text-xs text-muted sm:block">{role}</span>
            <span className={`truncate font-serif font-light text-ink ${cls}`}>Become who you are</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const SpacingAndShape: Story = {
  name: "Spacing & shape",
  render: () => (
    <div className="bg-bg p-8">
      <h3 className="font-serif text-xl text-ink">Spacing</h3>
      <p className="mt-1 max-w-measure text-sm text-muted">4px base. Sections breathe at 56–80px vertical; the page column is 72rem with a 12rem margin rail and a 40rem reading measure.</p>
      <div className="mt-6 grid gap-2">
        {[1, 2, 3, 4, 6, 8, 12, 14, 20].map((n) => (
          <div key={n} className="flex items-center gap-4">
            <span className="w-16 text-xs text-muted">{n * 4}px</span>
            <span className="h-3 rounded-sm bg-accent" style={{ width: n * 4 }} />
          </div>
        ))}
      </div>
      <h3 className="mt-12 font-serif text-xl text-ink">Shape</h3>
      <p className="mt-1 max-w-measure text-sm text-muted">Radius follows meaning: full for actions and people, 6px for images, none for lists. No shadows; hairlines separate.</p>
      <div className="mt-6 flex flex-wrap items-end gap-8">
        <div className="text-center"><div className="h-10 w-28 rounded-full bg-accent" /><p className="mt-2 text-xs text-muted">Action</p></div>
        <div className="text-center"><div className="size-12 rounded-full bg-highlight ring-1 ring-line" /><p className="mt-2 text-xs text-muted">Person</p></div>
        <div className="text-center"><div className="h-16 w-28 rounded-md bg-highlight ring-1 ring-line" /><p className="mt-2 text-xs text-muted">Image</p></div>
        <div className="text-center"><div className="h-16 w-28 border-y border-line" /><p className="mt-2 text-xs text-muted">List item</p></div>
      </div>
    </div>
  ),
};
