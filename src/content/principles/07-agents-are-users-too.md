---
number: 7
title: Agents are users too
tenet: Welcome the agents
anchor: welcome-the-agents
summary: >-
  The next one to use your interface might be an agent. Give it the same doors people get: commands, files, and output a machine can read.
quote: >-
  Agents are welcome everywhere. In the code, in the issues, in the pull requests, and in the infrastructure.
---

Agents work a computer the way scripts always have, through commands, files, and text. If something can only be done by clicking, an agent can't help with it, and neither can a script, a dotfiles repo, or a power user with a shell.

The good news is that designing for agents is mostly just designing well. Clear names, discoverable commands, honest exit codes, and machine-readable output help everyone, with or without hands.

## In practice

### Give every action a command

If people can do something in the interface, agents and scripts should be able to do it from the command line, through the same code path.

**In Omarchy:** The `omarchy` CLI "has access to all the internal tooling that is used both via the menu and otherwise," which the manual notes is "particularly helpful when you're having an AI agent work with you on customization or configuration." ([Omarchy CLI](https://omarchy.org/manual/omarchy-cli/))

### Make it discoverable

An agent can't guess, and it shouldn't have to. List what exists, describe each thing in one line, and answer `--help` at every level.

**In Omarchy:** `omarchy` lists every command group, `omarchy <group> --help` goes a level deeper, and `omarchy commands --json` dumps the whole catalog with routes, arguments, and examples. Even the menu can be opened at a path, as in `omarchy menu summon style.theme`. ([Omarchy CLI](https://omarchy.org/manual/omarchy-cli/#opening-the-menu-from-the-terminal))

### Name things predictably

Consistent names let people and machines guess right. Pick a pattern and stick to it.

**In Omarchy:** Every command starts with `omarchy-`, the prefix says what kind of thing it does (`launch-`, `toggle-`, `theme-`, `install-`), and `omarchy theme set` is simply `omarchy-theme-set` with spaces. ([CLI router docs](https://github.com/omacom/omarchy/blob/quattro/docs/cli-router.md))

### Speak JSON when asked

Human-readable output is for people. Give anything a program might read a structured mode as well, and keep its shape stable.

**In Omarchy:** `omarchy plugin list --json` feeds other tools, and `omarchy toggle idle status` reports its state as JSON for scripts. ([Toggles](https://omarchy.org/manual/toggles-idle-screensaver/#idle))

### Confirm for people, flag for machines

Prompts protect people, but a prompt with no terminal just hangs. Ask when someone is there to answer. When nobody is, refuse rather than guess, and offer an explicit flag for automation.

**In Omarchy:** Plugin commands confirm in a terminal, and "without a terminal they refuse rather than guess." `--yes` skips every prompt, because "this is the path for scripts and AI agents." ([Shell README](https://github.com/omacom/omarchy/blob/quattro/shell/README.md#installing-a-third-party-plugin))

### Teach the agent, not just the user

Documentation for agents is still documentation. Ship the knowledge an agent needs to use your tool well, in the place agents look for it.

**In Omarchy:** Omarchy ships an agent skill for tailoring the system and links it into the skill folders of Claude Code, Codex, Pi, Antigravity, Hermes, and the generic `~/.agents/skills`, "so most harnesses pick it up automatically." ([AI](https://omarchy.org/manual/ai/#the-omarchy-skill))

### Keep agent mistakes cheap

Agents act fast and are sometimes wrong. Make their work easy to review and easy to undo.

**In Omarchy:** The manual suggests running agents in plan mode first, then being "ready to rollback changes or even invoking `omarchy reinstall configs`, if the agent makes a mess of everything." ([AI](https://omarchy.org/manual/ai/#the-omarchy-skill))

## Room to play

Welcome agents into the interface, not just the command line. Omarchy's bar has an agents panel that shows every subscription's limits, its "Make something" prompts hand a new theme, plugin, or app to your agent, and a crash notification passes the core dump to an agent to diagnose. Omarchy doesn't pick a favorite agent, so don't pick one for your users either. Work with whichever one they prefer.

## Paper cuts

- A setting that only exists as a checkbox.
- A prompt that waits forever when there's no terminal to answer it.
- Spinners and color codes mixed into output another program has to parse.
- An error that exits with status 0.
- A command that does something different when nobody's watching, without saying so.
