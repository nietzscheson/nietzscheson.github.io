import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextLink } from "./TextLink";

const meta = { title: "Atoms/TextLink", component: TextLink, args: { href: "#", children: "All writing" } } satisfies Meta<typeof TextLink>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Ink: Story = {};
export const Muted: Story = { args: { tone: "muted" } };
export const External: Story = { args: { href: "https://rento.la", external: true, children: "rento.la" } };
export const InProse: Story = {
  render: () => (
    <p className="max-w-measure text-body">
      I wrote about why I use <TextLink href="#">Nix for every project</TextLink>, and I build{" "}
      <TextLink href="https://rento.la" external>Rento</TextLink>.
    </p>
  ),
};
