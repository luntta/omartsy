import type { APIRoute } from 'astro';
import { themesCss } from '../lib/themes';

// Every Omarchy theme as CSS custom properties, served as one cacheable file.
export const GET: APIRoute = () =>
  new Response(themesCss(), { headers: { 'Content-Type': 'text/css; charset=utf-8' } });
