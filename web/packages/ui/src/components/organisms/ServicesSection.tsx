import { ServiceItem } from "../molecules/ServiceItem";
import { Section } from "./Section";

type Props = { services: { title: string; description: string }[] };

export function ServicesSection({ services }: Props) {
  return (
    <Section title="What I do" id="services">
      <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
        {services.map((s) => <ServiceItem key={s.title} {...s} />)}
      </div>
    </Section>
  );
}
