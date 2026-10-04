---
number: 9
title: It's your computer
tenet: Own the machine
anchor: own-the-machine
summary: >-
  Defaults are where Omarchy starts, and the person at the keyboard decides where it ends. Design for change, make overrides safe, and never lock a door.
quote: >-
  The Perfect Computer may start as omakase, but it's ultimately yours. Fully and completely. No tollbooths, no gatekeepers, no platforms that can change the terms on you.
---

This is the counterweight to [Make the call](../make-the-call/). Omarchy makes strong decisions so you don't have to, then hands you every key so you can change them. A good interface for Omarchy works the same way: opinionated out of the box, and completely malleable after that.

That's also how to read these guidelines. They describe the Omarchy way, never the only way, and they exist to help, not to control. As the manual says about the prompt: "Just don't go overboard (or do go overboard, do whatever you want, it's your computer!)"

## In practice

### Draw a clear line between ours and yours

People should always know which files belong to them and which belong to the system. Their changes go in their files, your updates go in yours, and neither overwrites the other.

**In Omarchy:** Everything in `/usr/share/omarchy` belongs to Omarchy and gets replaced on update. Everything in `~/.config` is yours. You override a default in your own files instead of editing the package. ([Dotfiles](https://omarchy.org/manual/dotfiles/))

### Offer every level of commitment

Some people want to drag things around, some want a command, and some want the file. Support all three and keep them in sync.

**In Omarchy:** You can move the bar by dragging it to another screen edge, by picking a position under Style > Menu Bar, by running `omarchy bar position bottom`, or by editing `shell.json`. ([The top bar](https://omarchy.org/manual/the-top-bar/#rearranging-the-bar))

### Respect the user's copy

Once someone has customized a file, it's theirs. Don't quietly merge your changes into it. Be upfront about what that means, and offer a clean way back.

**In Omarchy:** The moment you change the bar, your `shell.json` becomes canonical. "There's no deep merge," so new default widgets won't appear uninvited, and `omarchy bar defaults` brings back the shipped layout whenever you want it. ([The top bar](https://omarchy.org/manual/the-top-bar/#the-config-file))

### Clone, don't patch

Let people copy a built-in, change the copy, and switch back whenever they like, without touching the original.

**In Omarchy:** `omarchy plugin clone omarchy.clock` copies the built-in clock into a plugin of your own, named after your username, switches the bar over to it, and routes calls meant for the original to your copy. Remove the clone and the built-in comes back. ([Shell plugins](https://omarchy.org/manual/shell-plugins/#cloning-a-built-in-to-modify-it))

### Guardrails, not walls

Warn people, explain the risk, and then let them through. A computer that truly belongs to someone has no locked rooms.

**In Omarchy:** The manual advises against editing Omarchy's internal files, then adds: "Look, this is your computer. You can do whatever you want with it." The dev channel links the system to a git checkout you're free to hack on, because "Ain't nobody here to tell you what to do!" ([Dotfiles](https://omarchy.org/manual/dotfiles/#changing-internal-omarchy-files))

### Don't clamp taste

Validate what could break the system, and nothing more. How big, how bright, and how ridiculous is the owner's call.

**In Omarchy:** The shell's only floor on font size is one pixel. In the words of its source: "Themes and users can make this as large as they like; if the shell gets ridiculous, that's their call." ([Style.qml](https://github.com/omacom/omarchy/blob/quattro/shell/Commons/Style.qml))

### Protect ownership from strangers

Owning the machine means nobody else gets to run things on it without asking. Ask more of code from other people than of code the owner wrote.

**In Omarchy:** A theme you write yourself can do anything. A theme installed from someone else's repo keeps its colors but drops anything that could run code, because "installing someone's theme should change what your desktop looks like, never what it runs." ([Making your own theme](https://omarchy.org/manual/making-your-own-theme/#what-an-installed-theme-can-contain))

## Room to play

All of it. The defaults are a gift, not a contract. Rebind every key, replace the bar, write your own theme, fork a plugin, switch to the dev channel, and make the machine yours. When you make something for Omarchy, give the people who use it the same freedom you were given.

## Paper cuts

- Customizations that an update quietly resets.
- Real options hidden where only the source code knows about them.
- An override that only works if you edit the package's own files.
- No way back to the defaults.
- An account, a subscription, or any other tollbooth between people and their own settings.
