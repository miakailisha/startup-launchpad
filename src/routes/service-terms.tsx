import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/service-terms")({
  head: () => ({
    meta: [
      { title: "Service Terms — Perigon" },
      { name: "description", content: "The terms that govern Perigon's home service bookings." },
      { property: "og:url", content: "/service-terms" },
    ],
    links: [{ rel: "canonical", href: "/service-terms" }],
  }),
  component: () => (
    <PolicyPage title="Service Terms" updated="July 2026">
      <h2>Scope of service</h2>
      <p>Each booking is confirmed with a written scope — the work included, any parts required and the agreed price. Additional work outside the scope is quoted separately.</p>
      <h2>Access & safety</h2>
      <p>You agree to provide safe, reasonable access to the property and to disclose any known hazards. Our professionals may pause work if a site is unsafe.</p>
      <h2>Warranty</h2>
      <p>We stand behind our work. If an issue with our workmanship appears within 14 days, we'll return and remedy it at no additional cost.</p>
      <h2>Liability</h2>
      <p>Perigon carries appropriate liability cover for the services we provide. Our liability for any single booking is capped at the value of that booking except where required otherwise by law.</p>
    </PolicyPage>
  ),
});
