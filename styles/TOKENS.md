# Vywee design tokens

The theme system has three layers. Each one may only read from the layer above
it, which is what keeps a colour change from turning into a codebase-wide edit.

```
styles/tokens.css        Layer 1  primitives   --vy-ink-500, --vy-saffron-700
        │                Layer 2  semantic     --brand, --muted-foreground
        ▼
app/globals.css          Bridge   @theme inline → Tailwind utilities
        │
        ▼
components                        bg-brand, text-muted-foreground
```

**Rules**

1. Components use semantic utilities only. A raw hex or a `--vy-*` primitive in
   a component is a bug.
2. Primitives never appear in JSX. They exist so the semantic layer has
   something to point at.
3. Theming is redefining the semantic layer. `.dark` overrides roles only —
   radius, spacing, typography and motion are theme-independent.
4. TypeScript mirrors live in `constants/` and are asserted with `satisfies`
   against the unions in `types/theme.ts`, so a token added to one layer and
   forgotten in the other fails the build.

---

## Colour

Roles, not hues. `brand` is not "the blue" — it is the colour of primary
action, and it changes value between themes to hold contrast.

| Group | Tokens | Use |
| --- | --- | --- |
| Surface | `background` `surface` `elevated` `muted` (+ `-foreground`, `-hover`) | Page, sections, cards, inset areas |
| Line | `border` `border-strong` `input` `input-hover` `ring` | Dividers, control boundaries, focus |
| Brand | `brand` `-hover` `-active` `-subtle` `-subtle-hover` `-foreground` `-on-subtle` | Primary action, active nav |
| Accent | `accent` `-hover` `-subtle` `-foreground` `-on-subtle` | Secondary emphasis, editorial marks |
| Highlight | `highlight` `-strong` `-subtle` `-foreground` `-on-subtle` | **Deals only** — savings, price drops, coupons |
| Status | `success` `warning` `danger` `info` (+ `-subtle`, `-foreground`, `-on-subtle`) | Feedback and validation |
| Overlay | `overlay` `scrim` | Modal backdrops, image scrims |

### The `-foreground` / `-on-subtle` distinction

This trips people up, so it is worth stating plainly:

- `brand-foreground` is what goes **on the solid fill** (`bg-brand`).
- `brand-on-subtle` is what goes **on the tinted fill** (`bg-brand-subtle`).

They are different colours and not interchangeable. Using `text-brand` on
`bg-brand-subtle` happens to pass in light mode and fails in dark, which is
exactly the kind of bug the separate token prevents.

`highlight` is reserved. A saffron badge means money — a discount, a coupon,
a tracked price drop. Using it for general emphasis breaks that signal.

### Verified contrast

Every pair below is computed from the actual token values, in both themes.
Regenerate after any colour change.

### Text (WCAG AA, 4.5:1)

| Pair | Light | Dark | Min | |
| --- | ---: | ---: | ---: | --- |
| `foreground` on `background` | 18.93 | 17.37 | 4.5 | PASS |
| `foreground` on `surface` | 17.81 | 16.73 | 4.5 | PASS |
| `muted-foreground` on `background` | 5.88 | 6.73 | 4.5 | PASS |
| `muted-foreground` on `surface` | 5.53 | 6.48 | 4.5 | PASS |
| `muted-foreground` on `muted` | 5.20 | 5.85 | 4.5 | PASS |
| `brand` on `background` | 7.86 | 5.21 | 4.5 | PASS |
| `brand` on `surface` | 7.40 | 5.02 | 4.5 | PASS |
| `brand-on-subtle` on `brand-subtle` | 9.41 | 4.71 | 4.5 | PASS |
| `accent` on `background` | 4.95 | 9.22 | 4.5 | PASS |
| `accent-on-subtle` on `accent-subtle` | 5.87 | 5.74 | 4.5 | PASS |
| `highlight-on-subtle` on `highlight-subtle` | 5.48 | 8.53 | 4.5 | PASS |
| `success-on-subtle` on `success-subtle` | 5.76 | 5.35 | 4.5 | PASS |
| `danger-on-subtle` on `danger-subtle` | 6.91 | 4.93 | 4.5 | PASS |
| `brand-foreground` on `brand` | 7.86 | 5.21 | 4.5 | PASS |
| `danger-foreground` on `danger` | 5.84 | 4.83 | 4.5 | PASS |
| `success-foreground` on `success` | 5.01 | 7.76 | 4.5 | PASS |

