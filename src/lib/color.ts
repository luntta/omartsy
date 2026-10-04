// Just enough color math to keep every Omarchy palette readable on the web:
// WCAG contrast, and lightness adjustments in OKLCh so hues survive the trip.

type RGB = [number, number, number];

const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));

export function parseHex(hex: string): RGB {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as RGB;
}

export function toHex([r, g, b]: RGB): string {
  return '#' + [r, g, b].map((c) => Math.round(clamp(c) * 255).toString(16).padStart(2, '0')).join('');
}

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const fromLinear = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

export function luminance(hex: string): number {
  const [r, g, b] = parseHex(hex).map(toLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function toOklch(hex: string): [number, number, number] {
  const [r, g, b] = parseHex(hex).map(toLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(A, B), Math.atan2(B, A)];
}

function fromOklch([L, C, H]: [number, number, number]): string {
  const A = C * Math.cos(H);
  const B = C * Math.sin(H);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const b = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  return toHex([r, g, b].map((c) => fromLinear(clamp(c))) as RGB);
}

/**
 * Returns `color` unchanged if it already reads at `target` contrast against
 * `bg`. Otherwise moves only its lightness (away from the background) until it
 * does, keeping the hue so red still reads as red.
 */
export function readable(color: string, bg: string, target = 4.5): string {
  if (contrast(color, bg) >= target) return color;
  const [L, C, H] = toOklch(color);
  const lighten = luminance(bg) < 0.18;
  let lo = L;
  let hi = lighten ? 1 : 0;
  let best = fromOklch([hi, C, H]);
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    const candidate = fromOklch([mid, C, H]);
    if (contrast(candidate, bg) >= target) {
      best = candidate;
      hi = mid;
    } else {
      lo = mid;
    }
  }
  return best;
}

/** Mixes `a` toward `b` by `t` (0 = a, 1 = b) in linear light. */
export function mix(a: string, b: string, t: number): string {
  const ca = parseHex(a).map(toLinear);
  const cb = parseHex(b).map(toLinear);
  return toHex(ca.map((c, i) => fromLinear(c + (cb[i] - c) * t)) as RGB);
}

/**
 * The dimmest mix of `fg` toward `bg` that still reads at `target` contrast.
 * Used for secondary text, so it's quieter than body text but never illegible.
 */
export function dimmed(fg: string, bg: string, target = 5.2, maxMix = 0.45): string {
  if (contrast(fg, bg) <= target) return fg;
  let lo = 0;
  let hi = maxMix;
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2;
    if (contrast(mix(fg, bg, mid), bg) >= target) lo = mid;
    else hi = mid;
  }
  return mix(fg, bg, lo);
}
