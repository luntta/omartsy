---
number: 4
title: Beautiful because it's right
tenet: Beauty is truth
anchor: beauty-is-truth
summary: >-
  Beauty isn't decoration added at the end. It's what exact spacing, coordinated color, and sharp alignment look like.
quote: >-
  Great tools are beautiful because they're right. The best curve of the blade is also the elegant one, so let's nail the sharp lines of that TUI, get those corner radii right, and polish the CLIs.
---

Omarchy refuses the old trade-off between useful and beautiful. A misaligned column is a bug. So is a color that's almost the accent, or padding that's off by two pixels. Fixing them is what makes an interface feel calm, legible, and trustworthy, and it's also what makes it gorgeous.

There's ambition in this, too. The doctrine has no patience for "desaturated brutalism." Plain gray isn't a neutral choice, just a different way to get it wrong. Omarchy wants things to shine.

## In practice

### Build from tokens, not from pixels

Spacing, type sizes, and dimensions should come from a scale, not from whatever looked right that afternoon. A scale keeps things consistent, and it lets an entire interface grow or shrink together.

**In Omarchy:** Every size in the shell derives from one base font size. Spacing steps through 2, 3, 4, 6, 8, 10, 12, 14, and 18 pixels, and type runs from a 10 px caption to a 28 px display. Change the base and everything scales in proportion, the bar included, "so larger fonts don't clip." ([Style.qml](https://github.com/omacom/omarchy/blob/quattro/shell/Commons/Style.qml))

### Coordinate color through roles

Pick a few roles and derive everything else from them. Hover, selection, and pressed states should be computed from the same palette, not invented one at a time.

**In Omarchy:** Shell controls are drawn from four roles: foreground, background, accent, and urgent. States are just opacity: a 4% fill at rest, 8% on hover, 18% when selected, and 22% when pressed. Every theme gets coherent states without having to define them. ([shell.toml template](https://github.com/omacom/omarchy/blob/quattro/default/themed/shell.toml.tpl))

### Let the corners follow the compositor

Radii, gaps, and borders are one system. Inherit them instead of picking your own, so your surface matches every window around it.

**In Omarchy:** The shell's corner radius mirrors Hyprland's `rounding`, which is square by default, and its distance from the screen edge comes from Hyprland's gaps. Switch on rounded corners in `looknfeel.lua` and the bar, menu, panels, notifications, and lock screen round along with your windows. ([Common tweaks](https://omarchy.org/manual/common-tweaks/#rounded-window-corners))

### Make hover, cursor, and focus look the same

Mouse users and keyboard users are using the same interface. A row under the mouse and a row under the keyboard cursor should look identical, so nobody has to learn two visual languages.

**In Omarchy:** By default the shell styles mouse hover, the panel's keyboard cursor, and tab focus the same way, "so mouse hover, keyboard cursor, and tab focus all read as the same state." Themes that want focus to stand out can override it. ([shell.toml template](https://github.com/omacom/omarchy/blob/quattro/default/themed/shell.toml.tpl))

### Polish the text interfaces too

TUIs and CLIs are interfaces, and they deserve the same care as anything with pixels: aligned columns, consistent wording, and help that actually helps.

**In Omarchy:** Running `omarchy` on its own prints a tidy command center of groups and common commands, and every group and every command answers `--help`. ([Omarchy CLI](https://omarchy.org/manual/omarchy-cli/))

### Make it shine

Restraint is a tool, not a religion. Rich color, real wallpapers, and a bit of glow are all welcome, as long as they're coordinated.

**In Omarchy:** A theme reaches the desktop, the terminal, Neovim, btop, Chromium, and the entire shell: bar, menu, notifications, OSD, and lock screen. Many themes go as far as a matching screen for unlocking the disk at boot. ([Themes](https://omarchy.org/manual/themes/))

## Room to play

Beauty has more than one dialect. Square or round, gapped or edge to edge, transparent or solid: Omarchy only asks that whatever you pick is coherent. Themes can pin any token they like, and the shell won't stop them. As a comment in its source puts it, "a theme that wants display-large = 64 should be allowed to ship it."

## Paper cuts

- A fourth gray that isn't in the palette.
- Three different corner radii on one screen.
- Icons borrowed from three different icon sets.
- Text that clips when someone bumps the font size.
- A table whose columns are almost aligned.
- Gray on gray, because nobody decided on a color.
