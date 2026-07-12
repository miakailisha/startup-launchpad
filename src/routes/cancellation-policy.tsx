import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/cancellation-policy")({
  head: () => ({
    meta: [
      { title: "Cancellation Policy — Perigon" },
      { name: "description", content: "How to cancel or reschedule your Perigon service booking." },
      { property: "og:url", content: "/cancellation-policy" },
    ],
    links: [{ rel: "canonical", href: "/cancellation-policy" }],
  }),
  component: () => (
    <PolicyPage title="Cancellation Policy" updated="July 2026">
      <h2>Rescheduling</h2>
      <p>Bookings can be rescheduled free of charge up to 4 hours before the scheduled start time.</p>
      <h2>Cancellations</h2>
      <ul>
        <li>More than 24 hours before: no fee.</li>
        <li>4–24 hours before: 20% of the booking value.</li>
        <li>Less than 4 hours before or no-show: 50% of the booking value.</li>
      </ul>
      <h2>Cancellations by Perigon</h2>
      <p>In the rare case we need to cancel, we'll notify you as early as possible and offer either a full refund or priority rescheduling.</p>
    </PolicyPage>
  ),
});
