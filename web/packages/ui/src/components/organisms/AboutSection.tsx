import { Text } from "../atoms/Text";
import { Section } from "./Section";

/** Short bio, set on a band. */
export function AboutSection({ bio }: { bio: string[] }) {
  return (
    <Section title="About" id="about" tone="band">
      <div className="grid max-w-measure gap-5">
        {bio.map((p) => <Text key={p.slice(0, 24)} size="lg">{p}</Text>)}
      </div>
    </Section>
  );
}
