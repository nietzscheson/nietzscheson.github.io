import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon, iconNames } from "./Icon";

const meta = { title: "Atoms/Icon", component: Icon, args: { name: "github", size: 24 } } satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = { argTypes: { name: { control: "select", options: iconNames } } };
export const Set: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 text-ink">
      {iconNames.map((n) => (
        <div key={n} className="grid w-16 justify-items-center gap-2">
          <Icon name={n} size={22} />
          <span className="text-xs text-muted">{n}</span>
        </div>
      ))}
    </div>
  ),
};
