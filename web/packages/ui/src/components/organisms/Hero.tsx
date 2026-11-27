import { Avatar } from "../atoms/Avatar";
import { Button } from "../atoms/Button";
import { Text } from "../atoms/Text";

type Props = {
  location: string;
  headline: string[];
  intro: string;
  name: string;
  role: string;
  avatar?: string;
  animate?: boolean;
};

export function Hero({ location, headline, intro, name, role, avatar, animate = true }: Props) {
  return (
    <section className="mx-auto w-full max-w-page px-4 pb-16 pt-14 sm:px-8 md:pb-24 md:pt-28">
      <div className="grid gap-6 md:grid-cols-[12rem_1fr] md:gap-12">
        <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-4 md:pt-4">
          <Avatar src={avatar} name={name} size="hero" />
          <div className="text-sm leading-snug">
            <p className="text-ink">{name}</p>
            <p className="text-muted">{role}</p>
            <p className="text-muted">{location}</p>
          </div>
        </div>
        <div>
          <h1 className="font-serif text-[2.6rem] font-light leading-[1.04] tracking-[-0.025em] text-ink sm:text-5xl lg:text-[5.25rem]">
            {headline.map((line, i) => (
              <span key={line} className={animate ? "animate-settle block" : "block"} style={{ ["--i" as string]: i }}>
                {line}
              </span>
            ))}
          </h1>
          <Text size="lg" className="mt-8 max-w-measure md:mt-10">{intro}</Text>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="/#contact" size="lg">Get in touch</Button>
            <Button href="/#work" variant="quiet">See my work</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
