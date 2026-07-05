import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img src="/perigon-logo.png" alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
            <span className="font-display text-xl tracking-tight">Perigon</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Trusted help for your home, tech, grooming and everyday essentials — one team, on call.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold tracking-wide uppercase text-foreground/80">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold tracking-wide uppercase text-foreground/80">Reach us</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>hello@handyhands.co</li>
            <li>+1 (555) 010-4477</li>
            <li>Mon–Sat · 8am to 8pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Handy Hands. All rights reserved.</span>
          <span>Made with care.</span>
        </div>
      </div>
    </footer>
  );
}
