import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";

const values = [
  { title: "Show up on time", body: "If we say 2pm, we mean 2pm. Traffic isn't your problem." },
  { title: "Quote before we start", body: "No surprises at the end. You know the number before we lift a tool." },
  { title: "Leave it tidier than we found it", body: "Every job ends with a clean-up. That's part of the price." },
  { title: "Say no when we should", body: "If it's outside what we do well, we'll tell you and point you somewhere better." },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Perigon" },
      { name: "description", content: "We're a small local team building the kind of neighbourhood service company we always wished existed." },
      { property: "og:title", content: "About — Perigon" },
      { property: "og:description", content: "A small team. Real accountability. Work we're proud to put our name on." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-12 md:pt-28">
        <Reveal>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">About</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl md:text-6xl">
            A neighbourhood team,
            <br />
            <span className="text-primary italic">built on turning up.</span>
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <div className="space-y-5 text-lg leading-relaxed text-foreground/85">
            <p>
              Perigon started with a simple frustration: it's surprisingly hard to find someone
              reliable for the small stuff. A broken shelf. A stubborn Wi-Fi router. A haircut before
              a wedding. A quick grocery run when the day gets away from you.
            </p>
            <p>
              So we built the team we wished existed — a small crew of people who take the small jobs
              seriously, quote honestly, and treat your home like it's their own.
            </p>
            <p>
              We're intentionally not the biggest. We'd rather be the one you call first.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-5">
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="grid grid-cols-2 gap-6">
              {[
                { n: "500+", l: "Jobs completed" },
                { n: "4.9", l: "Average rating" },
                { n: "2 hrs", l: "Typical response" },
                { n: "6", l: "Team members" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-4xl text-primary">{s.n}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl">What we stand on</h2>
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
        </div>
      </section>
    </SiteShell>
  );
}
