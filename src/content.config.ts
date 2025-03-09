import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const home = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/home" }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    // locale: z.enum(locales),
    // route: z.enum(Object.keys(routes.en) as [string, ...string[]]),
    title: z.string(),
  }),
});

export const collections = { home, pages };
