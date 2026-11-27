import { RoleItem } from "../molecules/RoleItem";
import { Section } from "./Section";

type Role = { title: string; company: string; period: string; description?: string };

/** The career as a path, not a list: a lake-colored line with a stop per role. */
export function ExperienceSection({ roles, title = "Experience", id = "experience" }: { roles: Role[]; title?: string; id?: string }) {
  return (
    <Section title={title} id={id}>
      <ol className="ml-1 border-l border-accent/35">
        {roles.map((r, i) => (
          <RoleItem key={`${r.company}-${r.period}`} {...r} current={i === 0 && /present/i.test(r.period)} />
        ))}
      </ol>
    </Section>
  );
}
