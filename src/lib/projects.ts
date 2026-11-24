import { getCollection, type CollectionEntry } from 'astro:content';
import { audiences, type AudienceKey, type Audience } from '../data/audiences';

export type Project = CollectionEntry<'projects'>;

export async function allProjects(): Promise<Project[]> {
  const entries = await getCollection('projects', ({ data }) => !data.draft);
  return entries.sort((a, b) => b.data.sortDate.valueOf() - a.data.sortDate.valueOf());
}

/** Projects for a landing page, in that page's order. */
export async function projectsFor(key: AudienceKey): Promise<Project[]> {
  const all = await allProjects();
  const config: Audience = audiences[key];
  if (config.projects === 'newest') return all;
  return config.projects.map((id) => {
    const found = all.find((p) => p.id === id);
    if (!found) throw new Error(`audiences.${key} references unknown project "${id}"`);
    return found;
  });
}

/** The one-line summary to show for a project on a given landing page. */
export function summaryFor(project: Project, key: AudienceKey): string {
  const config: Audience = audiences[key];
  return (config.emphasis && project.data.emphasis[config.emphasis]) || project.data.summary;
}
