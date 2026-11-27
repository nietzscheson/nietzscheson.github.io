import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "./Heading";
import { Text } from "./Text";

const meta = { title: "Atoms/Heading", component: Heading, args: { children: "I build AI systems that turn documents into decisions.", size: "display", as: "h1" } } satisfies Meta<typeof Heading>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {};
export const XL: Story = { args: { size: "xl", children: "Have a hard problem with documents, agents or reliability?" } };
export const Large: Story = { args: { size: "lg", children: "Production is the only benchmark." } };
export const Medium: Story = { args: { size: "md", children: "AI and ML systems" } };
export const Rail: Story = { name: "Margin rail", args: { size: "rail", children: "How I work" } };
export const BodyText: Story = {
  name: "Text sizes and tones",
  render: () => (
    <div className="grid max-w-measure gap-4">
      <Text size="lg">Lede, 21px. Staff Software Engineer on the AI/ML team at Aviva.</Text>
      <Text>Body, 18px. I design agent workflows and LLM document pipelines, and the backends that keep them reliable.</Text>
      <Text size="sm" tone="muted">Secondary, 16px muted. Python and FastAPI services with clear contracts.</Text>
      <Text size="xs" tone="muted">Meta, 14px. Jan 14, 2026</Text>
    </div>
  ),
};
