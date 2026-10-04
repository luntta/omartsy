// Omarchy's screensaver runs its ASCII logo through random text effects until
// you touch something. This one does the same with the omartsy wordmark,
// drawn block by block on a canvas so it looks the same on every machine.

import { CELL_HEIGHT, CELL_WIDTH, columns, grid, rows, type Cell } from '../lib/wordmark';

type Paint = (x: number, y: number, cell: Cell, color: string, alpha?: number, lift?: number) => void;
type Colors = Record<'art' | 'noise' | 'hot' | 'glint', string>;
/** Draws one frame of an effect `t` ms after it started. Returns true when it has finished. */
type Effect = (paint: Paint, colors: Colors, t: number) => boolean;

const filled: [number, number][] = grid.flatMap((row, y) => row.flatMap((cell, x) => (cell ? [[x, y]] : [])) as [number, number][]);
const noiseCell = (): Cell => (1 + Math.floor(Math.random() * 3)) as Cell;

/** Every block starts as flickering noise and settles into place at its own moment. */
function decrypt(): Effect {
  const settles = filled.map(() => 300 + Math.random() * 1700);
  return (paint, colors, t) => {
    let done = true;
    filled.forEach(([x, y], i) => {
      if (t < settles[i]) {
        done = false;
        const close = t > settles[i] - 260;
        paint(x, y, noiseCell(), close ? colors.hot : colors.noise, close ? 1 : 0.25 + Math.random() * 0.5);
      } else {
        paint(x, y, grid[y][x], colors.art);
      }
    });
    return done;
  };
}

/** Columns fall into place from left to right, each block landing with a flash. */
function rain(): Effect {
  const fall = 520;
  // The landing flash lasts another 30% of the fall.
  const settled = 1.3;
  return (paint, colors, t) => {
    let done = true;
    for (const [x, y] of filled) {
      const start = x * 16 + (rows - y) * 40;
      const p = (t - start) / fall;
      // Not finished until every block has landed and stopped flashing:
      // the pause that follows draws nothing new, so a flash left on would stay.
      if (p < settled) done = false;
      if (p < 0) continue;
      if (p < 1) {
        const eased = 1 - (1 - p) ** 3;
        paint(x, y, grid[y][x], colors.hot, 1, (1 - eased) * (y + 3));
      } else {
        paint(x, y, grid[y][x], p < settled ? colors.hot : colors.art);
      }
    }
    return done;
  };
}

/** The About screen's glint: a band of green leaning across the art, three times. */
function glint(): Effect {
  const sweep = 1600;
  const rest = 700;
  return (paint, colors, t) => {
    const pass = Math.floor(t / (sweep + rest));
    const local = t % (sweep + rest);
    const head = (local / sweep) * (columns + rows + 14) - 7;
    for (const [x, y] of filled) {
      const d = x + y * 2 - head;
      const lit = pass < 3 && local < sweep && d > -7 && d < 0;
      paint(x, y, grid[y][x], lit ? colors.glint : colors.art);
    }
    return pass >= 3;
  };
}

export function screensaver() {
  if (document.querySelector('.screensaver')) return;

  const overlay = document.createElement('div');
  overlay.className = 'screensaver';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Screensaver. Press any key to return.');
  overlay.tabIndex = -1;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  const hint = document.createElement('p');
  hint.className = 'screensaver-hint';
  hint.textContent = 'Press any key to return';
  overlay.append(canvas, hint);
  document.body.append(overlay);
  overlay.focus();

  const ctx = canvas.getContext('2d')!;
  const css = getComputedStyle(document.documentElement);
  const colors: Colors = {
    art: css.getPropertyValue('--fg-bright').trim(),
    noise: css.getPropertyValue('--fg-dim').trim(),
    hot: css.getPropertyValue('--accent').trim(),
    glint: css.getPropertyValue('--green').trim(),
  };

  let scale = 1;
  const size = () => {
    const ratio = devicePixelRatio || 1;
    scale = Math.min((innerWidth - 48) / (columns * CELL_WIDTH), (innerHeight * 0.55) / (rows * CELL_HEIGHT));
    const width = columns * CELL_WIDTH * scale;
    const height = rows * CELL_HEIGHT * scale;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio * scale, 0, 0, ratio * scale, 0, 0);
  };

  const paint: Paint = (x, y, cell, color, alpha = 1, lift = 0) => {
    const half = CELL_HEIGHT / 2;
    const top = (y - lift) * CELL_HEIGHT + (cell === 3 ? half : 0);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    // A hair of overlap so neighbouring blocks never show a seam.
    ctx.fillRect(x * CELL_WIDTH, top, CELL_WIDTH + 0.4, (cell === 1 ? CELL_HEIGHT : half) + 0.4);
  };

  const drawStill = () => {
    ctx.clearRect(0, 0, columns * CELL_WIDTH, rows * CELL_HEIGHT);
    for (const [x, y] of filled) paint(x, y, grid[y][x], colors.art);
  };

  size();
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const effects = [decrypt, rain, glint];
  let index = 0;
  let effect = effects[0]();
  let started = performance.now();
  let holdUntil = 0;
  let frame = 0;

  const loop = (now: number) => {
    frame = requestAnimationFrame(loop);
    if (document.hidden) return;
    if (holdUntil) {
      if (now < holdUntil) return;
      holdUntil = 0;
      index = (index + 1) % effects.length;
      effect = effects[index]();
      started = now;
    }
    ctx.clearRect(-columns * CELL_WIDTH, -rows * CELL_HEIGHT * 4, columns * CELL_WIDTH * 3, rows * CELL_HEIGHT * 6);
    if (effect(paint, colors, now - started)) holdUntil = now + 2500;
  };

  const onResize = () => {
    size();
    if (still) drawStill();
  };
  addEventListener('resize', onResize);

  if (still) drawStill();
  else frame = requestAnimationFrame(loop);

  // Any key or real mouse movement ends it. A short grace period keeps the
  // keystroke that started it from ending it straight away.
  const opened = performance.now();
  let pointer: { x: number; y: number } | null = null;
  const exit = () => {
    if (performance.now() - opened < 400) return;
    cancelAnimationFrame(frame);
    overlay.remove();
    removeEventListener('resize', onResize);
    removeEventListener('keydown', onKey, true);
    removeEventListener('pointermove', onMove, true);
    removeEventListener('pointerdown', exit, true);
  };
  const onKey = (event: KeyboardEvent) => {
    event.preventDefault();
    event.stopPropagation();
    exit();
  };
  const onMove = (event: PointerEvent) => {
    pointer ??= { x: event.clientX, y: event.clientY };
    if (Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) > 12) exit();
  };
  addEventListener('keydown', onKey, true);
  addEventListener('pointermove', onMove, true);
  addEventListener('pointerdown', exit, true);
}
