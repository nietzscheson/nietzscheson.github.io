import type { Meta, StoryObj } from "@storybook/react-vite";
import { Aphorism } from "./Aphorism";
import { principles } from "../../content/site";

const meta = {
  title: "Molecules/Aphorism",
  component: Aphorism,
  args: { n: 3, ...principles[2] },
  parameters: { docs: { description: { component: "The signature molecule. Each principle is a numbered, linkable aphorism." } } },
} satisfies Meta<typeof Aphorism>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Short: Story = { args: { n: 5, ...principles[4] } };
