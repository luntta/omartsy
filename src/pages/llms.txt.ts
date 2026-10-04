import type { APIRoute } from 'astro';
import { getPrinciples, smarten } from '../lib/principles';
import { site, url } from '../site';

// An index for agents, following https://llmstxt.org.
export const GET: APIRoute = async ({ site: origin }) => {
  const link = (path: string) => (origin ? new URL(url(path), origin).href : url(path));
  const principles = await getPrinciples();
  const text = `# ${site.name}: ${site.title}

> ${site.description}

These guidelines are for anyone making things for Omarchy: apps, TUIs, command-line tools, shell plugins, themes, menus, scripts, and the agents that help build them. Each principle reads one line of the Omarchy Doctrine as interface design, and comes in three parts: In practice (habits that work, each backed by something Omarchy already does), Room to play (where the principle leaves space for expression), and Paper cuts (common ways to get it wrong). They describe best practice, not rules.

## Principles

${principles
  .map((p) => `- [${p.data.number}. ${smarten(p.data.title)}](${link(`/principles/${p.id}.md`)}): ${smarten(p.data.summary)} From the doctrine: ${smarten(p.data.tenet)}.`)
  .join('\n')}

## Sources

- [The Omarchy Doctrine](${site.doctrine}): the ten lines these principles are written from.
- [The Omarchy Manual](${site.manual}): where most of the evidence is documented.
- [Omarchy on GitHub](https://github.com/omacom/omarchy): the source, including docs/ for how the system is shaped.
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
