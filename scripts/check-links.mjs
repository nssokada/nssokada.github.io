// Verifies every internal href/src in dist/ resolves to a built file.
// Usage: node scripts/check-links.mjs [base]   (base defaults to $SITE_BASE, else the site root)
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const base = (process.argv[2] ?? process.env.SITE_BASE ?? '/').replace(/\/$/, '');
const pages = [];
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) await walk(full);
    else if (e.name.endsWith('.html')) pages.push(full);
  }
}
await walk(dist);

const exists = async (p) => stat(p).then(() => true, () => false);
let checked = 0;
const bad = [];
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const ref = m[1];
    if (/^(https?:|mailto:|#|data:)/.test(ref)) continue;
    checked++;
    const path = ref.split('#')[0].split('?')[0];
    if (!path.startsWith(base + '/')) { bad.push([relative(dist, page), ref, 'missing base prefix']); continue; }
    const rel = path.slice(base.length + 1);
    const target = rel === '' || rel.endsWith('/') ? join(dist, rel, 'index.html') : join(dist, rel);
    if (!(await exists(target))) bad.push([relative(dist, page), ref, 'no such file']);
    else if (!/\.[a-z0-9]+$/i.test(rel) && rel !== '' && !rel.endsWith('/')) bad.push([relative(dist, page), ref, 'missing trailing slash']);
  }
}
if (bad.length) {
  console.error(`✗ ${bad.length} broken internal link(s):`);
  for (const b of bad) console.error('  ', b.join('  |  '));
  process.exit(1);
}
console.log(`✓ ${checked} internal links across ${pages.length} pages resolve (base "${base || '/'}").`);
