// The desktop runs on the keyboard, like Omarchy: number keys jump between
// principles the way Super + number jumps between workspaces.

import { glyph } from '../lib/glyphs';

const root = document.documentElement;
const THEME_KEY = 'omartsy:theme';
const SECRET = 'omarchy';
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

const storage = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Private windows and blocked storage: the theme just won't be remembered.
    }
  },
};

// ------------------------------------------------------------------ clock

// Omarchy's bar clock: "dddd HH:mm".
function startClock() {
  const clock = document.querySelector<HTMLTimeElement>('[data-clock]');
  if (!clock) return;
  const weekday = new Intl.DateTimeFormat(root.lang || 'en', { weekday: 'long' });
  const tick = () => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    clock.textContent = `${weekday.format(now)} ${time}`;
    clock.dateTime = now.toISOString();
    setTimeout(tick, 60_000 - now.getSeconds() * 1000 - now.getMilliseconds());
  };
  tick();
}

// ----------------------------------------------------------------- toasts

const toastsByKey = new Map<string, HTMLElement>();

/**
 * A low-urgency notification in the style of the Omarchy shell. Sending one
 * with the same key replaces the old one and restarts its countdown, because
 * new text deserves a full look.
 */
function toast(summary: string, body = '', key?: string, icon: string = glyph.theme) {
  const region = document.querySelector('[data-toasts]');
  if (!region) return;

  let el = key ? toastsByKey.get(key) : undefined;
  if (el?.isConnected) {
    el.classList.add('restart');
    void el.offsetWidth;
    el.classList.remove('restart');
  } else {
    el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<span class="toast-glyph glyph" aria-hidden="true"></span><span class="toast-summary"></span><span class="toast-body"></span>';
    const close = () => {
      el!.classList.add('leaving');
      setTimeout(() => el!.remove(), 140);
    };
    el.addEventListener('click', close);
    el.addEventListener('animationend', (event) => {
      if (event.animationName === 'toast-countdown') close();
    });
    region.prepend(el);
    if (key) toastsByKey.set(key, el);
  }

  el.querySelector('.toast-glyph')!.textContent = icon;
  el.querySelector('.toast-summary')!.textContent = summary;
  el.querySelector('.toast-body')!.textContent = body;
}

// ----------------------------------------------------------------- themes

const options = [...document.querySelectorAll<HTMLElement>('[data-theme-id]')];
const themeName = (id: string) =>
  options.find((option) => option.dataset.themeId === id)?.querySelector('.theme-option-name')?.textContent ?? id;

function applyTheme(id: string) {
  root.setAttribute('data-theme', id);
  const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg);
}

function markCurrent(id: string) {
  for (const option of options) option.classList.toggle('is-current', option.dataset.themeId === id);
}

function keepTheme(id: string) {
  applyTheme(id);
  markCurrent(id);
  storage.set(THEME_KEY, id);
  toast('Theme changed', themeName(id), 'theme');
}

