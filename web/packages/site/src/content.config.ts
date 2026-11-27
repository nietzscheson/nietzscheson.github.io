import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/* Posts are read straight from the Jekyll _posts folder, so both sites share one source during the move.
   Jekyll file names are YYYY-MM-DD-slug.md and the public URL is /slug/, so the id drops the date. */
const posts = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "../../../_posts",
    generateId: ({ entry }) => entry.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

export const collections = { posts };
