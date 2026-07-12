import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, ShoppingBag, Wrench, HeadphonesIcon, ShieldCheck, Sparkles, Star } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { products, formatNGN, productCategories } from "@/lib/products";
import { homeServices, whatsappLink } from "@/lib/homeServices";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Perigon — Quality Products. Trusted Home Services." },
      { name: "description", content: "Shop quality products and book reliable home services — cleaning, plumbing, electrical, installations and more. All in one place." },
      { property: "og:title", content: "Perigon — Quality Products. Trusted Home Services." },
      { property: "og:description", content: "Everything you need for your home and business — quality products and dependable professionals." },
      { property: "og:url", content: "/" },
    ],
  }),
  component: Home,
});

const featureCards = [
  { icon: ShoppingBag, title: "Quality Products", body: "Browse quality products across multiple categories at competitive prices." },
  { icon: Wrench, title: "Professional Home Services", body: "Book trusted professionals for cleaning, repairs, installations, maintenance, and more." },
  { icon: HeadphonesIcon, title: "Reliable Customer Support", body: "Prompt assistance before, during, and after every purchase or service booking." },
  { icon: ShieldCheck, title: "Secure Payments", body: "Enjoy secure and reliable payment options for products and services." },
];

const testimonials = [
  { name: "Adaeze O.", role: "Homeowner, Lekki", quote: "Booked a deep clean and appliance install on the same day. On time, tidy and fair pricing. Now my go-to." },
  { name: "Marcus B.", role: "Small business owner", quote: "Ordered office chairs and a tool kit. Delivery was quick and packaging was solid. Great value." },
  { name: "Priya S.", role: "New to the city", quote: "TV mounting and furniture assembly done in one visit. Everything looks perfect — highly recommend Perigon." },
];

const faqs = [
  { q: "How do I book a service?", a: "Pick a service, choose a date and time, add your address and any notes — we'll confirm within a couple of hours." },
  { q: "Where do you deliver and operate?", a: "We serve Lagos and Abuja for services, and deliver products nationwide across Nigeria." },
  { q: "Which payment options are supported?", a: "We support secure card and bank transfer payments. Online checkout is rolling out — for now, pay on delivery or on completion of service." },
  { q: "What if I'm not satisfied?", a: "Reach out within 48 hours and we'll make it right — a re-service, replacement or refund based on our policy." },
];

