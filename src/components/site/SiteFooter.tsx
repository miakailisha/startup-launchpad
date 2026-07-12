import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img src="/perigon-logo.png" alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
            <span className="font-display text-xl tracking-tight">Perigon</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Quality products and trusted home services — one dependable team for individuals and businesses.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a href="#" aria-label="Instagram" className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground"><Twitter className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold tracking-wide uppercase text-foreground/80">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-foreground">Products</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold tracking-wide uppercase text-foreground/80">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold tracking-wide uppercase text-foreground/80">Policies</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">Terms & Conditions</Link></li>
            <li><Link to="/refund-policy" className="hover:text-foreground">Refund Policy</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-foreground">Shipping Policy</Link></li>
            <li><Link to="/service-terms" className="hover:text-foreground">Service Terms</Link></li>
            <li><Link to="/cancellation-policy" className="hover:text-foreground">Cancellation</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold tracking-wide uppercase text-foreground/80">Reach us</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>hello@perigon.co</li>
            <li>+234 800 000 0000</li>
            <li>Mon–Sat · 8am–8pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Perigon. All rights reserved.</span>
          <span>Quality products. Trusted home services.</span>
        </div>
      </div>
    </footer>
  );
}
