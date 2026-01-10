# eone.work

Personal website and blog for Evgeny Oshchepkov — software engineer based in Vienna.

## Tech Stack

- **Vite** — Build tool & dev server
- **React 19** — UI framework
- **TypeScript** — Type safety
- **React Router** — Client-side routing
- **Markdown** — Blog posts with frontmatter

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable primitives (Tag, ThemeToggle)
│   ├── layout/       # Header, Footer, Layout
│   ├── blog/         # BlogCard, BlogIntro
│   └── portfolio/    # ProjectCard
├── pages/            # Route components
├── content/
│   ├── blog/         # Markdown blog posts
│   └── projects/     # Markdown project entries
├── lib/              # Content loading utilities
├── hooks/            # useTheme
├── styles/           # Design tokens & global CSS
└── types/
```

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Adding Content

### Blog Post

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: Your Post Title
date: 2025-01-10
description: A brief description for cards and SEO.
tags: [Engineering, TypeScript]
featured: false
---

Your content here. Supports GitHub-flavored Markdown.
```

### Project

Create a new `.md` file in `src/content/projects/`:

```markdown
---
title: Project Name
description: What the project does.
tags: [React, TypeScript]
github: https://github.com/...
live: https://...
featured: true
---

Detailed project description.
```

## Design

- Dark mode default with light mode toggle
- Orange accent (#f97316)
- 4px spacing grid
- Outfit font family

See `CONTENT_STYLE.md` for writing guidelines.

## Deployment

Static site — deploy to Vercel, Netlify, or any static host:

```bash
pnpm build
# Output in dist/
```
