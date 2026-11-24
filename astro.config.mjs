import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Deployed as a GitHub Pages project site: https://nssokada.github.io/portfolio/
// For a custom domain later: set SITE_URL to the domain, SITE_BASE to "/",
// and add public/CNAME. No page or content file needs to change.
const site = process.env.SITE_URL ?? 'https://nssokada.github.io';
const base = process.env.SITE_BASE ?? '/portfolio';
export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [mdx()],
});
