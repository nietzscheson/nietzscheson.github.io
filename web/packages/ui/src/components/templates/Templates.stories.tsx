import type { Meta, StoryObj } from "@storybook/react-vite";
import { SiteLayout } from "./SiteLayout";
import { ArticleTemplate } from "./ArticleTemplate";

const meta = {
  title: "Templates/Layouts",
  component: SiteLayout,
  parameters: { layout: "fullscreen" },
  args: {
    children: <div className="mx-auto max-w-page px-4 py-16 sm:px-8"><div className="h-96 rounded-md border border-dashed border-line md:ml-[15rem]" /></div>,
  },
} satisfies Meta<typeof SiteLayout>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Site: Story = { name: "Site layout" };
export const Article: Story = {
  render: () => (
    <ArticleTemplate title="Article title set in Spectral light" date="2026-01-10" readingTime="6 min read" description="The description from the post's front matter.">
      <p>Body copy in the reading measure.</p>
      <h2>A subheading</h2>
      <p>More copy, with <a href="#">a link</a> and <code>inline code</code>.</p>
    </ArticleTemplate>
  ),
};
