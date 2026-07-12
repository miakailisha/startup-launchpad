import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Perigon" },
      { name: "description", content: "How Perigon collects, uses and protects your personal information." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <PolicyPage title="Privacy Policy" updated="July 2026">
      <p>
        Perigon respects your privacy. This policy explains what information we collect when you
        use our website, place an order or book a service, and how we use and safeguard it.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>Contact details (name, email, phone, address) you provide when ordering or booking.</li>
        <li>Order and booking details, including preferred date, time and service notes.</li>
        <li>Basic technical data (browser, device, IP address) collected automatically.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To fulfil orders, schedule services and communicate with you about them.</li>
        <li>To provide customer support and respond to enquiries.</li>
        <li>To improve our website, product range and service quality.</li>
      </ul>
      <h2>Sharing</h2>
      <p>
        We only share your information with the professionals or logistics partners needed to
        complete your order or booking, or where required by law.
      </p>
      <h2>Your rights</h2>
      <p>
        You may request access to, correction of or deletion of your personal data at any time by
        emailing us.
      </p>
    </PolicyPage>
  ),
});
