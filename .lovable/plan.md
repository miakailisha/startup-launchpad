# Perigon Upgrade Plan

This is a large scope. I'll extend the existing site (keep branding, fonts, cream/terracotta tokens, animations, SiteShell, current routes) and layer in commerce + services + admin on top. I'll enable **Lovable Cloud** for the database, storage, auth, and bookings.

To keep this shippable, I'll deliver it in **3 phases**. Phase 1 lands in this turn; Phases 2 and 3 follow on your go-ahead.

## Phase 1 — Public site upgrade (this turn)

Visible business alignment. No backend yet, so the site is fully static and fast.

1. **Homepage hero** rewritten with new heading/subheading and two CTAs (Shop Products / Book a Service).
2. **What We Do** section under hero with 4 feature cards (Quality Products, Professional Home Services, Reliable Customer Support, Secure Payments) + dual CTAs.
3. **Products page** (`/products`) with 12 sample products (NGN prices), search, category filter, price filter, availability filter, Buy Now + Request Quote actions (Buy Now opens WhatsApp/contact until payments land in Phase 3).
4. **Services page** rewritten with 15 realistic home services, price/response/areas, Book Service + WhatsApp buttons.
5. **Homepage additions**: Product Categories strip, Featured Products, Featured Services, Why Choose Perigon, How It Works, Testimonials, FAQ, Contact teaser, Final CTA — all reusing existing tokens and Reveal animations.
6. **About** rewritten around products + services positioning.
7. **Contact** page adds WhatsApp, business hours, address block; existing form preserved.
8. **Policy pages** (stubs with real structure): `/privacy`, `/terms`, `/refund-policy`, `/shipping-policy`, `/service-terms`, `/cancellation-policy`.
9. **Footer** updated with new link groups + social placeholders.
10. **SEO**: unique `head()` per new route.

Sample data lives in `src/lib/products.ts` and an expanded `src/lib/services.ts` so Phase 2 can swap to DB without touching components.

## Phase 2 — Lovable Cloud + Bookings + Admin (next turn)

1. Enable Lovable Cloud.
2. Migrations for: `product_categories`, `products`, `service_categories`, `services`, `bookings`, `customers`, `reviews`, `faqs`, `homepage_content`, plus future-ready empty tables (`orders`, `inventory`, `staff_roles`) and a `user_roles` table + `has_role()` per security rules.
3. Supabase Storage buckets: `product-images`, `service-images`, `site-media`.
4. Public `/products` and `/services` read from DB (publishable-key server fn); sample data seeded via migration.
5. Booking flow at `/book` writing to `bookings` (public insert policy, admin-only select).
6. Auth (email + Google) and `/admin` protected under `_authenticated/` with admin role check.
7. Admin dashboard modules: Products, Services, Bookings, Content, Business Settings (CRUD, image upload, feature toggles, reorder via `sort_order`).

## Phase 3 — Payments & commerce polish (future turn)

Paystack integration (Buy Now → checkout), orders table wired up, order confirmations, basic inventory decrement. Cart/checkout/accounts scaffolding left ready to extend.

## Design & performance notes

- Reuse Instrument Serif + Work Sans, terracotta/sage/cream tokens, `Reveal`, `SiteShell`.
- New sections use the same rounded-3xl card language and generous spacing as the current home.
- Images: `loading="lazy"` + `decoding="async"`; product/service placeholders use Unsplash for Phase 1 and Storage in Phase 2.
- Every new route sets its own `head()`; no `og:image` on root.

## Confirm

Shall I proceed with **Phase 1** now (public site upgrade, no backend yet), then continue with Phase 2 (Cloud + admin + bookings) on your next message? Or would you rather I enable Lovable Cloud and start with Phase 2 first?
