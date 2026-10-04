// The wordmark is FIGlet text in Delta Corps Priest 1, the face Omarchy's own
// wordmark uses. That face is built from just three block characters, so it can
// be drawn as exact geometry instead of trusting every browser's fallback font
// to tile block characters without seams.

import text from '../data/wordmark.txt?raw';

/** 0: empty, 1: full block █, 2: upper half ▀, 3: lower half ▄ */
export type Cell = 0 | 1 | 2 | 3;

const CELLS: Record<string, Cell> = { '█': 1, '▀': 2, '▄': 3 };

/** A terminal cell is roughly twice as tall as it is wide. */
export const CELL_WIDTH = 6;
export const CELL_HEIGHT = 13;

export const grid: Cell[][] = (() => {
  const lines = text.replace(/\s+$/, '').split('\n');
  const width = Math.max(...lines.map((line) => [...line].length));
  return lines.map((line) => [...line.padEnd(width)].map((char) => CELLS[char] ?? 0));
})();

export const columns = grid[0].length;
export const rows = grid.length;
export const viewBox = `0 0 ${columns * CELL_WIDTH} ${rows * CELL_HEIGHT}`;

/**
 * One SVG path for the whole wordmark. Runs of the same block become a single
 * rectangle, and each one overlaps its neighbours slightly so no hairline seams
 * show through when the art is scaled.
 */
export function path(): string {
  const overlap = 0.35;
  const half = CELL_HEIGHT / 2;
  const parts: string[] = [];
  grid.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const cell = row[x];
      let end = x;
      while (end < row.length && row[end] === cell) end++;
      if (cell) {
        const top = y * CELL_HEIGHT + (cell === 3 ? half : 0);
        const height = cell === 1 ? CELL_HEIGHT : half;
        const w = (end - x) * CELL_WIDTH + overlap;
        parts.push(`M${x * CELL_WIDTH} ${top}h${w}v${height + overlap}h${-w}z`);
      }
      x = end;
    }
  });
  return parts.join('');
}
