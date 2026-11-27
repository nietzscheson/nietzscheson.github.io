import { Hero } from "../organisms/Hero";
import { WorkedWith } from "../organisms/WorkedWith";
import { AboutSection } from "../organisms/AboutSection";
import { ServicesSection } from "../organisms/ServicesSection";
import { PrinciplesSection } from "../organisms/PrinciplesSection";
import { ProjectsSection } from "../organisms/ProjectsSection";
import { ExperienceSection } from "../organisms/ExperienceSection";
import { WritingSection } from "../organisms/WritingSection";
import { ContactCTA } from "../organisms/ContactCTA";
import { SiteLayout } from "../templates/SiteLayout";
import { bio, companies, experience, posts, principles, profile, projects, services } from "../../content/site";

/** The whole site on one page. Articles are the only other pages. */
export function HomePage({ animate = true }: { animate?: boolean }) {
  return (
    <SiteLayout spy>
      <Hero {...profile} animate={animate} />
      <WorkedWith companies={companies} />
      <AboutSection bio={bio} />
      <ServicesSection services={services} />
      <PrinciplesSection principles={principles} />
      <ProjectsSection projects={projects} />
      <ExperienceSection roles={experience} />
      <WritingSection posts={posts} />
      <ContactCTA email={profile.email} social={{ github: profile.social.github, linkedin: profile.social.linkedin, x: profile.social.x }} />
    </SiteLayout>
  );
}
