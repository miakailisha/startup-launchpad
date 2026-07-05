import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { services } from "@/lib/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Handy Hands" },
      { name: "description", content: "Tech help, home tasks, home-visit barbing and everyday goods — see what our team can do for you." },
      { property: "og:title", content: "Services — Handy Hands" },
      { property: "og:description", content: "Four services, one dependable local team." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-10 md:pt-28">
        <Reveal>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Services</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl md:text-6xl">
            Everything on this page is something you can hand to us.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="divide-y divide-border border-y border-border">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.04}>
              <article className="grid gap-6 py-10 md:grid-cols-12">
                <div className="md:col-span-2">
                  <span className="font-display text-4xl text-primary/70">{s.number}</span>
                </div>
                <div className="md:col-span-5">
                  <h2 className="font-display text-3xl">{s.title}</h2>
                  <p className="mt-2 text-muted-foreground">{s.tagline}</p>
                  <p className="mt-4 text-foreground/85">{s.description}</p>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground">Common jobs</h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {s.examples.map((e) => (
                      <li key={e} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {e}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-1 md:text-right">
                  <div className="text-xs text-muted-foreground">from</div>
                  <div className="font-display text-2xl text-primary">${s.from}</div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-card p-8 sm:flex-row">
            <p className="text-lg">
              Something not on the list? <span className="text-muted-foreground">Just ask — we probably can.</span>
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </SiteShell>
  );
}
