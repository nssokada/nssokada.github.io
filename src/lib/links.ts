import { site } from '../data/site';
import { url } from './url';

/** The profile link row: "CV / Scholar / LinkedIn / GitHub". CV appears once a public file is set. */
export function profileLinks(): { label: string; href: string }[] {
  const cv = site.cvFile ? [{ label: 'CV', href: url(`/${site.cvFile}`) }] : [];
  return [...cv, ...site.links];
}
