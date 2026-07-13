import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, LogOut, User as UserIcon, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src="/perigon-logo.png" alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
          <span className="font-display text-xl tracking-tight">Perigon</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {isAdmin && (
            <Link to="/admin" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ShieldCheck className="h-4 w-4" /> Admin
            </Link>
          )}
          {user ? (
            <button onClick={handleSignOut} className="inline-flex items-center gap-1 rounded-full border border-input px-4 py-1.5 text-sm hover:bg-muted">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          ) : (
            <Link to="/auth" className="inline-flex items-center gap-1 rounded-full border border-input px-4 py-1.5 text-sm hover:bg-muted">
              <UserIcon className="h-4 w-4" /> Sign in
            </Link>
          )}
          <Link
            to="/contact"
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Book now
          </Link>
        </div>
        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted"
                activeProps={{ className: "text-foreground font-medium" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted">
                Admin
              </Link>
            )}
            {user ? (
              <button
                onClick={() => { setOpen(false); handleSignOut(); }}
                className="rounded-md px-2 py-2 text-left text-sm text-muted-foreground hover:bg-muted"
              >
                Sign out
              </button>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted">
                Sign in
              </Link>
            )}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
            >
              Book now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
