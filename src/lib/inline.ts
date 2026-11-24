import { url } from './url';

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Render a line of text with Markdown links to safe HTML. Root-relative links get the deploy base. */
export function renderInline(text: string): string {
  return escapeHtml(text).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, href: string) => {
    const internal = href.startsWith('/') && !href.startsWith('//');
    return `<a href="${internal ? url(href) : href}">${label}</a>`;
  });
}

/** "2025-06" → "06/2025"; "2025" → "2025". */
export function formatUpdateDate(date: string): string {
  const [year, month] = date.split('-');
  return month ? `${month}/${year}` : year;
}
