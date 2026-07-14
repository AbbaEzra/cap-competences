# Agent Instructions for Cap Competences Site

## Project Overview

**Cap Competences** is a responsive static website for a professional training organization. It's a Next.js 14 + TypeScript + Tailwind CSS site that exports entirely static HTML/CSS/JS for deployment on shared hosting (OVH Apache server). No backend, no database, no server-side functions.

- **Key tech**: Next.js 14 (App Router), TypeScript, Tailwind CSS, React 18
- **Build target**: 100% static export (`next build` → `out/` folder)
- **Hosting**: OVH mutualisé (Apache + DirectoryIndex)
- **Source of truth**: [`lib/data/catalogue-formations.json`](cap-competences-site/lib/data/catalogue-formations.json) (7 pôles, 29 formations)

## Quick Start

```bash
cd cap-competences-site
npm install
npm run dev           # http://localhost:3000
npm run build         # Generates out/
npm run lint          # Next.js linter
```

## Architecture

### Routes (App Router)

- `/` — Accueil (home page)
- `/catalogue/` — Formation catalogue (filterable by profile & pole)
- `/formations/[slug]/` — **Dynamic route**, each formation's detail page (generated from JSON)
- `/entreprises/` — Companies page + quote form
- `/design-system/` — Design system docs (noindex, dev-only)
- `/rejoindre-le-reseau/` — Recruiter form

### Data-Driven Approach

**Critical principle**: All formation data lives in [`lib/data/catalogue-formations.json`](cap-competences-site/lib/data/catalogue-formations.json). **No hardcoded formation data**.

- [`lib/catalogue.ts`](cap-competences-site/lib/catalogue.ts) — Type definitions + loader functions
- `generateStaticParams()` in [`app/formations/[slug]/page.tsx`](cap-competences-site/app/formations/%5Bslug%5D/page.tsx) generates a static HTML file per formation (slug = id)
- Fields are **optional** and resolved hierarchically: `formation → pole → fallback`
- Profile filter (« Je suis… ») via `profils` field

### File Structure

```
app/                              Routes (App Router)
  layout.tsx                       Root layout (metadata, fonts, globals)
  page.tsx                         /accueil
  globals.css, tokens.css          Tailwind + custom tokens
  catalogue/page.tsx               /catalogue
  formations/[slug]/page.tsx        ← Dynamic: generateStaticParams() + generateMetadata()
  entreprises/page.tsx             /entreprises
  design-system/page.tsx           /design-system (noindex)
  rejoindre-le-reseau/page.tsx     /rejoindre-le-reseau

components/                        Shared + page-specific components
  brand/                           Logo, compass needle
  layout/                          Header, footer
  catalogue/                       Catalogue filtering, display
  fiche/                           Formation detail card (sidebar)
  entreprises/                     Quote form
  callback/                        Callback modal + context
  overlays/                        Cookie banner, floating actions
  rejoindre/                       Recruiter form
  ui/                              Reveal animation, dropdown hook

lib/                              Data & utilities
  catalogue.ts                     Types + loader (reads JSON, normalizes)
  data/
    catalogue-formations.json      ← SOURCE OF TRUTH: 7 poles, 29 formations
    site.ts, home.ts, entreprises.ts, designSystem.ts   Static content (text, links, etc.)
    rejoindre.ts

public/                            Static assets
  assets/                          SVGs (logo, icons, compass)
  .htaccess                         DirectoryIndex config
```

## Design System & Styling

### Colors (Tailwind `cap-*` namespace)

```javascript
cap.navy       // #0F3D66 (primary blue)
cap.accent     // #F6C445 (yellow/gold)
cap.green      // #2E9E6B (secondary)
cap.ink        // #14202B (text)
cap.bg         // #FBFCFD (page background)
cap.surface    // #FFFFFF (cards, overlays)
```

See [`tailwind.config.js`](cap-competences-site/tailwind.config.js) for the full palette.

### Tokens & Typography

- **Fonts**: Imported via `next/font` in [`app/layout.tsx`](cap-competences-site/app/layout.tsx)
  - Serif: `--font-serif`
  - Sans: `--font-sans`
- **Custom tokens**: [`app/tokens.css`](cap-competences-site/app/tokens.css) (shadows, spacing, etc.)
- **Responsive breakpoints**: `sm 640 / md 768 / lg 1024 / xl 1280`
- **Container**: 1200px max-width, 24px gutters, mobile-first

### Component Patterns

- **Server Components by default** (App Router standard)
- **Client-side interactivity**: marked with `'use client'` (catalogue filter, forms, modals)
- **Hooks**: `useDropdown` for accessible menu controls
- **Context**: `CallbackContext` for modal state management
- **Animations**: Reveal component + `prefers-reduced-motion` respect

## Static Export Details

Next.js is configured for **100% static export**:

```javascript
// next.config.js
output: 'export',                  // No server functions
trailingSlash: true,               // /catalogue/ not /catalogue
images: { unoptimized: true }      // Static image optimization disabled
```

**Build output**:

```
out/
  index.html                  → /
  catalogue/index.html        → /catalogue/
  enterprises/index.html      → /enterprises/
  formations/excel/index.html → /formations/excel/
  formations/word/index.html  → /formations/word/
  .htaccess                   → DirectoryIndex + 404 config
  assets/, _next/             → CSS, JS bundles
```

