---
number: 6
title: Make the call
tenet: Command is service
anchor: command-is-service
summary: >-
  Decide on people's behalf, carefully and in their service. Strong defaults beat a wall of options, and every call should be easy to undo.
quote: >-
  The dictator's job is to listen to everyone, but make the call according to their intuition, vision, and experience. Some calls will be wrong, and then they'll be reverted.
---

Omarchy is omakase: the chef chooses. That's a service, not a constraint. Every option you add to an interface is a decision handed back to the user, and a pile of options is often a sign that nobody decided. A good default carries real thought, real taste, and someone willing to stand behind it.

Making the call comes with two duties. Listen before you decide, and make every decision easy to reverse, because some calls will be wrong.

## In practice

### Ship a decision, not a questionnaire

Choose the terminal, the layout, the font, the theme, and the apps, and make them good enough to use untouched. Only ask what you can't possibly know, like a name, a password, or a keyboard layout.

**In Omarchy:** A fresh install asks a few questions and then "ships with everything a modern, savvy computer user needs to be productive immediately." ([Welcome to Omarchy](https://omarchy.org/manual/))

### One good way beats three options

Before adding a preference, try making a better default. A setting almost nobody would change is clutter, and it's one more thing to test.

**In Omarchy:** There's one way to update the whole system, Update > Omarchy, and it takes a snapshot first. "No per-app updaters nagging you at random." ([Coming from Mac or Windows](https://omarchy.org/manual/coming-from-mac-or-windows/#some-things-really-are-different))

### Show it only when it matters

A default layout should be quiet. Anything that only matters some of the time should appear when it has something to say, and step aside when it doesn't.

**In Omarchy:** The keyboard layout indicator only shows up once you've configured a second layout, the update badge only when an update is waiting, and the mode indicators only while a mode is on. ([The top bar](https://omarchy.org/manual/the-top-bar/))

### Make every call reversible

Strong opinions are safe when they're easy to undo. Take a snapshot before big changes, keep the old file around, and always offer one obvious way back to the defaults.

**In Omarchy:** Every update takes a snapshot you can boot back into. `omarchy bar defaults` restores the shipped bar, Update > Config resets individual configs, and a config replaced during an update is kept beside the new one as a `.bak`. ([Updates](https://omarchy.org/manual/updates/#rolling-back-bad-updates))

### Fail toward the default

When a customization breaks, fall back to something that works instead of leaving people with nothing. A broken extension should only take down itself.

**In Omarchy:** If the chosen bar plugin is missing or invalid, the shell falls back to the built-in bar, "so users always have a safe path home." A broken menu extension drops only your own entries, "while the shipped menu keeps working." ([Shell README](https://github.com/omacom/omarchy/blob/quattro/shell/README.md#plugin-manifest))

### Own the decision

Excellence doesn't come from committees. One person should hold the vision for a feature and make the call after hearing everyone out. You can always tell when an interface was designed by consensus, because every disagreement turned into a setting.

**In Omarchy:** The default prompt is minimal, and the manual explains the call in one person's voice: "I don't need to know the user, because it's always me, and I don't need to know the time, because it's always at the top." ([Prompt](https://omarchy.org/manual/prompt/))

## Room to play

The call is where Omarchy starts, not where you have to stop. Trusting the chef doesn't mean you can't send the dish back, and every default here can be overridden (see [It's your computer](../its-your-computer/)). When you make something for Omarchy, make your own calls just as boldly, and leave the same doors open.

## Paper cuts

- A first-run wizard with twenty questions.
- A preference nobody would ever change.
- A setting added to settle an argument instead of to serve a user.
- Defaults that only work after you configure them.
- A choice that can't be undone without a reinstall.
