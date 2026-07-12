import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";

const values = [
  { title: "Quality first", body: "We only stock products and offer services we would happily use in our own homes." },
  { title: "Fair, transparent pricing", body: "Quotes before we start. No surprises at the end of a job or an order." },
  { title: "Reliable service", body: "Show-up-on-time, do-it-right, clean-up-after — every visit, every order." },
  { title: "Customer satisfaction", body: "If it isn't right, we make it right — quickly." },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Perigon" },
      { name: "description", content: "Perigon supplies quality physical products and provides professional home services for individuals and businesses across Nigeria." },
      { property: "og:title", content: "About — Perigon" },
      { property: "og:description", content: "Quality products and trusted home services — under one roof." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-12 md:pt-28">
        <Reveal>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">About Perigon</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl md:text-6xl">
            Quality products.
            <br />
            <span className="text-primary italic">Trusted home services.</span>
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <div className="space-y-5 text-lg leading-relaxed text-foreground/85">
            <p>
              Perigon is a modern commerce and home-services company. We supply quality physical
              products and provide reliable home services for individuals and businesses — all with
              a focus on quality, reliability and customer satisfaction.
            </p>
            <p>
              On the products side, we curate everything from everyday essentials and kitchen items
              to electronics, cleaning supplies, office equipment and home-improvement tools.
              On the services side, our vetted professionals handle cleaning, plumbing, electrical
              repairs, painting, appliance installation, furniture assembly, gardening, pest
              control, handyman jobs and general home maintenance.
            </p>
            <p>
              One trusted partner. Two dependable ways to make your home and business run better.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-5">
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="grid grid-cols-2 gap-6">
              {[
                { n: "1000+", l: "Orders & bookings" },
                { n: "4.9", l: "Average rating" },
                { n: "2 hrs", l: "Typical response" },
                { n: "24/7", l: "Support channel" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-4xl text-primary">{s.n}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl">What we stand for</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <div className="rounded-2xl border border-border bg-card p-8">
                  <h3 className="font-display text-2xl">{v.title}</h3>
                  <p className="mt-2 text-muted-foreground">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap gap-3">
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
    </SiteShell>
  );
}
