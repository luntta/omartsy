// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Published by GitHub Pages as a project site. luntta.github.io carries the
  // luntta.fi domain, so this repo is served at luntta.fi/omartsy without a
  // CNAME of its own. llms.txt and the canonical links use these for absolute URLs.
  site: 'https://luntta.fi',
  base: '/omartsy',

  // Astro 7 strips whitespace between inline elements by default, which glues
  // adjacent links and keycaps together in prose. Keep v6 behaviour.
  compressHTML: true,

  // Fetch a page while the pointer or keyboard focus rests on its link.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
