export const site = {
  name: 'Noah Okada',
  title: 'Noah Okada',
  description:
    'Noah Okada is a PhD student in neuroscience at Caltech studying emotion and cognition across humans and AI, and building tools that help people think and work better.',
  // Public contact links chosen by Noah. No email or phone is published.
  links: [
    { label: 'Scholar', href: 'https://scholar.google.com/citations?user=LJiZIcMAAAAJ&hl=en' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/noah-okada-7a5168184/' },
    { label: 'GitHub', href: 'https://github.com/nssokada' },
  ],
  // Typeface mode, chosen by Noah: 'mixed' (see the Typefaces section of src/styles/global.css):
  //   'mixed'   Newsreader for prose, titles and link rows; Helvetica for menu, labels, dates, metadata
  //   'display' Newsreader for titles only, Helvetica for everything else
  //   'sans'    Helvetica everywhere      'serif'  Newsreader everywhere
  font: 'mixed' as 'mixed' | 'display' | 'sans' | 'serif',
  // Noah's lab, linked from the introduction. Name as the lab's own site gives it; URL is the
  // one Caltech's directory lists for Dean Mobbs.
  advisor: 'Dean Mobbs',
  lab: { label: 'Caltech Affect Lab', href: 'https://www.deanmobbslab.com/' },
  // What "cognition" in the introduction resolves to on hover (chosen by Noah).
  cognitionPhrase: 'memory · language',
  // Top-of-homepage layout: 'name' (a large name heads the page, then text beside the
  // portrait) or 'statement' (no name; larger text leads on its own).
  hero: 'name' as 'name' | 'statement',
  // Accent colors for the portrait halo, homepage wash and project thumbnails.
  // Defined in src/styles/global.css: 'ember', 'dusk', 'sage', 'sand', 'ink'.
  palette: 'dusk' as 'ember' | 'dusk' | 'sage' | 'sand' | 'ink',
  // Public CV file placed in /public (e.g. "noah-okada-cv.pdf"); it then leads the link row.
  // Must be a public version: no phone number or email. Null = not offered.
  cvFile: 'noah-okada-cv.pdf' as string | null,
};

// Menu order. `also` lists other top-level sections that count as part of an item
// (project pages live under /projects/ but belong to research).
export const nav = [
  { label: 'home', path: '/' },
  { label: 'updates', path: '/updates/' },
  { label: 'research', path: '/research/', also: ['/projects/'] },
  { label: 'tools', path: '/tools/' },
  // Writing is held back until the first essay exists: rename src/pages/_writing to
  // src/pages/writing and add { label: 'writing', path: '/writing/' } here.
];
