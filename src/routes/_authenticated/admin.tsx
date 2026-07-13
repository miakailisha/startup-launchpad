import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SiteShell } from "@/components/site/SiteShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatNGN } from "@/lib/products";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Perigon" }] }),
  component: AdminPage,
});

type Booking = {
  id: string;
  service_name: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string | null;
  preferred_date: string | null;
  message: string | null;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  created_at: string;
};

type Product = {
  id: string;
  slug: string;
  name: string;
  price_ngn: number;
  in_stock: boolean;
  featured: boolean;
  is_active: boolean;
  category_id: string | null;
};

type Service = {
  id: string;
  slug: string;
  name: string;
  starting_price_ngn: number | null;
  featured: boolean;
  is_active: boolean;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  handled: boolean;
  created_at: string;
};

function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return setChecking(false);
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", u.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
      setChecking(false);
    })();
  }, []);

  if (checking) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-6xl px-6 py-24 text-sm text-muted-foreground">Checking access…</div>
      </SiteShell>
    );
  }

  if (!isAdmin) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-md px-6 py-24 text-center">
          <h1 className="font-display text-3xl">Not authorised</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account doesn't have admin access.
          </p>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground hover:opacity-90">
            Go home
          </Link>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-4xl">Admin</h1>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/";
            }}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Sign out
          </button>
        </div>

        <Tabs defaultValue="bookings" className="mt-10">
          <TabsList>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>
          <TabsContent value="bookings"><BookingsTab /></TabsContent>
          <TabsContent value="messages"><MessagesTab /></TabsContent>
          <TabsContent value="products"><ProductsTab /></TabsContent>
          <TabsContent value="services"><ServicesTab /></TabsContent>
        </Tabs>
      </section>
    </SiteShell>
  );
}

function BookingsTab() {
  const [rows, setRows] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as Booking[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: Booking["status"]) {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Updated");
    load();
  }

  if (loading) return <p className="mt-6 text-sm text-muted-foreground">Loading…</p>;
  if (rows.length === 0) return <p className="mt-6 text-sm text-muted-foreground">No bookings yet.</p>;

  return (
    <div className="mt-6 space-y-4">
      {rows.map((b) => (
        <div key={b.id} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-display text-lg">{b.service_name}</p>
              <p className="text-sm text-muted-foreground">
                {b.customer_name} · {b.customer_email} · {b.customer_phone}
              </p>
              {b.address && <p className="mt-1 text-xs text-muted-foreground">{b.address}</p>}
              {b.preferred_date && <p className="mt-1 text-xs text-muted-foreground">Preferred: {b.preferred_date}</p>}
              {b.message && <p className="mt-2 text-sm">{b.message}</p>}
              <p className="mt-2 text-xs text-muted-foreground">{new Date(b.created_at).toLocaleString()}</p>
            </div>
            <Select value={b.status} onValueChange={(v) => updateStatus(b.id, v as Booking["status"])}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="in_progress">In progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
    </div>
  );
}

function MessagesTab() {
  const [rows, setRows] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as ContactMessage[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);
  async function toggleHandled(id: string, handled: boolean) {
    const { error } = await supabase.from("contact_messages").update({ handled }).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }
  if (loading) return <p className="mt-6 text-sm text-muted-foreground">Loading…</p>;
  if (rows.length === 0) return <p className="mt-6 text-sm text-muted-foreground">No messages yet.</p>;
  return (
    <div className="mt-6 space-y-4">
      {rows.map((m) => (
        <div key={m.id} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-lg">{m.subject || "General enquiry"}</p>
              <p className="text-sm text-muted-foreground">{m.name} · {m.email}{m.phone ? ` · ${m.phone}` : ""}</p>
              <p className="mt-2 text-sm">{m.message}</p>
              <p className="mt-2 text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</p>
            </div>
            <label className="flex items-center gap-2 text-xs">
              <input type="checkbox" checked={m.handled} onChange={(e) => toggleHandled(m.id, e.target.checked)} />
              Handled
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductsTab() {
  const [rows, setRows] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("id,slug,name,price_ngn,in_stock,featured,is_active,category_id").order("sort_order");
    if (error) toast.error(error.message);
    setRows((data as Product[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);
  async function toggle(id: string, field: "in_stock" | "featured" | "is_active", v: boolean) {
    const { error } = await supabase.from("products").update({ [field]: v }).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }
  if (loading) return <p className="mt-6 text-sm text-muted-foreground">Loading…</p>;
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left">
          <tr>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">In stock</th>
            <th className="px-4 py-3">Featured</th>
            <th className="px-4 py-3">Active</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id} className="border-t border-border">
              <td className="px-4 py-3">{p.name}</td>
              <td className="px-4 py-3">{formatNGN(Number(p.price_ngn))}</td>
              <td className="px-4 py-3"><input type="checkbox" checked={p.in_stock} onChange={(e) => toggle(p.id, "in_stock", e.target.checked)} /></td>
              <td className="px-4 py-3"><input type="checkbox" checked={p.featured} onChange={(e) => toggle(p.id, "featured", e.target.checked)} /></td>
              <td className="px-4 py-3"><input type="checkbox" checked={p.is_active} onChange={(e) => toggle(p.id, "is_active", e.target.checked)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ServicesTab() {
  const [rows, setRows] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("services").select("id,slug,name,starting_price_ngn,featured,is_active").order("sort_order");
    if (error) toast.error(error.message);
    setRows((data as Service[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);
  async function toggle(id: string, field: "featured" | "is_active", v: boolean) {
    const { error } = await supabase.from("services").update({ [field]: v }).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }
  if (loading) return <p className="mt-6 text-sm text-muted-foreground">Loading…</p>;
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left">
          <tr>
            <th className="px-4 py-3">Service</th>
            <th className="px-4 py-3">From</th>
            <th className="px-4 py-3">Featured</th>
            <th className="px-4 py-3">Active</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => (
            <tr key={s.id} className="border-t border-border">
              <td className="px-4 py-3">{s.name}</td>
              <td className="px-4 py-3">{s.starting_price_ngn ? formatNGN(Number(s.starting_price_ngn)) : "Quote"}</td>
              <td className="px-4 py-3"><input type="checkbox" checked={s.featured} onChange={(e) => toggle(s.id, "featured", e.target.checked)} /></td>
              <td className="px-4 py-3"><input type="checkbox" checked={s.is_active} onChange={(e) => toggle(s.id, "is_active", e.target.checked)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// silence unused import warnings for Textarea/Input/Label if tabs are trimmed later
export const _unused = { Input, Textarea, Label };
