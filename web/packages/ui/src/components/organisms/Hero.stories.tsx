import type { Meta, StoryObj } from "@storybook/react-vite";
import { Hero } from "./Hero";
import { profile } from "../../content/site";

const meta = { title: "Organisms/Hero", component: Hero, args: { ...profile, animate: true }, parameters: { layout: "fullscreen" } } satisfies Meta<typeof Hero>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Static: Story = { args: { animate: false } };
