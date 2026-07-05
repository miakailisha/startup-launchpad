## Overview

A professional 5-page marketing site for a general-services startup (tech appliance help, house jobs, barbing, small physical products). Clean, warm, trustworthy — not a generic SaaS look.

## Design direction

- **Vibe**: friendly, hands-on, dependable. Warm neutrals + a confident accent — cream background (#faf8f5), deep charcoal ink (#1a1a1a), terracotta accent (#c4654a), sage support (#87a878).
- **Type**: Instrument Serif for display headings paired with Work Sans for body — editorial warmth without feeling corporate.
- **Layout**: generous whitespace, asymmetric hero, service cards with numbered index, soft shadows, subtle grain.
- **Motion**: light fade/rise on scroll via framer-motion; no gimmicks.

## Pages

```text
/            Home     — hero, services preview, why-us, CTA to book
/services    Services — 4 categories with descriptions and examples
/pricing     Pricing  — transparent starter rates per category + custom quote note
/about       About    — story, values, small team blurb
/contact     Contact  — booking form + address/phone/email/hours
```

Shared header with logo + nav + "Book now" CTA. Shared footer with quick links, contact, social.

## Services covered

1. Tech & Appliance Help — installs, setup, troubleshooting
2. Home Tasks — small repairs, moving help, errands
3. Barbing & Grooming — home visits
4. Everyday Goods — small physical products storefront teaser

## Booking / Contact form

Frontend-only form (no backend requested). Fields: name, email, phone, service category (select), preferred date, message. Zod validation with clear inline errors. On submit: show success toast — no data is stored or sent yet. A note under the form explains this so expectations are clear; can be wired to Lovable Cloud + email later.

## SEO / metadata

Each route gets its own `head()` with unique title, description, og:title, og:description. Root metadata replaced (no more "Lovable App"). No og:image until a real hero exists.

## Technical notes

- Routes: `src/routes/index.tsx`, `services.tsx`, `pricing.tsx`, `about.tsx`, `contact.tsx`.
- Shared `SiteHeader` and `SiteFooter` components rendered inside each route (kept out of `__root.tsx` so 404/error screens stay clean).
- Fonts via `@fontsource/instrument-serif` and `@fontsource/work-sans`, imported in `src/start.ts` (client entry).
- Design tokens (cream/terracotta/sage/ink) added to `src/styles.css` `@theme inline` — no hardcoded colors in components.
- Form: react-hook-form + zod + shadcn `form`, `input`, `textarea`, `select`, `sonner` toast.
- Motion: `framer-motion` for section reveals.
- No Lovable Cloud enabled (no persistence requested).