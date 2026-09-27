import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Harivu Microgreens",
  description: "Privacy policy and data protection practices for Harivu.",
};

export default function PrivacyPage() {
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
            Legal & Trust
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-natural-text">
            Privacy Policy
          </h1>
          <p className="text-xs text-natural-muted">
            Last Updated: September 2026
          </p>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-natural-border shadow-subtle space-y-6 text-sm text-natural-text leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-brand-950">
              1. Information We Collect
            </h2>
            <p className="text-natural-muted">
              When you place an order or reach out through our contact forms, Harivu collects essential information necessary to fulfill your fresh harvest delivery, including your name, contact phone number, optional email address, and delivery address.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-brand-950">
              2. How We Use Your Information
            </h2>
            <p className="text-natural-muted">
              Your details are used strictly for:
            </p>
            <ul className="list-disc pl-5 text-natural-muted space-y-1">
              <li>Scheduling and confirming your microgreen harvest bookings.</li>
              <li>Coordinating accurate doorstep delivery in Bengaluru.</li>
              <li>Providing status updates and order verification via WhatsApp or phone.</li>
              <li>Responding to customer support inquiries.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-brand-950">
              3. Data Security & Third Parties
            </h2>
            <p className="text-natural-muted">
              We never sell or distribute your personal data to third-party advertisers. All customer records are stored securely in encrypted Supabase database instances.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-brand-950">
              4. Contact
            </h2>
            <p className="text-natural-muted">
              For any questions regarding your data or privacy, contact us at{" "}
              <a href="mailto:privacy@harivu.in" className="text-brand-900 font-semibold underline">
                privacy@harivu.in
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
