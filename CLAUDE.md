# CLAUDE.md — Project Notes for AI Assistants

## Project Overview

- **Stack**: Next.js 14 (App Router), React 18, Tailwind CSS 3, Sanity CMS, TypeScript
- **Deploy**: Vercel at `sor.richardbravo.co.uk`, deploys from `main` branch
- **Fonts**: Cormorant Garamond (serif via `--font-serif`), Inter (sans via `--font-sans`) — defaults loaded via `next/font/google`, overridable from Sanity
- **Color palette** (defaults in `globals.css` as CSS custom properties): cream `#FAF8F5`, ink `#1A1A1A`, slate `#5C6B7A`, rule `#E6E2DA`, whatsapp `#25D366`

## Key Architecture Decisions

### Mobile Nav Overlay Uses React Portal

The mobile menu overlay in `src/components/Header.tsx` is rendered via `createPortal(overlay, document.body)` rather than inline JSX. This is **intentional and required** — do not refactor it back to inline rendering.

**Why**: The `<header>` element uses `sticky` positioning with `backdrop-blur` (which applies `backdrop-filter`). In CSS, `backdrop-filter` creates a new containing block for `position: fixed` descendants. Any fixed-position overlay rendered inside (or as a sibling within the same stacking context as) the header will not cover the full viewport correctly on mobile browsers. The portal bypasses this entirely by rendering directly onto `document.body`.

**The overlay also uses all inline styles** for critical properties (`position`, dimensions, `zIndex`, `backgroundColor`) rather than Tailwind classes. This ensures no CSS cascade or specificity issues can interfere with the full-screen opaque coverage.

### Body Scroll Lock

When the mobile menu is open, `document.body.style.overflow` is set to `"hidden"` via a `useEffect` in `Header.tsx`. This prevents background content from scrolling while the overlay is visible.

### CMS-Driven Appearance (Colours, Fonts, Hero, Logo)

Site colours, fonts, the hero image, and the header logo are all managed from the **Site settings** document in Sanity Studio (under the "Appearance" tab).

**How it works**:

1. `layout.tsx` fetches `siteSettings` from Sanity at request time (revalidated every 60 s).
2. **Colours** — Hex values from Sanity are converted to space-separated RGB and injected as CSS custom properties (`--color-cream`, `--color-ink`, `--color-slate`, `--color-rule`) via a `<style>` tag with `!important` to override both Tailwind defaults and `next/font` class specificity. Tailwind config references these variables with `rgb(var(--color-cream) / <alpha-value>)` so all opacity modifiers (e.g. `bg-cream/90`) still work.
3. **Fonts** — Custom Google Font names are loaded at runtime via a `<link>` tag and override the `--font-serif` / `--font-sans` CSS variables. The `next/font/google` defaults (Cormorant Garamond, Inter) remain as fallbacks when no CMS override is set.
4. **Header logo** — An optional image field. When set, `layout.tsx` builds the URL with `urlFor()` and passes it as a prop to the client-side `Header` component, which renders an `<Image>` tag instead of the brand-name text.
5. **Hero image** — An image field with hotspot support. The homepage (`page.tsx`) builds the URL with `urlFor()` and renders it with `next/image`. The grey placeholder is shown when no image is set.

**Important**: If you add a new colour CSS variable, you must update three places: `globals.css` (default value), `tailwind.config.ts` (Tailwind colour definition), and `layout.tsx` (override injection from Sanity).

## Layout Structure

```
<body>                          — flex col, min-h-screen
  <Header />                    — sticky top-0 z-40, returns Fragment
  <main className="flex-1">     — page content
  <Footer />
  <WhatsAppFab />               — fixed bottom-right, z-50, md:hidden
  <CookieBanner />              — fixed bottom, z-50
  [Portal: mobile nav overlay]  — fixed, z-99999 (only when open)
</body>
```

## Common Gotchas

- **Always push to `main`** for changes to appear on the live site. Feature branches won't trigger Vercel production deploys.
- **`backdrop-blur` / `backdrop-filter`** on any element creates a new containing block for fixed-position descendants — keep this in mind when adding fixed overlays or modals.
- **Tailwind `inset-0`** uses the CSS `inset` shorthand which may not work on older mobile browsers. Prefer explicit `top-0 left-0 right-0 bottom-0` or inline styles for critical fixed overlays.
- **`bg-cream/90`** on the header means the header background is semi-transparent (90% opacity) with backdrop blur for a frosted-glass effect.
- **Google Fonts** — Default fonts are fetched at build time via `next/font`. Builds will fail in environments without network access. CMS-override fonts are loaded at runtime via `<link>` tag.
- The `.hairline` utility class (defined in `globals.css`) uses `rgb(var(--color-rule))` for its border colour.
- **Colour variables** are stored as space-separated RGB (e.g. `250 248 245`) in CSS custom properties so Tailwind opacity modifiers work.

## Build & Dev

```bash
npm run dev        # Local dev server
npm run build      # Production build
npm run lint       # ESLint
```
