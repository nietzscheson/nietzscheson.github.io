import type { Meta, StoryObj } from "@storybook/react-vite";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { nav, profile } from "../../content/site";

const meta = { title: "Organisms/Site chrome", component: SiteHeader, args: { items: nav, current: "/#writing", avatar: profile.avatar }, parameters: { layout: "fullscreen" } } satisfies Meta<typeof SiteHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Header: Story = {};
export const HeaderMobile: Story = { name: "Header, mobile", globals: { viewport: { value: "mobile1" } } };
export const Footer: Story = {
  render: () => <SiteFooter role={profile.role} nav={[...nav, { label: "RSS", href: "/feed.xml" }]} social={profile.social} year={2026} />,
};
