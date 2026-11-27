import type { Meta, StoryObj } from "@storybook/react-vite";
import { CompanyList } from "./CompanyList";
import { companies } from "../../content/site";

const meta = { title: "Molecules/CompanyList", component: CompanyList, args: { companies } } satisfies Meta<typeof CompanyList>;
export default meta;
type Story = StoryObj<typeof meta>;

export const WorkedWith: Story = {};