### Non-text boundaries (WCAG 1.4.11, 3:1)

| Pair | Light | Dark | Min | |
| --- | ---: | ---: | ---: | --- |
| `input` vs `background` | 3.31 | 3.34 | 3.0 | PASS |
| `ring` vs `background` | 7.86 | 5.21 | 3.0 | PASS |
| `ring` vs `surface` | 7.40 | 5.02 | 3.0 | PASS |

Worst text ratio: 4.71 | Worst non-text ratio: 3.31

Notes on the numbers above:

- `input` is a control boundary and must clear 3:1 (WCAG 1.4.11). It is a
  darker grey than `border` for that reason. `border` is decorative and is
  deliberately exempt.
- Dark-mode `danger-on-subtle` uses `--vy-crimson-400`, not 500: the 500 tone
  reaches only 3.93:1 on `danger-subtle`.
- Light-mode `highlight-on-subtle` and `warning-on-subtle` use
  `--vy-saffron-700`. The 500 and 600 amber tones are fills, not text colours.

---

## Typography

Three faces, three jobs:

| Role | Face | Why |
| --- | --- | --- |
| `font-display` | Bricolage Grotesque | Headlines with an engineered, opinionated voice |
| `font-sans` | Instrument Sans | Long-form reading without shouting |
| `font-mono` | JetBrains Mono | Prices and specs on a tabular grid |

### Scale

Sizes from `xl` up are fluid — `clamp()` interpolates between a phone minimum
and a desktop maximum, so nothing needs a breakpoint override to be readable at
360px. Every size ships a paired line height, so a bare `text-3xl` still lands
on the scale.

| Token | Min → Max | Paired leading |
| --- | --- | --- |
| `text-2xs` | 11px | snug |
| `text-xs` | 12px | snug |
| `text-sm` | 14px | normal |
| `text-base` | 16px | normal |
| `text-lg` | 18px | relaxed |
| `text-xl` | 20 → 22px | snug |
| `text-2xl` | 24 → 28px | snug |
| `text-3xl` | 28 → 36px | tight |
| `text-4xl` | 34 → 46px | tight |
| `text-5xl` | 40 → 60px | tight |

Weights: `regular` 400, `medium` 500, `semibold` 600, `bold` 700,
`extrabold` 800. Tracking: `tighter` `tight` `normal` `wide` `widest`.

### Roles over sizes

`constants/typography.ts` defines eleven named roles — `display`, `h1`–`h4`,
`lead`, `body`, `bodySmall`, `caption`, `overline`, `numeric`. Components pick
a role; `Heading` and `Text` read their classes from that map, so retuning the
scale is one file and no component changes.

Measure caps (`measure-tight` 45ch, `measure-base` 65ch, `measure-wide` 75ch)
exist because line length, not font size, is what makes body copy tiring.

---

## Spacing

`--spacing` is `0.25rem`, so the numeric scale is the familiar 4px step
(`p-4` = 1rem). Named tokens cover page rhythm, which must not drift:

| Token | Value | Use |
| --- | --- | --- |
| `--space-gutter` | 1.25rem | Horizontal page padding (mobile) |
| `--space-gutter-lg` | 2rem | Horizontal page padding (≥1024px) |
| `--space-stack` | 0.75rem | Gap inside a related group |
| `--space-block` | 2rem | Gap between blocks |
| `--space-section` | 3.5rem | Vertical section rhythm (mobile) |
| `--space-section-lg` | 5.5rem | Vertical section rhythm (desktop) |
| `--container-max` | 78.75rem | Page width |
| `--container-prose` | 44rem | Reading width |
| `--header-height` | 4rem | Sticky header, and scroll-padding offset |
| `--tap-target` | 2.75rem | 44px minimum touch target (WCAG 2.2) |

`Container` is the only component permitted to own horizontal page padding.
The `tap-target` utility extends a control's hit area to 44px via a pseudo
element, without changing how large it looks.

---

## Radius

`none` 0 · `xs` 4px · `sm` 6px · `md` 10px · `lg` 14px · `xl` 20px ·
`2xl` 28px · `pill` full

