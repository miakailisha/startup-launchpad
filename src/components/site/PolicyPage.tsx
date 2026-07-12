import type { ReactNode } from "react";
import { SiteShell } from "./SiteShell";
import { Reveal } from "./Reveal";

export function PolicyPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <SiteShell>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-6 md:pt-28">
        <Reveal>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Legal</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: {updated}</p>
        </Reveal>
      </section>
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <Reveal>
          <div className="prose prose-sm max-w-none space-y-5 text-foreground/85 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-2 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
            <p className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
              This page is maintained by Perigon to explain how we handle this topic. If you have
              questions, contact us at <a href="mailto:hello@perigon.co" className="text-primary hover:underline">hello@perigon.co</a>.
            </p>
            {children}
          </div>
        </Reveal>
      </section>
    </SiteShell>
  );
}
