import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { services } from "@/lib/services";

const tiers = [
  {
    name: "Quick fix",
    price: 25,
    unit: "per visit",
    blurb: "A single small job under an hour.",
    features: ["One task, one visit", "Tools & travel included", "Same-day where possible"],
  },
  {
    name: "Half day",
    price: 90,
    unit: "up to 4 hours",
    blurb: "Best for setups, multiple small jobs or a proper cut & grooming session.",
    features: ["Multiple tasks bundled", "Materials at cost", "Priority scheduling"],
    featured: true,
  },
  {
    name: "Full day",
    price: 170,
    unit: "up to 8 hours",
    blurb: "Moving day, big installs, or a household reset.",
    features: ["Whole-day booking", "Named lead specialist", "Follow-up check-in"],
  },
];

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Handy Hands" },
      { name: "description", content: "Simple, honest pricing for tech help, home tasks, home-visit barbing and everyday goods." },
      { property: "og:title", content: "Pricing — Handy Hands" },
      { property: "og:description", content: "No surprises. Quotes given up front, before any work starts." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-6 md:pt-28">
        <Reveal>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Pricing</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl md:text-6xl">
            Fair prices. Told to you first.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            You get a full quote before any work starts. If a job runs shorter than expected, we
            charge less — not more.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <div
                className={
                  "flex h-full flex-col rounded-2xl border p-8 " +
                  (t.featured
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-border bg-card")
                }
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl">{t.name}</h3>
                  {t.featured && (
                    <span className="rounded-full bg-primary-foreground/15 px-2 py-0.5 text-[10px] uppercase tracking-wider">
                      Popular
                    </span>
                  )}
                </div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-5xl">${t.price}</span>
                  <span className={"text-sm " + (t.featured ? "opacity-80" : "text-muted-foreground")}>
                    {t.unit}
                  </span>
                </div>
                <p className={"mt-3 text-sm " + (t.featured ? "opacity-90" : "text-muted-foreground")}>
                  {t.blurb}
                </p>
                <ul className="mt-6 space-y-2 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className={"mt-0.5 h-4 w-4 shrink-0 " + (t.featured ? "" : "text-primary")} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={
                    "mt-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium " +
                    (t.featured
                      ? "bg-background text-foreground hover:opacity-90"
                      : "bg-primary text-primary-foreground hover:opacity-90")
                  }
                >
                  Book {t.name.toLowerCase()}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl">Starting prices by service</h2>
          <p className="mt-2 text-muted-foreground">Every job gets a specific quote — these are just the minimum.</p>
        </Reveal>
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">What's included</th>
                <th className="px-6 py-4 text-right">From</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {services.map((s) => (
                <tr key={s.id}>
                  <td className="px-6 py-4 font-medium">{s.title}</td>
                  <td className="px-6 py-4 text-muted-foreground">{s.tagline}</td>
                  <td className="px-6 py-4 text-right font-display text-lg text-primary">${s.from}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </SiteShell>
  );
}
