export const site = {
  name: 'omartsy',
  title: 'Human Interface Guidelines for Omarchy',
  description:
    'Human interface guidelines for Omarchy, written from the Omarchy Doctrine. Best practice and expression, never control.',
  version: '0.1',
  versionLabel: 'first draft',
  repo: 'https://github.com/luntta/omartsy',
  branch: 'main',
  doctrine: 'https://omarchy.org/doctrine/',
  manual: 'https://omarchy.org/manual/',
  // Omarchy's own default theme, and the light one used when the visitor's
  // system asks for light. Visitors can pick any theme; this is only the start.
  themes: {
    dark: 'tokyo-night',
    light: 'catppuccin-latte',
  },
} as const;

/** Prefixes a site path with the configured base, so the site works under a subpath. */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Link to edit a file in the repository. */
export function editUrl(file: string): string {
  return `${site.repo}/edit/${site.branch}/${file}`;
}
