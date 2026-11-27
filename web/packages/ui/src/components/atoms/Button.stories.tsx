import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  args: { children: "Get in touch", variant: "primary", size: "md" },
  argTypes: { variant: { control: "inline-radio", options: ["primary", "quiet"] }, size: { control: "inline-radio", options: ["md", "lg"] } },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const PrimaryLarge: Story = { args: { size: "lg" } };
export const Quiet: Story = { args: { variant: "quiet", children: "See my work" } };
export const AsLink: Story = { args: { href: "/#contact", children: "Email me" } };
export const Pair: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <Button href="/#contact" size="lg">Get in touch</Button>
      <Button href="/#work" variant="quiet">See my work</Button>
    </div>
  ),
};