function setupThemePanel() {
  const panel = document.querySelector<HTMLElement>('[data-theme-panel]');
  const filter = panel?.querySelector<HTMLInputElement>('[data-theme-filter]');
  const empty = panel?.querySelector<HTMLElement>('[data-theme-empty]');
  if (!panel || !filter || !empty) return;

  let original = root.dataset.theme ?? '';
  let kept = false;
  let cursor = -1;

  const visible = () => options.filter((option) => !option.hidden);

  const setCursor = (option: HTMLElement | undefined, preview: boolean) => {
    cursor = options.indexOf(option!);
    for (const o of options) {
      const on = o === option;
      o.classList.toggle('is-cursor', on);
      o.setAttribute('aria-selected', String(on));
    }
    if (!option) {
      filter.removeAttribute('aria-activedescendant');
      return;
    }
    filter.setAttribute('aria-activedescendant', option.id);
    option.scrollIntoView({ block: 'nearest' });
    if (preview) applyTheme(option.dataset.themeId!);
  };

  const move = (step: number) => {
    const list = visible();
    if (!list.length) return;
    const at = list.indexOf(options[cursor]);
    setCursor(list[(at + step + list.length) % list.length], true);
  };

  const keep = (option: HTMLElement | undefined) => {
    if (!option) return;
    kept = true;
    keepTheme(option.dataset.themeId!);
    panel.hidePopover();
  };

  // Reset before the panel shows, synchronously, so keys typed straight after
  // `t` land in the filter instead of being wiped by a late reset.
  panel.addEventListener('beforetoggle', (event) => {
    if ((event as ToggleEvent).newState !== 'open') return;
    original = root.dataset.theme ?? '';
    kept = false;
    filter.value = '';
    for (const option of options) option.hidden = false;
    empty.hidden = true;
    markCurrent(original);
    setCursor(options.find((option) => option.dataset.themeId === original), false);
  });

  panel.addEventListener('toggle', (event) => {
    if ((event as ToggleEvent).newState === 'open') {
      options[cursor]?.scrollIntoView({ block: 'nearest' });
    } else if (!kept) {
      // Closed without choosing: put back the theme that was there before.
      applyTheme(original);
    }
  });

  filter.addEventListener('input', () => {
    const query = filter.value.trim().toLowerCase();
    for (const option of options) option.hidden = !option.dataset.search!.includes(query);
    const list = visible();
    empty.hidden = list.length > 0;
    if (!list.includes(options[cursor])) setCursor(list[0], false);
  });

  filter.addEventListener('keydown', (event) => {
    const down = event.key === 'ArrowDown' || (event.ctrlKey && (event.key === 'n' || event.key === 'j'));
    const up = event.key === 'ArrowUp' || (event.ctrlKey && (event.key === 'p' || event.key === 'k'));
    if (down || up) {
      event.preventDefault();
      move(down ? 1 : -1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      keep(options[cursor]);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      const list = visible();
      setCursor(event.key === 'Home' ? list[0] : list[list.length - 1], true);
    }
  });

  for (const option of options) {
    option.addEventListener('click', () => keep(option));
    option.addEventListener('pointermove', () => {
      if (options[cursor] !== option) setCursor(option, false);
    });
  }

  markCurrent(root.dataset.theme ?? '');
}

// Follow the system between light and dark until the visitor picks a theme.
function followSystemTheme() {
  const light = matchMedia('(prefers-color-scheme: light)');
  light.addEventListener('change', () => {
    if (storage.get(THEME_KEY)) return;
    const panel = document.querySelector<HTMLElement>('[data-theme-panel]');
    const id = light.matches ? panel?.dataset.lightDefault : panel?.dataset.darkDefault;
    if (id) {
      applyTheme(id);
      markCurrent(id);
    }
  });
}

// ------------------------------------------------------------- navigation

function go(link: HTMLAnchorElement | null | undefined) {
  if (link?.href) location.href = link.href;
}

function scrollByLines(direction: 1 | -1, repeat: boolean) {
  const line = parseFloat(getComputedStyle(document.body).lineHeight) || 28;
  window.scrollBy({
    top: direction * line * 3,
    behavior: repeat || reducedMotion.matches ? 'auto' : 'smooth',
  });
}

/** On a page with a list (the principles), j and k walk it; elsewhere they scroll. */
function moveThroughList(direction: 1 | -1, repeat: boolean) {
  const rows = [...document.querySelectorAll<HTMLAnchorElement>('[data-menu] a')];
  if (!rows.length) return scrollByLines(direction, repeat);
  const at = rows.indexOf(document.activeElement as HTMLAnchorElement);
  const next = at === -1 ? (direction === 1 ? 0 : rows.length - 1) : Math.min(rows.length - 1, Math.max(0, at + direction));
  rows[next].focus();
}

function openPanel(id: string) {
  const panel = document.getElementById(id);
  if (panel && !panel.matches(':popover-open')) panel.showPopover();
}

let typed = '';

async function startScreensaver() {
  const { screensaver } = await import('./screensaver');
  screensaver();
}

function onKeydown(event: KeyboardEvent) {
  if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
  const target = event.target as HTMLElement;
  if (target.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]')) return;
  if (document.querySelector(':popover-open, .screensaver')) return;

  // Typing the computer's name wakes the screensaver. While the name is being
  // typed, its letters belong to it, so the h in omarchy doesn't go back a page.
  // Any other key, like Backspace, ends the word and does its usual job. Shift
  // and Caps Lock don't, since they're part of typing letters.
  if (event.key.length === 1) {
    const key = event.key.toLowerCase();
    typed = SECRET.startsWith(typed + key) ? typed + key : SECRET.startsWith(key) ? key : '';
    if (typed === SECRET) {
      typed = '';
      event.preventDefault();
      startScreensaver();
      return;
    }
    if (typed.length > 1) return;
  } else if (event.key !== 'Shift' && event.key !== 'CapsLock') {
    typed = '';
  }

  if (/^[0-9]$/.test(event.key)) {
    go(document.querySelector<HTMLAnchorElement>(`.workspace[data-key="${event.key}"]`));
    return;
  }

  switch (event.key) {
    case 'h':
    case 'l':
      go(document.querySelector<HTMLAnchorElement>(`a[data-pager="${event.key}"]`));
      break;
    case 'j':
    case 'k':
      event.preventDefault();
      moveThroughList(event.key === 'j' ? 1 : -1, event.repeat);
      break;
    case 'Backspace':
      if (document.querySelector('[data-menu]')) return;
      event.preventDefault();
      go(document.querySelector<HTMLAnchorElement>('.bar-home'));
      break;
    case 't':
      event.preventDefault();
      openPanel('theme-panel');
      break;
    case '?':
      event.preventDefault();
      openPanel('keys-panel');
      break;
  }
}

startClock();
setupThemePanel();
followSystemTheme();
document.addEventListener('keydown', onKeydown);
