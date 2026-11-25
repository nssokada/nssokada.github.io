import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Deployed as a GitHub Pages user site (the repository is named nssokada.github.io):
// https://nssokada.github.io/
// For a custom domain later: set SITE_URL to the domain and add public/CNAME.
// No page or content file needs to change.
const site = process.env.SITE_URL ?? 'https://nssokada.github.io';
const base = process.env.SITE_BASE ?? '/';
export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [mdx()],
});
