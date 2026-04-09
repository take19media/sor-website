# Richard Bravo — Sale or Return catalogue

B2B catalogue site for Richard Bravo jewellery. Next.js (App Router) + TypeScript + Tailwind, Sanity CMS, Resend for the application form, Vercel for hosting.

## Getting started

```bash
cp .env.local.example .env.local   # then fill in values
npm install
npm run dev
```

Open <http://localhost:3000>. The embedded Sanity Studio lives at <http://localhost:3000/studio>.

## Environment variables

See `.env.local.example`. Required:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` (default `xua6ijxw`)
- `NEXT_PUBLIC_SANITY_DATASET` (default `product`)
- `RESEND_API_KEY`, `RESEND_TO_EMAIL` — enables the application form. Without these, submissions are logged to the server console only.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — international format, no `+`. Enables the WhatsApp link in the header/footer and the mobile floating button.

## Sanity content model

- **piece** — title, slug, collection ref, images, materials, dimensions, description, `availableForSOR` toggle
- **collection** — title, slug, description, order
- **sorTerms** — singleton, rich text for the How it works page
- **siteSettings** — brand name, tagline, contact email, WhatsApp number, intro paragraph

Pieces with `availableForSOR == false` are hidden from the public catalogue.

## Routes

| Path | Description |
| --- | --- |
| `/` | Homepage hero + brand intro |
| `/catalogue` | Pieces grouped by collection |
| `/piece/[slug]` | Individual piece page |
| `/how-it-works` | SOR terms (editable in Sanity) |
| `/apply` | Application form + WhatsApp fallback |
| `/api/apply` | POST endpoint that emails the studio via Resend |
| `/studio` | Embedded Sanity Studio |

## Design

- Warm cream `#FAF8F5`, ink `#1A1A1A`, warm slate accent `#5C6B7A`
- Cormorant Garamond (headings) + Inter (body) via `next/font`
- Mobile-first, persistent WhatsApp FAB on mobile, no carousels
- No popups, no cookie banners, single clear CTA per page

## Deployment

Push to GitHub and import into Vercel. Set the environment variables in the Vercel project settings. The Sanity dataset must allow the Vercel deployment domain in its CORS settings.
