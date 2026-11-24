import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const link = z.object({ label: z.string(), href: z.string() });

// One canonical entry per project. Landing pages choose which projects to
// show and in what order (src/data/audiences.ts); they never restate facts.
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.mdx' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortTitle: z.string().optional(),
      summary: z.string(),
      // Optional alternate one-liners for audience pages (e.g. product framing).
      emphasis: z.record(z.string(), z.string()).default({}),
      period: z.string(),
      // Used for newest-first ordering on the base site.
      sortDate: z.coerce.date(),
      status: z.string(),
      institution: z.string().optional(),
      role: z.string(),
      collaborators: z.array(z.string()).default([]),
      topics: z.array(z.string()).default([]),
      accent: z.enum(['orange', 'blue', 'dusk', 'dawn']).default('orange'),
      image: image().optional(),
      imageAlt: z.string().optional(),
      links: z.array(link).default([]),
      // Keys into src/data/publications.ts
      publications: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    topics: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writing };
