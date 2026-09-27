import React from "react";
import Link from "next/link";
import { Sprout, Sun, Droplets, HeartHandshake, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "About Us — Our Seed to Harvest Story | Harivu Microgreens",
  description:
    "Learn about Harivu, our natural growing philosophy, and why living microgreens harvested to order bring better freshness and nutrition to your table.",
};

export default function AboutPage() {
  return (
    <div className="py-12 lg:py-20 bg-natural-warmWhite min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-900 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
            About Harivu
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-natural-text leading-tight">
            Nurturing Living Greens, from Seed to Peak Harvest.
          </h1>
          <p className="text-base sm:text-lg text-natural-muted leading-relaxed">
            Harivu is founded on a straightforward principle: greens are best enjoyed living, vibrant, and harvested right when you need them.
          </p>
        </div>

        {/* Brand Story Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-natural-cream/80 border border-natural-border/80 shadow-subtle grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4 text-natural-text leading-relaxed text-sm sm:text-base">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-950">
              Why We Grow
            </h2>
            <p className="text-natural-muted">
              In conventional food supply chains, delicate microgreens are cut days in advance, wrapped in plastic, and chilled through long distributor routes. By the time they reach home kitchens, much of their cellular vitality and aromatic crunch is diminished.
            </p>
            <p className="text-natural-muted">
              At Harivu, we cultivate microgreens locally in carefully managed batches. We sow untreated non-GMO seeds, nurture them with clean mineral water and natural light cycles, and only harvest upon receiving your booking.
            </p>
            <p className="text-natural-muted">
              This direct grower-to-customer connection ensures that every leaf arrives with its natural essential oils, vibrant flavors, and concentrated nutrition intact.
            </p>
          </div>

          <div className="md:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
            <img
              src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80"
              alt="Harivu living radish microgreens"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Our Guiding Commitments */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-natural-text">
              Our Core Commitments
            </h3>
            <p className="text-sm text-natural-muted">
              Every crop tray that leaves our facility adheres to clean, honest standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-natural-border shadow-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-900">
                <Sprout className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-natural-text">
                Natural Cultivation
              </h4>
              <p className="text-xs text-natural-muted leading-relaxed">
                We believe in letting plants grow naturally. No synthetic accelerators, artificial dyes, or chemical pesticide sprays ever touch our crops.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-natural-border shadow-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-900">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-natural-text">
                Pure Water Hydration
              </h4>
              <p className="text-xs text-natural-muted leading-relaxed">
                Microgreens are over 90% water. We use exclusively purified mineral hydration to ensure uncontaminated, clean plant cell structure.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-natural-border shadow-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-900">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-natural-text">
                Local Transparency
              </h4>
              <p className="text-xs text-natural-muted leading-relaxed">
                Grown right in Bengaluru, reducing transit emissions and providing a transparent relationship between grower and consumer.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Bottom Strip */}
        <div className="p-8 rounded-3xl bg-brand-900 text-natural-warmWhite text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            Taste the Harivu Freshness Difference.
          </h3>
          <p className="text-xs sm:text-sm text-brand-100/80 max-w-lg mx-auto leading-relaxed">
            Whether for your morning eggs, afternoon salads, or dinner garnishes, our microgreens bring crunch and vitality to your day.
          </p>
          <div className="pt-2">
            <Link href="/products">
              <Button variant="secondary" size="md">
                <span>Browse Available Greens</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
