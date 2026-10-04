---
number: 8
title: No paper cut too small
tenet: Perfect the computer
anchor: perfect-the-computer
summary: >-
  Great software is the sum of a thousand small corrections. Hunt down the half-second waits, the wrong defaults, and the forgotten edge cases, and fix them because they're there.
quote: >-
  There's no paper cut too small, no incompatibility too difficult, and no partnership that's out of reach. … Everything should be faster, better, prettier.
---

Most of the gap between good software and great software lies in details nobody puts on a roadmap: the wait before a panel opens, a keyboard layout that's wrong at the lock screen, the pop at the start of a recording. Each one is small, and each one costs a little trust. Together they decide how a computer feels.

Omarchy chases these on purpose, in "the pursuit of excellence without justification." You don't need a business case to fix a paper cut. It's enough that it's there.

## In practice

### Treat speed as a feature

Every wait is a paper cut. Prefer instant over animated, already running over cold-started, and remembered over recomputed.

**In Omarchy:** Bar panels open instantly because they live inside a shell process that's already running, instead of spawning a new app. Switching workspaces has "no animation delay, just instant jumps." ([The top bar](https://omarchy.org/manual/the-top-bar/))

### Keyboard first, mouse welcome

Everything should be reachable from the keyboard, and the mouse should still work everywhere. Never make people aim at something tiny when a key would do.

**In Omarchy:** Every bar panel has a hotkey, "so you never have to aim at a 16-pixel glyph," and every panel speaks the same keys: arrows move, Return activates, Tab steps to the next panel, and Escape closes. ([The top bar](https://omarchy.org/manual/the-top-bar/#the-panels))

### Hand people the next step

Think one step ahead. Put the result wherever it'll be needed next, so nobody has to go looking for it.

**In Omarchy:** A screenshot is saved and copied to the clipboard at the same time. A transcoded video lands next to the original with its path on the clipboard, ready to drop into another app. Text pulled from the screen with OCR goes straight to the clipboard. ([Screenshots & recording](https://omarchy.org/manual/screenshots-recording/))

### Sweat the edge cases

Picture the worst possible moment to use your feature, and make it work then too.

**In Omarchy:** The lock screen resets your keyboard layout "so you're not typing your password in the wrong alphabet." Omasnap grabs the screen before its overlay appears, "so nothing shifts under you while you aim." And dismissing the screensaver cancels the pending lock: "You don't get locked out for glancing at your machine." ([Toggles](https://omarchy.org/manual/toggles-idle-screensaver/#the-lock-screen))

### Finish the job

Do the tidying people would otherwise do by hand. The last ten percent of a feature is the part everyone notices.

**In Omarchy:** Stopping a screen recording trims the first frame, normalizes the audio to -14 LUFS, and mutes the capture pop at the very start, all before it hands you the file. ([Screenshots & recording](https://omarchy.org/manual/screenshots-recording/#screen-recording))

### Same key in, same key out

The key that opens something should also close it. Nobody should need a second shortcut just to back out.

**In Omarchy:** `Print Screen` opens Omasnap, and `Print Screen` again dismisses it. `Alt + Print Screen` starts a recording and stops it. `Super + T` floats a window and tiles it again. ([Hotkeys](https://omarchy.org/manual/hotkeys/))

### Protect secrets by default

Some data is dangerous to keep around. Notice it, and handle it carefully without being asked.

**In Omarchy:** A decoded QR code goes to the clipboard marked as sensitive, so it never lingers in clipboard history, because "QR codes routinely carry secrets." ([Screenshots & recording](https://omarchy.org/manual/screenshots-recording/#text-qr-codes-and-colours))

## Room to play

Perfection is a direction, not a gate. Ship it, then keep polishing. Everyone's paper cuts are a little different, so start with the ones that bother you. Fix them for yourself first, and plenty of them will end up fixed for everyone (see [Invite the next nerd](../invite-the-next-nerd/)).

## Paper cuts

- A spinner where the answer could have been instant.
- "Are you sure?" on an action that's easy to undo.
- A toast that covers the button you were about to click.
- Focus that vanishes after a dialog closes.
- An action that works with the mouse but not the keyboard.
- A file saved somewhere you'll never find it.