function Home() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);
  const featuredServices = homeServices.filter((s) => s.featured).slice(0, 6);

  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-20 pb-24 md:grid-cols-12 md:pt-28">
          <div className="md:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" /> Products · Services · One trusted team
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl">
                Quality Products.
                <br />
                <span className="text-primary italic">Trusted Home Services.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                Everything you need for your home and business — all in one place. Shop quality
                products or book reliable professionals with confidence.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Shop Products <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center rounded-full border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-muted"
                >
                  Book a Service
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-3xl bg-accent/40 blur-2xl" />
                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="font-display text-lg">Today</span>
                    <span className="text-xs text-muted-foreground">Bookings & orders</span>
                  </div>
                  <ul className="mt-4 space-y-4">
                    {[
                      { t: "9:30", s: "Deep cleaning", n: "Lekki Phase 1" },
                      { t: "1:00", s: "AC servicing", n: "Ikoyi" },
                      { t: "4:15", s: "Order dispatched", n: "Vacuum cleaner" },
                    ].map((b) => (
                      <li key={b.t} className="flex items-center gap-4">
                        <span className="w-14 font-display text-xl text-primary">{b.t}</span>
                        <div>
                          <div className="text-sm font-medium">{b.s}</div>
                          <div className="text-xs text-muted-foreground">{b.n}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 rounded-xl bg-secondary p-4 text-xs text-muted-foreground">
                    Average response: <span className="text-foreground">under 2 hours</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section id="what-we-do" className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">What we do</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Products & Home Services</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Everything you need, delivered with quality, reliability, and professional service.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-4xl text-foreground/85">
              Perigon supplies quality physical products and provides reliable home services for
              individuals and businesses. From everyday essentials and home improvement products to
              professional services such as cleaning, plumbing, electrical repairs, painting,
              appliance installation, furniture assembly, gardening, pest control, handyman services
              and general home maintenance — Perigon delivers dependable solutions with excellent
              customer service.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
                Shop Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/services" className="inline-flex items-center rounded-full border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-muted">
                Book a Service
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Product categories strip */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Shop by category</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl">Product Categories</h2>
            </div>
            <Link to="/products" className="hidden text-sm text-primary hover:underline md:block">All products →</Link>
          </div>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          {productCategories.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.03}>
              <Link
                to="/products"
                search={{ category: c.id }}
                className="rounded-full border border-border bg-card px-5 py-2 text-sm text-foreground/80 transition-colors hover:border-primary hover:text-primary"
              >
                {c.label}
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="border-t border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Bestsellers</p>
                <h2 className="mt-2 font-display text-4xl md:text-5xl">Featured Products</h2>
              </div>
              <Link to="/products" className="hidden text-sm text-primary hover:underline md:block">Shop all →</Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.04}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img src={p.image} alt={p.name} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">{productCategories.find((c) => c.id === p.category)?.label}</span>
                    <h3 className="mt-1 font-display text-xl">{p.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-display text-xl text-primary">{formatNGN(p.price)}</span>
                      <Link to="/products" className="text-sm font-medium text-primary hover:underline">View →</Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Most booked</p>
              <h2 className="mt-2 font-display text-4xl md:text-5xl">Featured Services</h2>
            </div>
            <Link to="/services" className="hidden text-sm text-primary hover:underline md:block">All services →</Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.04}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img src={s.image} alt={s.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl">{s.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{s.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-lg text-primary">{s.from ? `from ${formatNGN(s.from)}` : "Request quote"}</span>
                    <Link to="/contact" className="text-sm font-medium text-primary hover:underline">Book →</Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why Perigon */}
      <section className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl">
              Why choose Perigon.
            </h2>
            <p className="mt-4 text-muted-foreground">One trusted partner for the products you need and the services that keep your home and business running smoothly.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {[
                "Fixed, honest prices before we start",
                "Vetted, background-checked professionals",
                "Same-day slots available most weekdays",
                "Nationwide delivery for products",
                "Secure payment options",
                "Responsive customer support",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">How it works</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Simple, from start to finish.</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", t: "Choose", d: "Browse products or pick a service that fits what you need." },
            { n: "02", t: "Book or order", d: "Tell us your address, date, time and any details. We confirm quickly." },
            { n: "03", t: "Relax", d: "We deliver or turn up on time and leave things better than we found them." },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-8">
                <span className="font-display text-4xl text-primary/60">{s.n}</span>
                <h3 className="mt-3 font-display text-2xl">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Customers</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">What people say.</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <div className="flex text-primary">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-foreground/85">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6">
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <Reveal>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">FAQ</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Frequently asked questions.</h2>
        </Reveal>
        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <details className="group px-6 py-5">
                <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground">
                  {f.q}
                  <span className="ml-4 text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact teaser */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Talk to us</p>
                <h3 className="mt-2 font-display text-3xl">We're here to help.</h3>
              </div>
              <div className="text-sm text-foreground/85">
                <div className="font-medium">Email</div>
                <div className="text-muted-foreground">hello@perigon.co</div>
                <div className="mt-3 font-medium">Phone / WhatsApp</div>
                <div className="text-muted-foreground">+234 800 000 0000</div>
              </div>
              <div className="flex items-end gap-3 md:justify-end">
                <a
                  href={whatsappLink("Hi Perigon, I'd like to make an enquiry.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium hover:bg-muted"
                >
                  WhatsApp
                </a>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
                  Contact us <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <div className="rounded-3xl bg-primary px-8 py-14 text-primary-foreground md:px-14 md:py-20">
            <div className="grid items-center gap-6 md:grid-cols-3">
              <h2 className="font-display text-4xl md:col-span-2 md:text-5xl">
                Ready to shop or book?
              </h2>
              <div className="flex flex-wrap gap-3 md:justify-self-end">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground hover:opacity-90"
                >
                  Shop Products
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Book a Service
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </SiteShell>
  );
}