**Deployment**: Upload **contents of `out/`** (not the folder itself) to OVH `www/` via FTP.

## Common Tasks

### Add or Update a Formation

1. Open [`lib/data/catalogue-formations.json`](cap-competences-site/lib/data/catalogue-formations.json)
2. Add/edit an object in `poles[].formations[]`
3. Set `id` = URL slug (e.g., `excel`, `word`, `fle`)
4. Run `npm run build` → `generateStaticParams()` auto-generates the page
5. ✅ New page at `/formations/[id]/` (e.g., `/formations/excel/`)

### Modify the Catalogue Filter

- Filter logic is in [`components/catalogue/CatalogueClient.tsx`](cap-competences-site/components/catalogue/CatalogueClient.tsx)
- Profile options come from `formations[].profils` field
- Update the select dropdown or filter state as needed

### Update Static Content (Home, Companies, Design System)

- Content is in [`lib/data/`](cap-competences-site/lib/data/) files (`site.ts`, `home.ts`, `entreprises.ts`, etc.)
- No hardcoded strings on pages — all sourced from these data files
- Import and render in route components

### Change Design System Colors or Spacing

1. Update [`tailwind.config.js`](cap-competences-site/tailwind.config.js) → `theme.extend`
2. Or edit [`app/tokens.css`](cap-competences-site/app/tokens.css) for CSS variables
3. Rebuild: `npm run dev` (auto-HMR)

### Add a New Route

1. Create a new folder in `app/` (e.g., `app/new-page/`)
2. Add `page.tsx`
3. Optionally add `layout.tsx` for route-specific layout
4. Auto-routes via App Router

### Fix Responsive/Mobile Issues

- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- Mobile-first: style for `sm`, then override at larger breakpoints
- Use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Test: `npm run dev`, resize browser

## Important Constraints & Gotchas

- **Static only**: No forms actually send data (site is 100% static). Callback modal & quote form show demo state.
- **No backend**: If you need form submissions, you must add a backend API (outside scope).
- **Data encoding**: The original JSON was UTF-8 read as Windows-1252 (mojibake). It's been fixed, but verify special characters if re-importing.
- **Metadata per page**: Each route should call `generateMetadata()` and set `metadataBase` from `SITE.url` in [`lib/data/site.ts`](cap-competences-site/lib/data/site.ts).
- **No image optimization**: `images.unoptimized: true` in Next config (required for static export). Keep images optimized before adding.
- **Accessibility**: Always include `alt` on images, focus states (`cap.accent` yellow ring), `aria-*` on interactive elements, and test keyboard navigation.
- **OVH `.htaccess`**: Essential for Apache to serve `index.html` before `index.php` (if residual WordPress files exist). It's in `public/.htaccess` and copied to `out/` on build.

## Key Files Reference

| File | Purpose |
|------|---------|
| [`lib/data/catalogue-formations.json`](cap-competences-site/lib/data/catalogue-formations.json) | **Source of truth** — all formation + pole data |
| [`lib/catalogue.ts`](cap-competences-site/lib/catalogue.ts) | Types (`CatFormation`, `CatPole`) + loader functions |
| [`app/formations/[slug]/page.tsx`](cap-competences-site/app/formations/%5Bslug%5D/page.tsx) | Dynamic route; `generateStaticParams()` + `generateMetadata()` |
| [`tailwind.config.js`](cap-competences-site/tailwind.config.js) | Design tokens (colors, fonts, spacing) |
| [`app/tokens.css`](cap-competences-site/app/tokens.css) | Custom CSS variables (shadows, etc.) |
| [`components/catalogue/CatalogueClient.tsx`](cap-competences-site/components/catalogue/CatalogueClient.tsx) | Catalogue filtering UI & state |
| [`lib/data/site.ts`](cap-competences-site/lib/data/site.ts) | Site config (URL, brand, routes) |
| [`next.config.js`](cap-competences-site/next.config.js) | Static export config |
| [`public/.htaccess`](cap-competences-site/public/.htaccess) | Apache DirectoryIndex for OVH |

## SEO & Metadata

- `generateMetadata()` is used per route → each page has unique `title`, `description`, `og:*` tags
- Formation pages derive metadata from `titre`, `objectif`, `slug`
- `metadataBase` must be set to the real domain in [`lib/data/site.ts`](cap-competences-site/lib/data/site.ts) before deployment
- No `robots.txt` blocks `/design-system/` — add `noindex` in metadata if needed

## Testing & Validation

```bash
npm run build          # Full static export
npm run lint           # TypeScript + ESLint
npm run dev            # Local dev (http://localhost:3000)
```

After build, test:

1. **Static export works**: Check `out/` folder exists and contains `index.html` files
2. **Routes exist**: `/`, `/catalogue/`, `/formations/excel/`, `/entreprises/`, etc.
3. **Links work**: Test profile filter, cross-links, footer links
4. **Responsive**: Test mobile (`sm`), tablet (`md`), desktop (`lg`) viewports
5. **Accessibility**: Tab through page, check focus rings, test with keyboard only

## Useful References

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- See [`README.md`](cap-competences-site/README.md) for full deployment instructions
