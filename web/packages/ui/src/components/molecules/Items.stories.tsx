import type { Meta, StoryObj } from "@storybook/react-vite";
import { PostItem } from "./PostItem";
import { ProjectItem } from "./ProjectItem";
import { RoleItem } from "./RoleItem";
import { ServiceItem } from "./ServiceItem";
import { experience, posts, projects, services } from "../../content/site";

const meta = { title: "Molecules/List items", component: PostItem, args: posts[0] } satisfies Meta<typeof PostItem>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Post: Story = {};
export const Project: Story = { render: () => <ProjectItem {...projects[0]} /> };
export const Role: Story = { render: () => <RoleItem {...experience[0]} /> };
export const Service: Story = { render: () => <div className="max-w-sm"><ServiceItem {...services[0]} /></div> };
