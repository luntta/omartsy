import type { APIRoute, GetStaticPaths } from 'astro';
import { getPrinciples, smarten, type Principle } from '../../lib/principles';
import { site } from '../../site';

// Each principle as plain Markdown, for agents and anyone who'd rather read the source.
export const getStaticPaths = (async () => {
  const principles = await getPrinciples();
  return principles.map((principle) => ({ params: { slug: principle.id }, props: { principle } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ principle: Principle }> = ({ props: { principle } }) => {
  const { data, body } = principle;
  const markdown = [
    `# ${data.number}. ${smarten(data.title)}`,
    smarten(data.summary),
    `> ${smarten(data.quote)}\n>\n> [The Omarchy Doctrine: ${smarten(data.tenet)}](${site.doctrine}#${data.anchor})`,
    (body ?? '').trim(),
  ].join('\n\n');
  return new Response(markdown + '\n', { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
