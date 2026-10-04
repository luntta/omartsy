// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Set `site` (and `base`, if it lives under a path) when deploying. llms.txt
  // and the canonical links use it to produce absolute URLs.
  // site: 'https://example.com',

  // Astro 7 strips whitespace between inline elements by default, which glues
  // adjacent links and keycaps together in prose. Keep v6 behaviour.
  compressHTML: true,

  // Fetch a page while the pointer or keyboard focus rests on its link.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
