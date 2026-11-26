import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.iso.date(),
    description: z.string().optional(),
    originalUrl: z.url({ protocol: /^https?$/ }).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
