// Fails the build if any internal placeholder is still present in the output.
// Placeholders are rendered by src/components/Todo.astro (data-internal-todo).
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const hits = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.name.endsWith('.html')) {
      const html = await readFile(full, 'utf8');
      const matches = [...html.matchAll(/data-internal-todo="([^"]*)"/g)];
      for (const m of matches) hits.push({ file: relative(dist, full), note: m[1] });
    }
  }
}

await walk(dist);

if (hits.length) {
  console.error(`\n✗ Not launch-ready: ${hits.length} internal placeholder(s) remain.\n`);
  for (const h of hits) console.error(`  ${h.file}\n    → ${h.note}`);
  console.error('');
  process.exit(1);
}
console.log('✓ No internal placeholders in dist/. Launch check passed.');
