---
number: 1
title: One computer
tenet: Unite the nerds
anchor: unite-the-nerds
summary: >-
  Dozens of tools, one machine. Whatever you make should feel like it was always part of Omarchy.
quote: >-
  But we're spread across a thousand little fiefdoms, accomplishing a fraction of what we could together.
---

Linux has never been short of brilliant tools. What it has lacked is a computer that holds them together. Every toolkit brings its own colors, every app its own shortcuts, every daemon its own idea of what a notification looks like. Omarchy's answer is to make dozens of independent projects, from Hyprland and Neovim to tmux, btop, and Chromium, feel like one machine.

When you make something for Omarchy, you're joining that machine. Fit in at the joints: the colors, the keys, and the surfaces everyone shares. Your own character lives on top of those.

## In practice

### Take your colors from the theme

Don't hardcode a color that the theme should own. Use the palette's roles (`background`, `foreground`, `accent`, `muted`, and `red` for anything urgent) and your work will look right in all twenty-two themes, including the ones nobody has made yet.

**In Omarchy:** One `colors.toml` generates the configs for the terminals, btop, Chromium, Hyprland, Neovim, Helix, VS Code, Obsidian, and the entire shell. Apps that Omarchy doesn't know about can be taught with a template in `~/.config/omarchy/themed/`. ([Making your own theme](https://omarchy.org/manual/making-your-own-theme/))

### Follow the theme live

A theme switch should reach your app without a restart. Nobody should have to relaunch anything to see the new colors.

**In Omarchy:** Changing the theme retints running terminals, Hyprland, btop, the browser, and editors in one pass, and Claude Code, Pi, OpenCode, and Hermes follow along too. Anything else can listen on the `theme-set` hook. ([Dotfiles](https://omarchy.org/manual/dotfiles/#running-scripts-on-system-events))

### Use the shared surfaces

Before you draw a popup, check whether the system already has one. Notifications, pickers, menus, and password prompts belong to the shell, so using them gets you theming, keyboard control, and Do Not Disturb for free.

**In Omarchy:** Omarchy's own scripts send every toast through `omarchy-notification-send` and never call `notify-send` directly. Pickers like the timezone and plugin lists borrow the menu's select mode instead of drawing their own UI. ([Menu docs](https://github.com/omacom/omarchy/blob/quattro/docs/menu.md#select-and-input-modes))

### Keep the shared keys working

`Super` belongs to the system, and so do the clipboard keys, which work everywhere, the terminal included. Don't let your app be the one place they break. Keep your own shortcuts inside your app, and leave the `Super` combinations alone.

**In Omarchy:** `Super + C`, `Super + V`, and `Super + X` copy, paste, and cut in nearly every app, which ends the old Linux split between `Ctrl + C` and `Ctrl + Shift + C`. ([Unified clipboard](https://omarchy.org/manual/unified-clipboard-history/))

### Give every action three doors

A feature worth having deserves a hotkey for speed, a menu entry for discovery, and a command for scripts. All three should flip the same switch, so whichever one people learn first behaves exactly like the others.

**In Omarchy:** Night light, Do Not Disturb, and stay awake each have a hotkey, a row under Trigger > Toggle, and an `omarchy toggle` command, "all hitting the same switch." ([Toggles](https://omarchy.org/manual/toggles-idle-screensaver/))

## Room to play

Unity is about the joints, not the faces. Cliamp channels Winamp 2. Hype has a presentation canvas all its own, and it still picks up your Omarchy theme. A theme can go further still and ship its own `shell.toml` to decide exactly how every shell surface looks. Fit in at the edges and be yourself in the middle.

## Paper cuts

- A hex code that looks great in Tokyo Night and wrong in the other twenty-one themes.
- A homemade notification popup that ignores Do Not Disturb.
- A shortcut that steals a `Super` combination the system already uses.
- A feature that only exists as a button, with no command and no hotkey.
- An app that stays dark after the theme goes light.
