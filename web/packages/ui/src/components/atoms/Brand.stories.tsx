import type { Meta, StoryObj } from "@storybook/react-vite";
import { Wordmark } from "./Wordmark";
import { SectionMark } from "./SectionMark";
import { Tag } from "./Tag";
import { Divider } from "./Divider";

const meta = { title: "Atoms/Brand marks", component: Wordmark } satisfies Meta<typeof Wordmark>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Wordmarks: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-10">
      <Wordmark variant="monogram" />
      <Wordmark variant="name" />
      <Wordmark variant="handle" />
    </div>
  ),
};
export const SectionMarks: Story = {
  name: "§ Section mark",
  render: () => (
    <div className="flex items-baseline gap-8">
      <SectionMark n={1} className="text-5xl" />
      <SectionMark n={3} className="text-3xl" />
      <SectionMark n={9} className="text-xl" />
    </div>
  ),
};
export const Tags: Story = { render: () => <p>{["RAG", "LangGraph", "AWS", "ADK"].map((t) => <Tag key={t}>{t}</Tag>)}</p> };
export const Rule: Story = { name: "Divider", render: () => <Divider className="w-80" /> };
