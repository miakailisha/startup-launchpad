import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { products, productCategories, formatNGN } from "@/lib/products";
import { whatsappLink } from "@/lib/homeServices";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  category: fallback(z.string(), "all").default("all"),
  price: fallback(z.string(), "any").default("any"),
  availability: fallback(z.string(), "any").default("any"),
});

export const Route = createFileRoute("/products")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Products — Perigon" },
      { name: "description", content: "Shop quality electronics, home essentials, kitchen items, cleaning supplies, office supplies, home improvement and fashion accessories." },
      { property: "og:title", content: "Products — Perigon" },
      { property: "og:description", content: "Quality products at competitive prices, delivered across Nigeria." },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

const priceBands = [
  { id: "any", label: "Any price" },
  { id: "u10", label: "Under ₦10,000" },
  { id: "10-30", label: "₦10,000 – ₦30,000" },
  { id: "30-70", label: "₦30,000 – ₦70,000" },
  { id: "70+", label: "Over ₦70,000" },
];

function inBand(price: number, band: string) {
  switch (band) {
    case "u10": return price < 10000;
    case "10-30": return price >= 10000 && price < 30000;
    case "30-70": return price >= 30000 && price < 70000;
    case "70+": return price >= 70000;
    default: return true;
  }
}

function ProductsPage() {
  const initial = Route.useSearch();
  const [q, setQ] = useState(initial.q);
  const [category, setCategory] = useState(initial.category);
  const [price, setPrice] = useState(initial.price);
  const [availability, setAvailability] = useState(initial.availability);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!inBand(p.price, price)) return false;
      if (availability === "in" && !p.inStock) return false;
      if (availability === "out" && p.inStock) return false;
      if (term && !(p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term))) return false;
      return true;
    });
  }, [q, category, price, availability]);

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-6 md:pt-28">
        <Reveal>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Products</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl md:text-6xl">Quality products, delivered.</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">Everyday essentials, home improvement, electronics and more — carefully chosen and fairly priced.</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-4 md:p-6">
            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-5">
                <Label htmlFor="q">Search</Label>
                <div className="relative mt-2">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="pl-9" />
                </div>
              </div>
              <div className="md:col-span-3">
                <Label htmlFor="cat">Category</Label>
                <select id="cat" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-2 h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option value="all">All categories</option>
                  {productCategories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="price">Price</Label>
                <select id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-2 h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
                  {priceBands.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="avail">Availability</Label>
                <select id="avail" value={availability} onChange={(e) => setAvailability(e.target.value)} className="mt-2 h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option value="any">Any</option>
                  <option value="in">In stock</option>
                  <option value="out">Out of stock</option>
                </select>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-4 text-sm text-muted-foreground">Showing {filtered.length} of {products.length} products</div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.03}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img src={p.image} alt={p.name} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]" />
                  {!p.inStock && <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground">Out of stock</span>}
                  {p.featured && p.inStock && <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">Featured</span>}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">{productCategories.find((c) => c.id === p.category)?.label}</span>
                  <h3 className="mt-1 font-display text-xl">{p.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-xl text-primary">{formatNGN(p.price)}</span>
                    <span className={`text-xs ${p.inStock ? "text-accent-foreground/80" : "text-muted-foreground"}`}>{p.inStock ? "In stock" : "Unavailable"}</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <a
                      href={whatsappLink(`Hi Perigon, I'd like to buy "${p.name}" (${formatNGN(p.price)}).`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-disabled={!p.inStock}
                      className={`inline-flex flex-1 items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-opacity ${p.inStock ? "bg-primary text-primary-foreground hover:opacity-90" : "pointer-events-none bg-muted text-muted-foreground"}`}
                    >
                      Buy Now
                    </a>
                    <a
                      href={whatsappLink(`Hi Perigon, I'd like a quote on "${p.name}".`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
                    >
                      Request Quote
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
            No products match those filters. <Link to="/products" search={{ q: "", category: "all", price: "any", availability: "any" }} className="text-primary hover:underline">Clear filters</Link>
          </div>
        )}
      </section>
    </SiteShell>
  );
}
