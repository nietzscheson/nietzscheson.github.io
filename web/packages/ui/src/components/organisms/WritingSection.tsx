import { PostItem } from "../molecules/PostItem";
import { Section } from "./Section";

type Post = { title: string; date: string; description?: string; href: string; image?: string; readingTime?: string };

export function WritingSection({ posts, title = "Writing", link }: { posts: Post[]; title?: string; link?: { href: string; label: string } }) {
  return (
    <Section title={title} id="writing" link={link}>
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
        {posts.map((p) => <PostItem key={p.href} {...p} />)}
      </div>
    </Section>
  );
}
