# CLAUDE.md — Project Notes for AI Assistants

## Project Overview

- **Stack**: Next.js 14 (App Router), React 18, Tailwind CSS 3, Sanity CMS, TypeScript
- **Deploy**: Vercel at `sor.richardbravo.co.uk`, deploys from `main` branch
- **Fonts**: Cormorant Garamond (serif via `--font-serif`), Inter (sans via `--font-sans`) — loaded via `next/font/google`
- **Color palette** (defined in `tailwind.config.ts`): cream `#FAF8F5`, ink `#1A1A1A`, slate `#5C6B7A`, rule `#E6E2DA`, whatsapp `#25D366`

## Key Architecture Decisions

### Mobile Nav Overlay Uses React Portal

The mobile menu overlay in `src/components/Header.tsx` is rendered via `createPortal(overlay, document.body)` rather than inline JSX. This is **intentional and required** — do not refactor it back to inline rendering.

**Why**: The `<header>` element uses `sticky` positioning with `backdrop-blur` (which applies `backdrop-filter`). In CSS, `backdrop-filter` creates a new containing block for `position: fixed` descendants. Any fixed-position overlay rendered inside (or as a sibling within the same stacking context as) the header will not cover the full viewport correctly on mobile browsers. The portal bypasses this entirely by rendering directly onto `document.body`.

**The overlay also uses all inline styles** for critical properties (`position`, dimensions, `zIndex`, `backgroundColor`) rather than Tailwind classes. This ensures no CSS cascade or specificity issues can interfere with the full-screen opaque coverage.

### Body Scroll Lock

When the mobile menu is open, `document.body.style.overflow` is set to `"hidden"` via a `useEffect` in `Header.tsx`. This prevents background content from scrolling while the overlay is visible.

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
- **Google Fonts** are fetched at build time via `next/font`. Builds will fail in environments without network access.
- The `.hairline` utility class (defined in `globals.css`) sets `border-color: #E6E2DA`.

## Build & Dev

```bash
npm run dev        # Local dev server
npm run build      # Production build
npm run lint       # ESLint
```
