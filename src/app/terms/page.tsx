import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Harivu Microgreens",
  description: "Terms and conditions for Harivu orders and deliveries.",
};

export default function TermsPage() {
  return (
    <div className="py-12 lg:py-20 bg-natural-warmWhite min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-natural-muted hover:text-brand-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-900 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            Terms & Conditions
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-natural-text">
            Terms of Service
          </h1>
          <p className="text-xs text-natural-muted">
            Last Updated: September 2026
          </p>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-natural-border shadow-subtle space-y-6 text-sm text-natural-text leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-brand-950">
              1. Fresh Harvest Model
            </h2>
            <p className="text-natural-muted">
              Harivu microgreens are perishable, living produce harvested upon booking confirmation. Harvest timelines are subject to natural seed germination cycles and diurnal conditions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-brand-950">
              2. Order Bookings & Confirmations
            </h2>
            <p className="text-natural-muted">
              Submitting an order on harivu.in creates a harvest booking. Our team confirms batch availability with you before dispatch. Orders may be rescheduled if a specific crop variety requires additional days to reach peak cotyledon maturity.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-brand-950">
              3. Delivery & Handling
            </h2>
            <p className="text-natural-muted">
              We deliver within designated zones across Bengaluru. To preserve cellular crispness and flavor, customers are advised to refrigerate the microgreens promptly upon receipt.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-brand-950">
              4. Contact & Inquiries
            </h2>
            <p className="text-natural-muted">
              For any questions regarding order terms, contact{" "}
              <a href="mailto:support@harivu.in" className="text-brand-900 font-semibold underline">
                support@harivu.in
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
