import { getCollection, type CollectionEntry } from 'astro:content';

export type Principle = CollectionEntry<'principles'>;

export async function getPrinciples(): Promise<Principle[]> {
  const principles = await getCollection('principles');
  return principles.sort((a, b) => a.data.number - b.data.number);
}

/** The key that jumps to a principle, the way Omarchy labels workspace 10 as 0. */
export function keyFor(number: number): string {
  return number === 10 ? '0' : String(number);
}

/**
 * Markdown bodies get smart punctuation from the Markdown pipeline. Frontmatter
 * doesn't, so titles, summaries, and doctrine quotes go through this instead.
 */
export function smarten(text: string): string {
  return text
    .replace(/(^|[\s([{—–-])"/g, '$1“')
    .replace(/"/g, '”')
    .replace(/(^|[\s([{—–-])'/g, '$1‘')
    .replace(/'/g, '’')
    .replace(/\.\.\./g, '…')
    .replace(/ -- /g, ' – ');
}

/**
 * Each practice backs its advice with a paragraph that starts **In Omarchy:**.
 * Mark those paragraphs so they can be set apart as evidence.
 */
export function markEvidence(html: string): string {
  return html.replace(/<p><strong>In Omarchy:<\/strong>\s*/g, '<p class="evidence"><strong>In Omarchy</strong> ');
}
