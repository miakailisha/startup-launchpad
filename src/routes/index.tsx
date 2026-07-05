import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { services } from "@/lib/services";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-20 pb-24 md:grid-cols-12 md:pt-28">
          <div className="md:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" /> Local · Reliable · On call
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl">
                Little jobs.
                <br />
                <span className="text-primary italic">Big relief.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                One friendly team for the things you keep meaning to sort — tech setup, small home
                tasks, a fresh cut at your door and the everyday bits you need delivered.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Book a service <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center rounded-full border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-muted"
                >
                  See what we do
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
                    <span className="text-xs text-muted-foreground">3 bookings</span>
                  </div>
                  <ul className="mt-4 space-y-4">
                    {[
                      { t: "9:30", s: "Wi-Fi setup", n: "Adaeze O." },
                      { t: "1:00", s: "Skin fade at home", n: "Marcus B." },
                      { t: "4:15", s: "Flat-pack shelving", n: "Priya S." },
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

      {/* Services preview */}
      <section className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">What we do</p>
                <h2 className="mt-2 font-display text-4xl md:text-5xl">Four things, done well.</h2>
              </div>
              <Link to="/services" className="hidden text-sm text-primary hover:underline md:block">
                All services →
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.05}>
                <Link
                  to="/services"
                  className="group block h-full rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-3xl text-primary/60">{s.number}</span>
                    <span className="text-xs text-muted-foreground">from ${s.from}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.tagline}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl">
              Small enough to care.
              <br />
              Sharp enough to show up.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {[
                "Fixed, honest prices before we start",
                "Named team — no rotating strangers",
                "Same-day slots most weekdays",
                "Fully insured and background-checked",
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

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <div className="rounded-3xl bg-primary px-8 py-14 text-primary-foreground md:px-14 md:py-20">
            <div className="grid items-center gap-6 md:grid-cols-3">
              <h2 className="font-display text-4xl md:col-span-2 md:text-5xl">
                Ready to take something off your list?
              </h2>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90 md:justify-self-end"
              >
                Book a service <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </SiteShell>
  );
}
