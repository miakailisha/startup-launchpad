import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund & Return Policy — Perigon" },
      { name: "description", content: "How Perigon handles product returns and refunds." },
      { property: "og:url", content: "/refund-policy" },
    ],
    links: [{ rel: "canonical", href: "/refund-policy" }],
  }),
  component: () => (
    <PolicyPage title="Refund & Return Policy" updated="July 2026">
      <p>We want you to be happy with what you order from Perigon. If something isn't right, we'll make it right.</p>
      <h2>Return window</h2>
      <p>You may request a return within 7 days of delivery for eligible items, in their original condition and packaging.</p>
      <h2>Non-returnable items</h2>
      <ul>
        <li>Items marked "final sale"</li>
        <li>Personal-care and hygiene products once opened</li>
        <li>Custom or special-order items</li>
      </ul>
      <h2>Refunds</h2>
      <p>Approved refunds are issued to your original payment method within 5–10 business days of us receiving the returned item.</p>
    </PolicyPage>
  ),
});
