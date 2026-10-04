---
number: 2
title: Nice and sincere
tenet: Hold the line
anchor: hold-the-line
summary: >-
  Talk to people the way a good colleague would. Say what happened, tell the truth about risk, and never trick anyone.
quote: >-
  It just cared about the work, the art, the dare. … Just be nice and sincere.
---

The original hacker ethic judged the work and nothing else. Interfaces can live by the same rule. Software that respects people has no need to manipulate them, flatter them, or nag them. It does the job, says what it did, and is honest about what it can't do.

Being nice means being helpful and patient: assume good intent, explain instead of scolding, and make mistakes easy to recover from. Being sincere means never faking urgency, never overselling, and never hiding a risk in the fine print.

## In practice

### Say what happened, in plain words

Confirm an action with a short, factual message that uses the same verb as the action. If the button said Save, the toast says Saved. Leave out the exclamation marks and the marketing.

**In Omarchy:** Confirmations read "Theme changed" and "Screenshot saved." Because you just asked for them, they're also the only everyday toasts that get through Do Not Disturb. ([Toggles](https://omarchy.org/manual/toggles-idle-screensaver/#do-not-disturb))

### Tell the truth about risk

When something is dangerous, say so before it happens, in a sentence people will actually read, and let them say no.

**In Omarchy:** Before it adds a third-party plugin, Omarchy "tells you plainly that plugins run as arbitrary, unsandboxed code inside your long-lived shell process, shows you the URL, and asks you to confirm." You can leave the plugin switched off and go read its code first. ([Shell plugins](https://omarchy.org/manual/shell-plugins/#adding-a-plugin-from-git))

### Don't oversell

Describe what a feature does, and also what it doesn't. A sincere interface would rather under-promise.

**In Omarchy:** Muting crash notifications for a program comes with an honest footnote: "this hides the reminder, it doesn't fix anything." ([AI](https://omarchy.org/manual/ai/#crash-diagnosis))

### Earn every interruption

Attention belongs to the person at the keyboard. Use the quietest form that works, save critical for real emergencies, and say a thing once.

**In Omarchy:** Omarchy's own notifications default to low urgency. Do Not Disturb still lets critical alerts from the command line through, but "chat apps that mark everything critical to force their way in front of you don't qualify." Silenced notifications go straight to history, so nothing is lost. And when every agent account runs past its limit, "you'll hear about it once." ([Notification docs](https://github.com/omacom/omarchy/blob/quattro/docs/notifications.md#silencing))

### Make the safe choice the default

When an action can't be undone, the default answer should be the one that keeps people's data. Ask once, ask clearly, and lean toward keeping.

**In Omarchy:** Removing Hermes asks whether your chats, memories, and settings should go too, and the default answer is no. ([AI](https://omarchy.org/manual/ai/#desktop-apps))

### When you refuse, point the way

A guardrail is kind when it explains itself. If you block something, say why, say what to do instead, and trust experts with the way around.

**In Omarchy:** Run `pacman -Syu` yourself and Omarchy stops you, because you'd miss the snapshot and the migrations. It points you to `omarchy update` instead, and "if you really know what you're doing, the guard will tell you how to bypass it for a single transaction." ([Updates](https://omarchy.org/manual/updates/#warning-about-direct-pacmanyay-updates))

## Room to play

Nice doesn't mean bland, and sincere doesn't mean solemn. Omarchy's own voice has plenty of attitude: "Ain't nobody here to tell you what to do!" Be funny, be blunt, have opinions. The line is manipulation. A joke is fine. A guilt trip is not.

## Paper cuts

- "Something went wrong." What went wrong, and what can I do about it?
- A decline button that shames: "No thanks, I like slow computers."
- A box that comes pre-checked to opt people into something.
- Fake urgency: badges, countdowns, and "critical" alerts that aren't.
- A "What's new" dialog standing between someone and the work they opened the app to do.
- An error that apologizes instead of explaining.
