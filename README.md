# Vywee

Product discovery and buying advice. This repository is the application
foundation: layout, theming, design tokens, primitives and a mock catalogue.
Feature routes (homepage, search, product pages) are built on top of it.

## Requirements

- Node.js 20.11 or newer
- npm 10

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serves the production build |
| `npm run typecheck` | TypeScript with no emit |
| `npm run lint` | ESLint across app code |
| `npm run format` | Prettier write |
| `npm run verify` | Typecheck, lint and format check — run before pushing |

## Architecture

```
app/          Routes, layouts, error boundaries, SEO route handlers
components/
  ui/         Primitives with no domain knowledge (Button, Card, Badge…)
  layout/     Page structure (Header, Footer, Container, Section, PageWrapper)
  shared/     Cross-feature pieces that do know about the domain
hooks/        Reusable client behaviour
lib/          Pure logic: formatting, SEO, env, motion variants, utils
types/        Domain types, one file per entity
constants/    Config, routes, navigation, typed token mirrors
data/         Mock catalogue and read-side selectors
styles/       Design tokens
public/       Static assets
```

### Rules that keep this maintainable

1. **Tokens are the only source of visual truth.** Colours, radii, spacing,
   shadows and motion live in `styles/tokens.css` and are exposed to Tailwind
   through the `@theme inline` bridge in `app/globals.css`. Components use
   semantic utilities (`bg-surface`, `text-muted-foreground`), never raw hex.
2. **`ui/` knows nothing about products.** A primitive that imports from
   `data/` or `types/` belongs in `shared/` instead.
3. **Routes are built with `ROUTES`.** No hardcoded path strings anywhere.
4. **Data access goes through `data/index.ts` selectors.** When a real API
   replaces the mocks, only that module changes.
5. **Variants over conditionals.** Component appearance is expressed with
   `cva` variants so every visual state is discoverable and typed.
6. **No inline styles**, except `app/global-error.tsx`, which renders before
   the stylesheet is available.

### Theming

`next-themes` sets a `class` on `<html>`; `.dark` in `styles/tokens.css`
redefines the semantic layer only. Adding a third theme means adding one more
block of semantic overrides — no component changes.

### Accessibility baseline

- Skip link is the first focusable element on every page.
- One global `:focus-visible` treatment; components never remove outlines.
- Colour is never the only signal — active navigation also carries
  `aria-current` and a weight change.
- Semantic heading level and visual size are independent props on `Heading`.
- `prefers-reduced-motion` is honoured in CSS and in the motion components,
  which skip animation entirely rather than shortening it.

### Performance baseline

- Fonts are self-hosted by `next/font` with `display: swap`.
- `SmartImage` wraps `next/image` with fixed aspect boxes, responsive `sizes`
  and lazy loading by default; only a route's largest above-the-fold image
  should set `priority`.
- Client boundaries are kept small: `app/providers.tsx`, the header, the
  drawer and the motion wrappers. Everything else stays a server component.
- `optimizePackageImports` is enabled for `lucide-react` and `framer-motion`.

## Adding a route

1. Create the folder under `app/`.
2. Export `metadata` built with `createMetadata` from `lib/seo`.
3. Compose the page from `PageWrapper` → `Section` → primitives.
4. Add the path to `constants/routes.ts` and, if public, to `app/sitemap.ts`.
