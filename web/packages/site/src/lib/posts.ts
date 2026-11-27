import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts"> & { date: string; readingTime: string; href: string };

const dateOf = (filePath = "") => filePath.split("/").pop()?.slice(0, 10) ?? "1970-01-01";
const minutes = (body = "") => Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 220));

/** Published posts, newest first, with the date taken from the Jekyll file name. */
export async function getPosts(): Promise<Post[]> {
  const entries = await getCollection("posts", (p) => p.data.published);
  return entries
    .map((p) => ({ ...p, date: dateOf(p.filePath), readingTime: `${minutes(p.body)} min read`, href: `/${p.id}/` }))
    .sort((a, b) => b.date.localeCompare(a.date));
}
