// Every internal link and public asset goes through this helper so the site
// works under any deploy base ("/portfolio/" today, "/" on a custom domain).
const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export function url(path = '/'): string {
  const [rawPath, hash = ''] = path.split('#');
  let p = rawPath.replace(/^\/+/, '');
  const isFile = /\.[a-z0-9]+$/i.test(p);
  if (p && !isFile && !p.endsWith('/')) p += '/';
  return base + p + (hash ? `#${hash}` : '');
}

/** True when `current` (Astro.url.pathname) is at or beneath the given site path. */
export function isActive(current: string, path: string): boolean {
  const target = url(path);
  return target === url('/') ? current === target : current.startsWith(target);
}