Buttons and inputs use `md`; cards use `lg`; sheets and modals use `xl`;
badges and chips use `pill`.

---

## Elevation

Shadows are tinted with ink rather than pure black, so they never read muddy
grey on the blue-tinted neutrals. Dark mode swaps to true-black shadows at
higher opacity, since tinted shadows are invisible on a dark surface.

| Token | Role |
| --- | --- |
| `shadow-xs` | Resting buttons, scrolled header |
| `shadow-sm` | Cards |
| `shadow-md` | Card hover |
| `shadow-lg` | Popovers, drawers |
| `shadow-xl` | Modals |
| `inset-shadow-inner` | Pressed and inset surfaces |

`ELEVATION_ROLE` in `constants/design-tokens.ts` maps these to intent so
components name the role, not the size.

---

## Motion

| Token | Duration | Use |
| --- | --- | --- |
| `duration-instant` | 80ms | Colour-only feedback |
| `duration-fast` | 150ms | Hover, focus, borders |
| `duration-base` | 240ms | Overlays, drawers, layout |
| `duration-slow` | 380ms | Scroll reveals |
| `duration-slower` | 600ms | Orchestrated sequences |

Easings: `ease-standard` (most things), `ease-entrance` (elements arriving),
`ease-exit` (elements leaving).

These are exposed as **named utilities**, not raw numbers. Tailwind would
happily generate `duration-237`; `duration-fast` keeps every transition on the
scale. `constants/animation.ts` derives the Framer Motion values from the same
source, so CSS and JS animation cannot drift apart.

Animations: `animate-fade-in` `animate-fade-up` `animate-scale-in`
`animate-overlay-in` `animate-sheet-left` `animate-sheet-right`
`animate-shimmer`.

`prefers-reduced-motion: reduce` is honoured twice over — globally in CSS, and
in the `Reveal` and `Stagger` components, which skip animation entirely rather
than merely shortening it.

---

## Icons

Lucide has no configuration provider, so `components/ui/icon.tsx` is the
configuration point. It fixes three things that otherwise drift:

1. **Size** — locked to `ICON_SIZE` (14/16/20/24/32), aligned to the type scale
   so an icon beside text optically matches it.
2. **Optical stroke weight** — Lucide's stroke does not scale with the icon, so
   large icons look thin and small ones clog. `ICON_STROKE_BY_SIZE` corrects
   per size (2 at 14px down to 1.4 at 32px), with `absoluteStrokeWidth`.
3. **Accessibility** — `aria-hidden` by default. Passing `label` switches it to
   `role="img"` with an accessible name. An icon next to a visible text label
   must stay unlabelled, or screen readers announce it twice.

`ICONS` in `constants/icons.ts` is a semantic registry: feature code writes
`<Icon name="priceDrop" />`, not `<TrendingDown />`. Changing which glyph means
"price drop" is then one line, and the meaning stays consistent product-wide.

---

## Theme provider

`next-themes` with `attribute="class"`, driving the `.dark` block. It inlines a
blocking script that sets the class before first paint, so there is no flash of
the wrong theme. `enableColorScheme` sets `color-scheme`, which is what makes
native scrollbars, form controls and the URL bar follow the theme.

`useThemePreference()` is the typed accessor. `next-themes` returns loose
strings and `undefined` until the client mounts; the hook narrows both:

```ts
const { mode, resolved, system, isReady, setMode, toggle } = useThemePreference();
// mode:     'light' | 'dark' | 'system'  — what the user chose
// resolved: 'light' | 'dark' | null      — what is painted; null until mounted
// isReady:  false during SSR and first client render
```

Never render theme-dependent markup while `isReady` is false — that is the
hydration mismatch every theme-aware UI hits at least once.

Two controls ship: `ThemeToggle` (cycles, for the header) and `ThemeSwitcher`
(radio group with arrow-key navigation, for settings surfaces where the
available options should be visible).

---

## Adding a token

1. Add the primitive to `styles/tokens.css`, then the semantic role, then the
   `.dark` override.
2. Map it in the `@theme inline` block in `app/globals.css`.
3. Add it to the union in `types/theme.ts`.
4. Add it to the mirror in `constants/design-tokens.ts` — `satisfies` will fail
   the build if steps 3 and 4 disagree.
5. If it is a colour used for text, re-run the contrast check before merging.
