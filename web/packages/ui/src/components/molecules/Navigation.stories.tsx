import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavLink } from "./NavLink";
import { SocialLinks } from "./SocialLinks";
import { ThemeToggle } from "./ThemeToggle";
import { SectionHeader } from "./SectionHeader";
import { nav, profile } from "../../content/site";

const meta = { title: "Molecules/Navigation", component: NavLink, args: { href: "/#writing", label: "Writing" } } satisfies Meta<typeof NavLink>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Link: Story = {};
export const Active: Story = { args: { active: true } };
export const NavRow: Story = {
  render: () => (
    <nav className="flex gap-7">
      {nav.map((n) => <NavLink key={n.href} {...n} active={n.href === "/#writing"} />)}
    </nav>
  ),
};
export const Social: Story = { render: () => <SocialLinks links={profile.social} /> };
export const Theme: Story = { name: "Theme toggle", render: () => <ThemeToggle /> };
export const Header: Story = {
  name: "Section header",
  render: () => <SectionHeader title="Writing" link={{ href: "/#writing", label: "All writing" }} />,
};
