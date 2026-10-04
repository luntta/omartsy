# omartsy

Human Interface Guidelines for Omarchy.

Read them at **[luntta.fi/omartsy](https://luntta.fi/omartsy/)**.

These guidelines are for anyone making things for [Omarchy](https://omarchy.org): apps, TUIs, command-line tools, shell plugins, themes, menus, scripts, and the agents that help build them. They're written from [the Omarchy Doctrine](https://omarchy.org/doctrine/). Each of its ten lines becomes one principle, read as interface design.

Work should be fun, but it should be productive. The guidelines describe best practice and leave room for expression. They are never about control.

## The principles

| # | Principle | From the doctrine |
|---|---|---|
| 1 | One computer | Unite the nerds |
| 2 | Nice and sincere | Hold the line |
| 3 | Serious fun | Have some fun |
| 4 | Beautiful because it's right | Beauty is truth |
| 5 | Make the ancestors smile | Heritage is duty |
| 6 | Make the call | Command is service |
| 7 | Agents are users too | Welcome the agents |
| 8 | No paper cut too small | Perfect the computer |
| 9 | It's your computer | Own the machine |
| 10 | Invite the next nerd | You're somebody now |

Each principle quotes its line of the doctrine, then comes in three parts:

- **In practice**: habits that work. Every one is backed by an **In Omarchy** paragraph that points at something Omarchy already does, with a link to where it's documented.
- **Room to play**: where the principle leaves space for expression.
- **Paper cuts**: common ways to get it wrong.

## Running it

```sh
npm install
npm run dev      # http://localhost:4321/omartsy/
npm run build    # static site in dist/
npm run check    # type-check the Astro project
```

Requires Node 22.12 or newer (Astro 7). The site lives under `/omartsy/`, locally too, because that's where it's published. Build links with `url()` from `src/site.ts` so they keep that prefix.

## Publishing

Every push to `main` builds the site and publishes it with GitHub Pages ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). It's a project site of [luntta.github.io](https://github.com/luntta/luntta.github.io), which carries the `luntta.fi` domain, so it appears at `luntta.fi/omartsy` with no `CNAME` of its own. The path comes from `site` and `base` in `astro.config.mjs`.

Pages needs one setting: in the repository's Settings > Pages, set the source to **GitHub Actions**.

## Writing a principle

Principles live in `src/content/principles/`, one Markdown file each. The number prefix sets the order and the rest of the filename is the URL slug.

```md
---
number: 4
title: Beautiful because it's right
tenet: Beauty is truth           # the doctrine line it reads
anchor: beauty-is-truth          # that line's anchor on omarchy.org/doctrine/
summary: >-
  One or two sentences stating the principle.
quote: >-
  The doctrine's own words, quoted exactly. Use … for omissions.
---

Two short paragraphs on what the principle means for interfaces.

## In practice

### An imperative heading for the practice

What to do and why, in a few sentences.

**In Omarchy:** Where Omarchy already does this, quoting the manual where it helps. ([Chapter](https://omarchy.org/manual/...))

## Room to play

## Paper cuts

- A specific way to get it wrong.
```

Keep the three section headings exactly as written: the site gives them their glyphs and colors by their ids. A paragraph that starts with `**In Omarchy:**` is set apart as evidence. Only make claims about Omarchy you can link to.

Every principle is also served as plain Markdown at `/principles/<slug>.md`, and `/llms.txt` indexes them for agents.

## How the site is built

The site draws itself as an Omarchy desktop. A shell bar runs along the top, and the ten principles are its workspaces. Content sits in Hyprland-style windows with Omarchy's real values: 10px gaps, 2px borders, square corners. The active border follows the mouse, the way Hyprland's focus does. The colors come from Omarchy's own themes.

- **Themes**: `src/data/themes.json` holds the palettes of every Omarchy theme, copied from their `colors.toml` files. `src/lib/themes.ts` turns them into CSS custom properties named after the `colors.toml` roles (`--bg`, `--fg`, `--accent`, `--red`…), served at `/themes.css`. When a theme's accent or ANSI colors are too faint to read as text, `src/lib/color.ts` derives `-text` variants that meet WCAG AA by moving only their lightness. To pick up new or changed Omarchy themes:

  ```sh
  npm run themes                       # reads $OMARCHY_PATH/themes
  npm run themes -- ~/omarchy/themes   # or any themes directory
  ```

- **Fonts**: JetBrains Mono, Omarchy's default font, is the system voice: the bar, headings, and keys. Charis SIL, a descendant of Bitstream Charter, which shipped with X11, carries the prose.
- **Glyphs**: the few Nerd Font icons the site uses are subset from JetBrainsMono Nerd Font into `src/assets/fonts/omartsy-glyphs.woff2`. Add the code point to `src/lib/glyphs.ts`, then rebuild the font:

  ```sh
  uvx --from 'fonttools[woff]' python scripts/subset-glyphs.py
  ```

- **Wordmark**: `src/data/wordmark.txt` is "omartsy" set in the FIGlet font Delta Corps Priest 1, the same face as Omarchy's wordmark. `src/lib/wordmark.ts` draws it as SVG, since browsers don't reliably tile block characters.

## Keys

| Key | Does |
|---|---|
| `1` … `0` | Jump to a principle |
| `h` `l` | Previous or next principle |
| `j` `k` | Move through the list, or scroll |
| `Backspace` | Back to all principles |
| `t` | Pick a theme. Arrows preview, Enter keeps, Esc puts it back. |
| `?` | Show the keys |

There's also a screensaver. Type the computer's name.

## Credits

- Text quoted from [the Omarchy Doctrine](https://omarchy.org/doctrine/) and [the Omarchy Manual](https://omarchy.org/manual/) is linked to its source.
- Theme palettes come from [Omarchy](https://github.com/omacom/omarchy) (MIT) and the themes it includes.
- [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono) and [Charis SIL](https://software.sil.org/charis/) are licensed under the SIL Open Font License.
- Icons come from [Nerd Fonts](https://www.nerdfonts.com), which bundles Font Awesome, Material Design Icons, and other sets under their own licenses.
