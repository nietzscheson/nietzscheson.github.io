import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { content } from "@nietzscheson/ui";
import { getPosts } from "../lib/posts";

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${content.profile.name}, writing`,
    description: "Notes on AI systems, infrastructure and the craft of building software.",
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: new Date(`${p.date}T12:00:00Z`),
      link: p.href,
    })),
  });
}
