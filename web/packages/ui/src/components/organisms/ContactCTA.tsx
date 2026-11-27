import { Button } from "../atoms/Button";
import { Text } from "../atoms/Text";
import { SocialLinks } from "../molecules/SocialLinks";
import { Section } from "./Section";

type Props = { email: string; social: { github?: string; linkedin?: string; x?: string } };

export function ContactCTA({ email, social }: Props) {
  return (
    <Section title="Contact" id="contact" tone="band">
      <p className="max-w-[22ch] font-serif text-2xl font-light leading-tight text-ink text-balance md:text-3xl">
        Have a hard problem with documents, agents or reliability?
      </p>
      <Text className="mt-4 max-w-measure" tone="muted">
        I take on consulting, technical collaborations and the occasional full-time conversation. Email is the fastest way to reach me.
      </Text>
      <a
        href={`mailto:${email}`}
        className="mt-8 inline-block font-serif text-xl text-ink underline decoration-line decoration-1 underline-offset-8 hover:decoration-accent md:text-2xl"
      >
        {email}
      </a>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button href={`mailto:${email}`} size="lg">Email me</Button>
        <SocialLinks links={social} />
      </div>
    </Section>
  );
}
