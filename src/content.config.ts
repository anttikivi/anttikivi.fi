import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

const home = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/home" }),
});

export const collections = { home };
