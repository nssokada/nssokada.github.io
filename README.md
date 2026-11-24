# Noah Okada — portfolio

Static site built with [Astro](https://astro.build) and MDX. Deploys to GitHub Pages.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local preview at `http://localhost:4321/portfolio/` |
| `npm run build:draft` | Build to `dist/` and verify internal links (placeholders allowed) |
| `npm run build` | The launch build: also fails if any internal placeholder remains. This is what the deploy runs. |

## Where things live

| To change… | Edit… |
| --- | --- |
| A project's story or facts | `src/content/projects/<slug>.mdx` (one file per project; every page reads from it) |
| Which projects a landing page shows, and their order | `src/data/audiences.ts` |
| Publications | `src/data/publications.ts` |
| Contact links, lab link, CV file | `src/data/site.ts` |
| In-development tools and their status labels | `src/data/tools.ts` |
| A new essay | add `src/content/writing/<slug>.mdx` with `title`, `summary`, `date`. The writing section is held back until the first essay exists: rename `src/pages/_writing` to `src/pages/writing` and add it to `nav` in `src/data/site.ts` |
| The portrait | replace `src/assets/portrait.jpg`; gradient strength and edge softness are the three values at the top of `src/components/Portrait.astro` |
| Updates | `src/data/updates.ts` (newest first; text may include Markdown links) |
| The menu | `nav` in `src/data/site.ts` |
| The CV | `python3 scripts/strip-cv-contact.py <your CV>.pdf public/noah-okada-cv.pdf` makes the public copy with phone and email removed |
| Colors, type, spacing | `src/styles/global.css` |

The base site orders projects newest-first by each project's `sortDate`. Audience
pages (`/research/neuroscience/`, `/research/cognition/`, `/research/ai/`, `/tools/`)
set their own order in `audiences.ts` and can show an alternate one-line summary via
the project's `emphasis` frontmatter.

## Content rules

- Write content as `.mdx`. Plain Markdown is valid MDX.
- Link to other pages with root-relative paths (`/projects/emlt/`); the deploy base is added for you.
- In `.astro` pages, build internal links with `url()` from `src/lib/url.ts`.
- Mark anything still owed with `<Todo note="..." />`. It shows as a small `// todo` line,
  and the deploy workflow refuses to publish while any remain.
- Images for a project go next to its `.mdx` or in `src/assets/`, referenced via the
  `image` frontmatter field or `<Figure src={...} alt="..." caption="..." />`.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds, runs the launch
check, and publishes to GitHub Pages (repo Settings → Pages → Source: GitHub Actions).

To move to a custom domain later, set `SITE_URL` and `SITE_BASE=/` (or change the
defaults in `astro.config.mjs`) and add `public/CNAME`. No page needs to change.
