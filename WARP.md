# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Personal website for Evgeny Oshchepkov built with React 19, TypeScript, and Vite. The site is a content-driven portfolio with a blog and projects showcase, using markdown files for content management.

## Development Commands

**Start dev server**
```bash
bun dev
```

**Build for production**
```bash
bun run build
```

**Lint code**
```bash
bun run lint
```

**Preview production build**
```bash
bun run preview
```

**Type checking**
```bash
tsc --noEmit
```

## Architecture

### Content System

All content lives in markdown files and is parsed at build time using Vite's `import.meta.glob`:

- **Blog posts**: `src/content/blog/*.md`
- **Projects**: `src/content/projects/*.md`

The `src/lib/content.ts` module handles all content operations:
- `parseMarkdown()` extracts frontmatter and body content using regex
- `getBlogPosts()` / `getProjects()` load and parse all markdown files
- `getFeaturedPosts()` / `getFeaturedProjects()` filter by frontmatter `featured: true`

Frontmatter is parsed manually (not using gray-matter library despite it being installed) and supports:
- Single-line arrays: `tags: [TypeScript, React]`
- Booleans: `featured: true`
- Strings (quoted or unquoted)

Reading time is calculated at 200 words per minute.

### Routing

React Router v7 with nested routes:
- Layout component wraps all pages and provides theme context
- Route structure in `src/App.tsx`:
  - `/` - Home
  - `/blog` - Blog listing
  - `/blog/:slug` - Individual blog post
  - `/projects` - Projects listing
  - `/projects/:slug` - Individual project detail
  - `/about` - About page

### Theming

Dark/light theme system using CSS custom properties:
- Theme state managed by `useTheme` hook in `src/hooks/useTheme.ts`
- Persisted to localStorage with key `"theme"`
- Applied via `data-theme` attribute on `<html>` element
- Default theme is dark
- All design tokens in `src/styles/tokens.css` using 4px grid system

### Path Aliases

TypeScript and Vite configured with `@/*` alias pointing to `src/*`.
Always use this alias for imports: `import { Layout } from '@/components/layout/Layout'`

### Styling

CSS Modules with `.module.css` extension. Design system uses:
- 4px base spacing grid (`--space-1` through `--space-16`)
- CSS custom properties for colors, typography, spacing
- Two theme variants (dark/light) defined in `tokens.css`
- Orange accent color (`--accent: #f97316`)

## Content Style Guide

When creating or editing content, follow `CONTENT_STYLE.md`:

- Write conversationally with short sentences
- Open with a hook in first 3-6 lines
- Use specifics over abstractions
- Keep paragraphs 1-3 sentences
- Use claim-based headings, not topic headings

### Frontmatter Requirements

Critical parser rules (from `CONTENT_STYLE.md`):
- **Single-line values only** - multiline YAML will break parsing
- **Tags format**: `tags: [TypeScript, React, Engineering]` (array on one line)
- **Canonical tag casing**: `TypeScript`, `React`, `Engineering`, `Design`, `AI`, `PostgreSQL`, `OpenAI`, `LLMs`, `SDK`, `npm`
- **Featured flag**: `featured: true` or `featured: false`
- **Date format**: `date: YYYY-MM-DD`

Example:
```yaml
---
title: Your Title Here
description: Brief description
date: 2025-01-09
tags: [TypeScript, React, Engineering]
featured: true
---
```

## Key Files

- `src/lib/content.ts` - Content parsing and loading logic
- `src/types/index.ts` - TypeScript interfaces for BlogPost, Project, Theme
- `src/App.tsx` - Route definitions
- `src/styles/tokens.css` - Design system tokens and theme definitions
- `vite.config.ts` - Build config with path aliases and markdown asset inclusion

## Package Manager

Uses Bun 1.3.5 (specified in `package.json` via `packageManager` field). All commands should use `bun` not `npm` or `yarn`.
