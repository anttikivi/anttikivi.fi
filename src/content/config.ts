import { defineCollection, z } from 'astro:content';

const homeCollection = defineCollection({
  type: 'content',
  schema: z.object({ title: z.string() }),
});

export const collections = { home: homeCollection };
