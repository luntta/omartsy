---
number: 5
title: Make the ancestors smile
tenet: Heritage is duty
anchor: heritage-is-duty
summary: >-
  Fifty years of computing taught millions of hands the same keys and conventions. Use them, credit them, and break them only for something better.
quote: >-
  It's our duty to honor those who forged the path before us. From shipping basic vi fifty years after Bill Joy wrote the first version to dedicating a theme to von Neumann. We should be proud of how we got here and make our ancestors smile from retirement or above.
---

Conventions are the closest thing computing has to a shared language. `hjkl`, `Ctrl + C`, `--help`, `q` to quit, `?` for help, a config file you can open in any editor: someone invented each of them, and millions of people learned them. Using them honors the people who did the inventing and saves the people who did the learning.

Heritage is also a matter of taste. Terminals, bulletin boards, and Winamp knew how to make a computer feel alive. Omarchy brings some of that back on purpose.

## In practice

### Use the keys people already know

Reach for established keys before inventing new ones: vi motions to move, `?` for help, `q` or `Esc` to leave, `Ctrl + C` to cancel, `/` to search. People bring decades of muscle memory to your app. Put it to work.

**In Omarchy:** Lazygit, Lazydocker, Cliamp, and Hype all list every shortcut when you press `?`, and the tmux config copies text with a vi-style copy mode. ([TUIs](https://omarchy.org/manual/tuis/))

### Let text files be the settings panel

A plain-text config can be read, diffed, copied to the next machine, versioned, and edited by any tool, an agent included. A GUI can sit on top of it, but the file stays the source of truth.

**In Omarchy:** Settings live in text files, which "sounds primitive until you realize it means every tweak can be seen, copied to your next machine, and put in version control." The Setup menu just opens the right file and restarts whatever needs restarting. ([Coming from Mac or Windows](https://omarchy.org/manual/coming-from-mac-or-windows/#some-things-really-are-different))

### Speak Unix

Exit codes for scripts, stdout for data, stderr for complaints, and `--help` for humans. These contracts are older than most programmers, and every tool in the ecosystem understands them.

**In Omarchy:** If a script needs to know whether a toggle is on, `omarchy-toggle-enabled` "gives you an exit code instead of making you go looking." ([Toggles](https://omarchy.org/manual/toggles-idle-screensaver/#the-toggle-menu))

### Keep the classics alive

Old software that got something right is worth shipping again, and old forms like ASCII art, FIGlet lettering, and drop-down consoles still delight.

**In Omarchy:** Basic vi ships fifty years after Bill Joy wrote it. The scratchpad drops down over your workspace "much like a Quake console." The wordmark is drawn in a FIGlet font, and a Winamp-style music player comes in the box. ([Navigation](https://omarchy.org/manual/navigation/#scratchpad-workspace))

### Credit your sources

Name the projects you build on and the people behind them. Credit costs nothing to give and means a lot to the people who get it.

**In Omarchy:** The manual's first sentence names its foundations, Arch, Hyprland, and Quickshell, and its chapters link to each tool's own home. ([Welcome to Omarchy](https://omarchy.org/manual/))

## Room to play

Heritage is a foundation, not a cage. When the old way is a paper cut, fix it. The split between `Ctrl + C` and `Ctrl + Shift + C` was a convention too, and Omarchy replaced it with `Super + C` everywhere because that's better. Remix the past freely, the way themes like Retro 82 do. Honoring the ancestors means knowing what they knew, not freezing what they did.

## Paper cuts

- A new shortcut for search when `/` has done the job for half a century.
- A setting that can only be changed by clicking.
- A command with no `--help`.
- Errors swallowed silently, or printed to stdout where scripts expect data.
- Color codes in output that's being piped into another program.
