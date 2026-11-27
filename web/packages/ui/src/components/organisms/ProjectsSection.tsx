import { ProjectItem } from "../molecules/ProjectItem";
import type { Project } from "../../content/site";
import { Section } from "./Section";

type Props = { projects: Project[]; title?: string; id?: string };

export function ProjectsSection({ projects, title = "Things I build", id = "work" }: Props) {
  return (
    <Section title={title} id={id}>
      <div className="border-b border-line">
        {projects.map((p) => <ProjectItem key={p.name} {...p} />)}
      </div>
    </Section>
  );
}
