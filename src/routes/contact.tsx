import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, Clock, MapPin, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
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
import { homeServices, whatsappLink } from "@/lib/homeServices";

const schema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(6, "Enter a valid phone number").max(30),
  service: z.string().min(1, "Pick a service"),
  date: z.string().optional(),
  address: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10, "A little more detail helps").max(1000),
});

type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Book a Service — Perigon" },
      { name: "description", content: "Get in touch or book a Perigon service — cleaning, plumbing, electrical, installations and more. We reply within a couple of hours." },
      { property: "og:title", content: "Contact & Book a Service — Perigon" },
      { property: "og:description", content: "Tell us what you need. We'll be back within a couple of hours." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", service: "", date: "", address: "", message: "" },
  });

  const serviceValue = watch("service");

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const isService = values.service !== "Product enquiry" && values.service !== "Something else";
      if (isService) {
        const { error } = await supabase.from("bookings").insert({
          service_name: values.service,
          customer_name: values.name,
          customer_email: values.email,
          customer_phone: values.phone,
          address: values.address || null,
          preferred_date: values.date || null,
          message: values.message,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.from("contact_messages").insert({
          name: values.name,
          email: values.email,
          phone: values.phone,
          subject: values.service,
          message: values.message,
        });
        if (error) throw error;
      }
      toast.success("Request received", {
        description: "We'll be in touch within a couple of hours.",
      });
      reset();
    } catch (err) {
      toast.error("Could not send your request", {
        description: err instanceof Error ? err.message : "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-10 md:pt-28">
        <Reveal>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Contact & Booking</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl md:text-6xl">
            Tell us what you need.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Fill in a few details and we'll come back with a time and a quote — usually within a couple of hours.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-24 md:grid-cols-12">
        <Reveal className="md:col-span-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 rounded-2xl border border-border bg-card p-6 md:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Your name</Label>
                <Input id="name" placeholder="Jane Doe" className="mt-2" {...register("name")} />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@email.com" className="mt-2" {...register("email")} />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="+234 800 000 0000" className="mt-2" {...register("phone")} />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
              </div>
              <div>
                <Label htmlFor="date">Preferred date</Label>
                <Input id="date" type="date" className="mt-2" {...register("date")} />
              </div>
            </div>

            <div>
              <Label>Service</Label>
              <Select
                value={serviceValue || undefined}
                onValueChange={(v) => setValue("service", v, { shouldValidate: true })}
              >
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Pick a service" />
                </SelectTrigger>
                <SelectContent>
                  {homeServices.map((s) => (
                    <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>
                  ))}
                  <SelectItem value="Product enquiry">Product enquiry</SelectItem>
                  <SelectItem value="Something else">Something else</SelectItem>
                </SelectContent>
              </Select>
              {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service.message}</p>}
            </div>

            <div>
              <Label htmlFor="address">Address (for services)</Label>
              <Input id="address" placeholder="Street, area, city" className="mt-2" {...register("address")} />
            </div>

            <div>
              <Label htmlFor="message">What do you need?</Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="A short description of what you need, including any details we should know."
                className="mt-2"
                {...register("message")}
              />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
            </div>

            <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-xs text-muted-foreground">
                We'll only use your details to reply to this request.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Send request"}
              </button>
            </div>
          </form>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-4">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-xl">Reach us directly</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> hello@perigon.co</li>
                <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> +234 800 000 0000</li>
                <li className="flex items-center gap-3"><MessageCircle className="h-4 w-4 text-primary" /> WhatsApp: +234 800 000 0000</li>
                <li className="flex items-center gap-3"><Clock className="h-4 w-4 text-primary" /> Mon–Sat · 8am to 8pm</li>
                <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> 24 Adeola Odeku, Victoria Island, Lagos</li>
              </ul>
              <a
                href={whatsappLink("Hi Perigon, I'd like to make an enquiry.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Chat on WhatsApp
              </a>
            </div>
            <div className="rounded-2xl bg-accent/40 p-6 text-sm text-foreground/80">
              <p className="font-display text-lg text-foreground">Urgent?</p>
              <p className="mt-2">
                For same-day help, call or WhatsApp us — email is checked less often on weekends.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </SiteShell>
  );
}
