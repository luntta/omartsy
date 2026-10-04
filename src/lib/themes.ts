import data from '../data/themes.json';
import { site } from '../site';
import { contrast, dimmed, readable } from './color';

type Palette = Record<string, string>;

export interface Theme {
  id: string;
  name: string;
  mode: 'light' | 'dark';
  colors: Palette;
  activeBorder: { colors: string[]; angle: number } | null;
  inactiveBorder: string[];
}

export const themes = data.themes as Theme[];
export const omarchyVersion = data.omarchyVersion;

export function getTheme(id: string): Theme {
  const theme = themes.find((t) => t.id === id);
  if (!theme) throw new Error(`Unknown theme "${id}". Run \`npm run themes\` to refresh src/data/themes.json.`);
  return theme;
}

/** The ANSI-style hues every Omarchy palette defines. */
export const HUES = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'] as const;

/** The swatches shown for a theme, in the order a terminal would list them. */
export function swatches(theme: Theme): string[] {
  const c = theme.colors;
  return [c.background, c.foreground, c.accent, ...HUES.map((hue) => c[hue])];
}

function tokens(theme: Theme): Record<string, string> {
  const c = theme.colors;
  const bg = c.background;
  const fg = c.foreground;
  const accentText = readable(c.accent, bg);

  // Hyprland's angle runs clockwise from horizontal; CSS starts from the top.
  const border = theme.activeBorder?.colors ?? [c.accent];
  const angle = 90 + (theme.activeBorder?.angle ?? 45);
  const borderImage = `linear-gradient(${angle}deg, ${border.length > 1 ? border.join(', ') : `${border[0]}, ${border[0]}`})`;

  // Text set on an accent-colored fill: the theme's own colors when they read,
  // plain black or white only when they don't.
  const ink = [bg, c.darker_background ?? bg, c.bright_foreground ?? fg, '#000000', '#ffffff'];
  const onAccent =
    ink.find((candidate) => contrast(candidate, c.accent) >= 4.5) ??
    ink.reduce((best, candidate) => (contrast(candidate, c.accent) > contrast(best, c.accent) ? candidate : best));

  const out: Record<string, string> = {
    'color-scheme': theme.mode,
    // Read by `content: var(--theme-name)`, so the current theme's name is
    // right on first paint, before any script runs.
    '--theme-name': JSON.stringify(theme.name),
    '--bg': bg,
    '--bg-dark': c.dark_background ?? bg,
    '--bg-darker': c.darker_background ?? c.dark_background ?? bg,
    '--bg-lighter': c.lighter_background ?? bg,
    '--fg': fg,
    '--fg-bright': c.bright_foreground ?? fg,
    '--fg-dim': dimmed(fg, bg),
    '--accent': c.accent,
    '--accent-text': accentText,
    '--on-accent': onAccent,
    '--selection': c.selection ?? c.lighter_background ?? bg,
    '--muted': c.muted ?? c.dark_foreground ?? fg,
    '--border': theme.inactiveBorder[0],
    '--border-active': border[0],
    '--border-active-image': borderImage,
  };
  for (const hue of HUES) {
    out[`--${hue}`] = c[hue];
    out[`--${hue}-text`] = readable(c[hue], bg);
  }
  return out;
}

function block(selector: string, theme: Theme): string {
  const body = Object.entries(tokens(theme))
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
  return `${selector} {\n${body}\n}`;
}

/**
 * Every theme as a [data-theme] block, plus the defaults: Omarchy's own
 * Tokyo Night, or a light theme when the visitor's system asks for one and
 * no script has picked a theme yet.
 */
export function themesCss(): string {
  const dark = getTheme(site.themes.dark);
  const light = getTheme(site.themes.light);
  return [
    `/* Generated from Omarchy ${omarchyVersion ?? ''} theme palettes (src/data/themes.json). */`,
    block(':root', dark),
    `@media (prefers-color-scheme: light) {\n${block(':root:not([data-theme])', light)}\n}`,
    ...themes.map((theme) => block(`[data-theme="${theme.id}"]`, theme)),
  ].join('\n\n');
}
