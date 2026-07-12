import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Perigon" },
      { name: "description", content: "The terms governing your use of the Perigon website, products and services." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <PolicyPage title="Terms & Conditions" updated="July 2026">
      <p>By using the Perigon website or placing an order or booking, you agree to these terms.</p>
      <h2>Using our website</h2>
      <p>You agree to use the site lawfully and not to misuse, disrupt or attempt to gain unauthorised access to it.</p>
      <h2>Orders & pricing</h2>
      <p>All prices are shown in Nigerian Naira (₦) and include applicable taxes unless stated otherwise. We reserve the right to correct pricing errors before dispatch.</p>
      <h2>Services</h2>
      <p>Service bookings are confirmed once we contact you with a scheduled time. See our Service Terms for scope, safety and liability details.</p>
      <h2>Liability</h2>
      <p>To the extent permitted by law, Perigon's liability is limited to the value of the order or booking in question.</p>
    </PolicyPage>
  ),
});
