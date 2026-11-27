import type { Meta, StoryObj } from "@storybook/react-vite";
import { PrinciplesSection } from "./PrinciplesSection";
import { ServicesSection } from "./ServicesSection";
import { AboutSection } from "./AboutSection";
import { WorkedWith } from "./WorkedWith";
import { ProjectsSection } from "./ProjectsSection";
import { ExperienceSection } from "./ExperienceSection";
import { WritingSection } from "./WritingSection";
import { ContactCTA } from "./ContactCTA";
import { bio, companies, experience, posts, principles, profile, projects, services } from "../../content/site";

const meta = { title: "Organisms/Sections", component: PrinciplesSection, args: { principles }, parameters: { layout: "fullscreen" } } satisfies Meta<typeof PrinciplesSection>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Principles: Story = {};
export const About: Story = { name: "About (band)", render: () => <AboutSection bio={bio} /> };
export const Services: Story = { render: () => <ServicesSection services={services} /> };
export const Companies: Story = { render: () => <div className="pt-10"><WorkedWith companies={companies} /></div> };
export const Work: Story = { render: () => <ProjectsSection projects={projects} /> };
export const Experience: Story = { name: "Experience timeline", render: () => <ExperienceSection roles={experience} /> };
export const Writing: Story = { render: () => <WritingSection posts={posts} /> };
export const Contact: Story = { name: "Contact (band)", render: () => <ContactCTA email={profile.email} social={profile.social} /> };
