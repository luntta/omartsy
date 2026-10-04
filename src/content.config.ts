import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One file per principle. The filename (minus its number) is the URL slug.
const principles = defineCollection({
  loader: glob({
    pattern: '*.md',
    base: './src/content/principles',
    generateId: ({ entry }) => entry.replace(/^\d+-/, '').replace(/\.md$/, ''),
  }),
  schema: z.object({
    // Position in the doctrine, and the key that jumps to it.
    number: z.number().int().min(1).max(10),
    title: z.string(),
    // The line of the Omarchy Doctrine this principle reads as interface design.
    tenet: z.string(),
    // Anchor of that tenet on omarchy.org/doctrine/.
    anchor: z.string(),
    // One or two sentences: the principle, stated plainly.
    summary: z.string(),
    // The doctrine's own words, quoted exactly. Use … for omissions.
    quote: z.string(),
  }),
});

export const collections = { principles };
