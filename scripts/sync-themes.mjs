#!/usr/bin/env node
// Copies the palettes of every Omarchy theme into src/data/themes.json, so the
// site is colored by the same colors.toml files that color the desktop.
//
//   npm run themes                       # reads $OMARCHY_PATH/themes
//   npm run themes -- ~/omarchy/themes   # or any themes directory
//
// Only colors are copied. Backgrounds, previews, and app configs stay in Omarchy.

import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] ?? path.join(process.env.OMARCHY_PATH ?? '/usr/share/omarchy', 'themes');
const out = new URL('../src/data/themes.json', import.meta.url);

const PALETTE_KEYS = [
  'accent', 'selection', 'muted',
  'background', 'dark_background', 'darker_background', 'lighter_background',
  'foreground', 'dark_foreground', 'light_foreground', 'bright_foreground',
  'red', 'yellow', 'orange', 'green', 'cyan', 'blue', 'magenta', 'brown',
  'bright_red', 'bright_yellow', 'bright_green', 'bright_cyan', 'bright_blue', 'bright_magenta',
];

// Hyprland's own fallback when a theme doesn't set hyprland_inactive_border.
const DEFAULT_INACTIVE_BORDER = ['#595959aa'];

if (!fs.existsSync(root)) {
  console.error(`No themes directory at ${root}. Pass one as an argument or set OMARCHY_PATH.`);
  process.exit(1);
}

// "rgba(26a269ee) rgba(2ec27eee) 45deg" -> { colors: ['#26a269ee', '#2ec27eee'], angle: 45 }
function parseHyprGradient(value) {
  if (!value) return null;
  const colors = [...value.matchAll(/rgba?\(([0-9a-fA-F]{6,8})\)|(#[0-9a-fA-F]{6,8})/g)]
    .map(([, hypr, hex]) => (hypr ? `#${hypr}` : hex).toLowerCase());
  const angle = Number(value.match(/(-?\d+(?:\.\d+)?)deg/)?.[1] ?? 0);
  return colors.length ? { colors, angle } : null;
}

function titleCase(id) {
  return id.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
}

const themes = [];
for (const id of fs.readdirSync(root).sort()) {
  const file = path.join(root, id, 'colors.toml');
  if (!fs.existsSync(file)) continue;

  const toml = fs.readFileSync(file, 'utf8');
  const read = (key) => toml.match(new RegExp(`^${key}\\s*=\\s*["']([^"']+)["']`, 'm'))?.[1];

  const colors = {};
  for (const key of PALETTE_KEYS) {
    const value = read(key);
    if (value && /^#[0-9a-fA-F]{6}$/.test(value)) colors[key] = value.toLowerCase();
  }
  const missing = ['background', 'foreground', 'accent', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan']
    .filter((key) => !colors[key]);
  if (missing.length) {
    console.error(`Skipping ${id}: colors.toml has no ${missing.join(', ')}`);
    continue;
  }

  themes.push({
    id,
    name: titleCase(id),
    mode: read('mode') === 'light' || fs.existsSync(path.join(root, id, 'light.mode')) ? 'light' : 'dark',
    colors,
    activeBorder: parseHyprGradient(read('hyprland_active_border')),
    inactiveBorder: parseHyprGradient(read('hyprland_inactive_border'))?.colors ?? DEFAULT_INACTIVE_BORDER,
  });
}

const versionFile = path.join(root, '..', 'version');
const omarchyVersion = fs.existsSync(versionFile) ? fs.readFileSync(versionFile, 'utf8').trim() : null;

fs.writeFileSync(out, JSON.stringify({ omarchyVersion, themes }, null, 2) + '\n');
console.log(`Wrote ${themes.length} themes to ${path.relative(process.cwd(), out.pathname)}`);
