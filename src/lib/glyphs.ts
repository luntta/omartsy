// Nerd Font glyphs used on the site, subset into src/assets/fonts/omartsy-glyphs.woff2.
// Kept as escapes on purpose: raw private-use characters are easy to lose in editors.
// To add one, append its code point here and to the subset command in README.md.
export const glyph = {
  /** The focused workspace, exactly as Omarchy's bar draws it. */
  workspace: '\u{F14FB}',
  /** The site's mark. */
  palette: '\u{F03D8}',
  /** Style > Theme in the Omarchy menu. */
  theme: '\u{F0E0C}',
  /** Learn > Keybindings in the Omarchy menu. */
  keyboard: '\u{F11C}',
  quote: '\u{F10D}',
  practice: '\u{F0AD}',
  play: '\u{F02B4}',
  cut: '\u{F0C4}',
  book: '\u{F405}',
  robot: '\u{F06A9}',
  markdown: '\u{F0354}',
  screensaver: '\u{F1104}',
  left: '\u{F104}',
  right: '\u{F105}',
  check: '\u{F00C}',
} as const;
