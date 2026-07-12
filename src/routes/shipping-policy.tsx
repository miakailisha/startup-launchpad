import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({
    meta: [
      { title: "Shipping Policy — Perigon" },
      { name: "description", content: "How Perigon delivers products across Nigeria." },
      { property: "og:url", content: "/shipping-policy" },
    ],
    links: [{ rel: "canonical", href: "/shipping-policy" }],
  }),
  component: () => (
    <PolicyPage title="Shipping Policy" updated="July 2026">
      <h2>Delivery areas</h2>
      <p>We deliver nationwide across Nigeria, with same-day and next-day options within Lagos and Abuja.</p>
      <h2>Delivery times</h2>
      <ul>
        <li>Lagos & Abuja: 1–2 business days</li>
        <li>Other cities: 3–5 business days</li>
        <li>Remote locations: 5–7 business days</li>
      </ul>
      <h2>Shipping fees</h2>
      <p>Shipping is calculated at checkout based on the delivery address and order weight. Occasional free-shipping offers are announced on our homepage.</p>
      <h2>Tracking</h2>
      <p>Once dispatched, you'll receive an update via email, SMS or WhatsApp with tracking details where available.</p>
    </PolicyPage>
  ),
});
