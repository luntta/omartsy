---
number: 10
title: Invite the next nerd
tenet: You're somebody now
anchor: youre-somebody-now
summary: >-
  Every interface is an on-ramp. Teach as people go, keep the step from user to maker small, and welcome everyone willing to learn.
quote: >-
  Omarchy is for everyone willing to learn and participate. … Show up, fix something, or just spread the enthusiasm.
---

The same Omarchy serves script kiddies and staff engineers. That works because its interfaces come in layers: menus for discovering, hotkeys for speed, commands for automating, files for owning, and source for everything else. Each layer points to the next, so curiosity always has somewhere to go.

Good interfaces teach while you use them. Great ones also make it obvious how to change them, and then how to share what you made. That's how a user becomes somebody.

## In practice

### One key to find the rest

Give people a single, memorable way to see everything they can do, and keep it available everywhere.

**In Omarchy:** `Super + K` shows every keybinding. "That's the only hotkey you actually have to memorize." ([Coming from Mac or Windows](https://omarchy.org/manual/coming-from-mac-or-windows/#give-it-two-weeks))

### Meet people where they come from

Newcomers bring habits from other systems. Translate those habits instead of mocking them, and let old muscle memory keep working wherever it does no harm.

**In Omarchy:** A whole chapter of the manual maps Spotlight, AirDrop, and Time Machine to their Omarchy equivalents. `Super + Q` closes windows too, "if that's the finger memory you arrived with." ([Coming from Mac or Windows](https://omarchy.org/manual/coming-from-mac-or-windows/))

### Ship examples, not just docs

Every extension point should come with a working example people can copy. A sample file teaches faster than a reference page.

**In Omarchy:** Every hook folder holds a `.sample` file, and you "drop the `.sample` from the name to put it to work." The theme template folder includes a fully commented sample, and the menu extension file documents every field in comments. ([Dotfiles](https://omarchy.org/manual/dotfiles/#running-scripts-on-system-events))

### Make the first contribution small

The step from tweaking to making should take one command, not a weekend of setup. Keep the loop between changing something and seeing it short.

**In Omarchy:** Cloning a built-in plugin is one command, and saving any file under `~/.config/omarchy/plugins/` reloads it, "so you can leave the editor open and watch your changes land." The agents panel's "Make something" prompts will even get a new theme, plugin, or app started for you. ([Shell plugins](https://omarchy.org/manual/shell-plugins/#cloning-a-built-in-to-modify-it))

### Make sharing a link

When someone makes something good, getting it to everyone else should take one URL.

**In Omarchy:** Plugins and themes are both shared as git repositories. `omarchy plugin add <url>` installs a plugin, Install > Style > Theme takes a theme's URL, and the [community plugin directory](https://plugins.omarchy.org) helps people find what others have made. ([Shell plugins](https://omarchy.org/manual/shell-plugins/#sharing-yours-with-the-world))

### Explain the why

Instructions say what to do. Explanations make people capable. Share your reasons along with your steps.

**In Omarchy:** The manual doesn't just say to use a wired keyboard. It explains that full-disk encryption can't take a password from a Bluetooth keyboard at startup, "just like you can't use a Bluetooth keyboard to enter the BIOS on a PC." ([Getting started](https://omarchy.org/manual/getting-started/#use-a-wired-or-24ghz-keyboard))

## Room to play

Make something and give it away: a theme, a widget, an app, a pun song, a fix for a typo in the manual. Somebody will learn from it, and that's how a community of nerds grows. You're somebody now. Act like it, and invite the next one in.

## Paper cuts

- Docs that assume you already know the answer.
- An extension point with no example.
- An error message full of internals and empty of advice.
- A contribution process that starts with asking permission.
- Jargon where a plain word would do.
