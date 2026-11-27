import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";
import { profile } from "../../content/site";

const meta = { title: "Atoms/Avatar", component: Avatar, args: { src: profile.avatar, name: profile.name, size: "md" } } satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Photo: Story = {};
export const Sizes: Story = {
  render: (a) => (
    <div className="flex items-end gap-4">
      <Avatar {...a} size="sm" />
      <Avatar {...a} size="md" />
      <Avatar {...a} size="lg" />
    </div>
  ),
};
export const InitialsFallback: Story = { args: { src: undefined } };
