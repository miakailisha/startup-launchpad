import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { homeServices, whatsappLink } from "@/lib/homeServices";
import { formatNGN } from "@/lib/products";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Home Services — Perigon" },
      { name: "description", content: "Book trusted professionals for cleaning, plumbing, electrical repairs, painting, appliance installation, furniture assembly, gardening, pest control, handyman services and more." },
      { property: "og:title", content: "Home Services — Perigon" },
      { property: "og:description", content: "Reliable home services delivered by vetted professionals." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-10 md:pt-28">
        <Reveal>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Home Services</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl md:text-6xl">
            Trusted professionals, on call.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Cleaning, repairs, installations, maintenance — booked in minutes, delivered by vetted professionals.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.03}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img src={s.image} alt={s.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-2xl">{s.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                  <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-primary" /> {s.response}</li>
                    <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" /> {s.areas}</li>
                  </ul>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-display text-2xl text-primary">
                      {s.from ? formatNGN(s.from) : "Request quote"}
                    </span>
                    {s.from && <span className="text-xs text-muted-foreground">starting</span>}
                  </div>
                  <div className="mt-5 flex gap-2">
                    <Link
                      to="/contact"
                      search={{ service: s.name } as never}
                      className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                    >
                      Book Service
                    </Link>
                    <a
                      href={whatsappLink(`Hi Perigon, I'd like to book "${s.name}".`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
