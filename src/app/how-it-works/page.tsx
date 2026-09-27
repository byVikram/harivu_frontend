import React from "react";
import Link from "next/link";
import { Sprout, Sun, Scissors, Package, Utensils, ArrowRight, ShieldCheck, Droplets, Clock, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "How It Works — Seed to Table | Harivu Microgreens",
  description:
    "Discover how Harivu cultivates living microgreens in Bengaluru: from non-GMO seed selection and pure mineral water hydration to sunrise harvest, breathable packing, and delivery to your table.",
};

const STEPS = [
  {
    number: "01",
    label: "Step 01",
    title: "We Seed",
    tagline: "Certified Untreated & Non-GMO Seeds",
    description:
      "Every harvest begins with meticulously sourced, high-germination seeds tested for pure microgreen cultivation. From plump sunflower seeds to speckled pea seeds, each batch is sown across organic, breathable coco-coir beds without chemical seed treatments.",
    highlights: [
      "100% Non-GMO certified seed stock",
      "Sterilized organic coir growing medium",
      "Optimal seed spacing for even root aeration"
    ],
    video: "/videos/sunflower.mp4",
    poster: "/images/products/sunflower.jpg",
    accent: "bg-emerald-900",
  },
  {
    number: "02",
    label: "Step 02",
    title: "We Grow",
    tagline: "Pure Water & Controlled Microclimate",
    description:
      "Over a 7 to 12-day biological cycle, our seedlings develop in a pristine, climate-balanced environment with gentle air circulation and natural light spectrums. Fed solely by multi-stage filtered pure water, the young plants convert stored seed energy into rich chlorophyll and intense flavor.",
    highlights: [
      "Fed exclusively with pure filtered water",
      "Zero chemical fertilizers or synthetic sprays",
      "Gentle air movement for sturdy stem turgor"
    ],
    video: "/videos/pea-shoot.mp4",
    poster: "/images/products/pea-shoot.jpg",
    accent: "bg-brand-900",
  },
  {
    number: "03",
    label: "Step 03",
    title: "We Harvest",
    tagline: "6:00 AM Sunrise Hand-Clipping",
    description:
      "Timing dictates flavor and cellular vitality. We harvest exclusively in early morning cycles at the precise cotyledon expansion stage—the botanical moment when vitamin concentration and cellular moisture reach peak levels. Each tray is gently hand-clipped above the root line.",
    highlights: [
      "Harvested early morning on dispatch day",
      "Clipped above seed line for crisp, clean stems",
      "Peak cotyledon stage with up to 40x vitamins"
    ],
    video: "/videos/radish.mp4",
    poster: "/images/products/radish.jpg",
    accent: "bg-emerald-950",
  },
  {
    number: "04",
    label: "Step 04",
    title: "We Pack",
    tagline: "Breathable Eco Moisture Containment",
    description:
      "Immediately after harvesting, fresh microgreens are weighed and placed into clean, breathable containers. This food-grade packaging regulates moisture and prevents condensation, ensuring the greens stay crisp, alive, and fresh in your refrigerator for up to 10 days.",
    highlights: [
      "Food-grade breathable protective container",
      "Preserves natural cellular moisture balance",
      "Zero chemical gas flushes or preservatives"
    ],
    video: "/videos/purple-radish.mp4",
    poster: "/images/products/purple-radish.jpg",
    accent: "bg-brand-950",
  },
  {
    number: "05",
    label: "Step 05",
    title: "You Enjoy",
    tagline: "Living Farm-to-Table Vitality",
    description:
      "Delivered directly to your door across Bengaluru, Harivu microgreens are ready to bring lively crunch, deep colors, and concentrated nutrients to everyday food—from morning avocado sourdough toasts and smoothies to warm bowls, soups, and curries.",
    highlights: [
      "Delivered fresh the morning of harvest",
      "Instant upgrade for salads, sandwiches & bowls",
      "Long crisp shelf-life in the crisper drawer"
    ],
    video: "/videos/mustard.mp4",
    poster: "/images/products/mustard.jpg",
    accent: "bg-emerald-900",
  },
];

const COMPARISONS = [
  {
    attribute: "Nutrient Concentration",
    microgreens: "Up to 40x higher vitamin & antioxidant density per gram",
    matureVeg: "Standard nutritional baseline",
  },
  {
    attribute: "Harvest Timing",
    microgreens: "Day 7–12 at peak cotyledon cellular expansion",
    matureVeg: "60–90 days of open-field growth",
  },
  {
    attribute: "Water Usage",
    microgreens: "Uses up to 90% less water than open field farming",
    matureVeg: "Heavy seasonal irrigation demands",
  },
  {
    attribute: "Chemical Inputs",
    microgreens: "100% pure filtered water, zero pesticides or fertilizers",
    matureVeg: "Frequently treated with pesticides & preservatives",
  },
  {
    attribute: "Freshness at Table",
    microgreens: "Delivered morning of harvest with active enzymes",
    matureVeg: "Days to weeks in cold-storage transit chains",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-natural-warmWhite text-natural-text min-h-screen">
      {/* 1. Editorial Hero Header */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 text-xs font-semibold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SEED-TO-TABLE PROCESS</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white">
            From a tiny seed to something <br className="hidden sm:inline" />
            <span className="italic font-serif text-emerald-300">worth eating.</span>
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
            We grow microgreens naturally from seed to harvest in Bengaluru. Explore the 5-step journey that brings raw living nutrition and crunch to your everyday meals.
          </p>
        </div>
      </section>

      {/* 2. Process Stages */}
      <section className="py-20 lg:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">
        {STEPS.map((step, idx) => {
          const isReversed = idx % 2 === 1;

          return (
            <div
              key={step.number}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              {/* Media Visual Stage */}
              <div
                className={`lg:col-span-6 relative rounded-3xl overflow-hidden shadow-card border border-natural-border bg-natural-surface aspect-[4/3] group ${
                  isReversed ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <video
                  src={step.video}
                  poster={step.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  aria-label={step.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white font-mono text-xs font-bold">
                    <span>{step.number}</span>
                    <span className="text-emerald-400">•</span>
                    <span>{step.title}</span>
                  </span>
                </div>
              </div>

              {/* Text Description */}
              <div
                className={`lg:col-span-6 space-y-5 ${
                  isReversed ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-900 block font-mono">
                    {step.label}
                  </span>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-natural-text leading-tight">
                    {step.title}
                  </h2>

                  <h3 className="text-sm font-semibold text-brand-800">
                    {step.tagline}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-natural-muted leading-relaxed font-normal">
                  {step.description}
                </p>

                {/* Key Highlights Checklist */}
                <div className="space-y-2.5 pt-2">
                  {step.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-natural-text font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. Microgreens vs Mature Vegetables Data Comparison */}
      <section className="py-16 lg:py-24 bg-natural-surface border-y border-natural-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-900 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
              The Science of Microgreens
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-natural-text">
              Why Microgreens Excel
            </h2>
            <p className="text-sm text-natural-muted leading-relaxed">
              Harvesting at the early cotyledon stage provides nutrient density that mature produce cannot match.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl bg-white border border-natural-border shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-natural-surface/80 border-b border-natural-border text-natural-muted uppercase text-[11px] font-bold tracking-wider">
                  <th className="p-4 sm:p-5">Dimension</th>
                  <th className="p-4 sm:p-5 text-brand-950 font-bold bg-brand-50/50">Harivu Living Microgreens</th>
                  <th className="p-4 sm:p-5">Standard Mature Vegetables</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-natural-border/70">
                {COMPARISONS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-natural-surface/40 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-natural-text">
                      {row.attribute}
                    </td>
                    <td className="p-4 sm:p-5 font-medium text-brand-950 bg-brand-50/30">
                      {row.microgreens}
                    </td>
                    <td className="p-4 sm:p-5 text-natural-muted">
                      {row.matureVeg}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Core Growing Standards Banner */}
      <section className="py-16 lg:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-natural-border shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-800">
              <Sprout className="w-5 h-5 text-brand-800" />
            </div>
            <h3 className="font-serif text-base font-bold text-natural-text">
              100% Non-GMO
            </h3>
            <p className="text-xs text-natural-muted leading-relaxed">
              Untreated seeds specifically selected for clean, vigorous germination.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-natural-border shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-800">
              <Droplets className="w-5 h-5 text-brand-800" />
            </div>
            <h3 className="font-serif text-base font-bold text-natural-text">
              Pure RO Hydrated
            </h3>
            <p className="text-xs text-natural-muted leading-relaxed">
              Multi-filtered pure water fed throughout the entire vegetative stage.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-natural-border shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-800">
              <Clock className="w-5 h-5 text-brand-800" />
            </div>
            <h3 className="font-serif text-base font-bold text-natural-text">
              6:00 AM Harvest
            </h3>
            <p className="text-xs text-natural-muted leading-relaxed">
              Clipped only on the morning of dispatch for crisp cellular freshness.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-natural-border shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-800">
              <ShieldCheck className="w-5 h-5 text-brand-800" />
            </div>
            <h3 className="font-serif text-base font-bold text-natural-text">
              Zero Synthetic Sprays
            </h3>
            <p className="text-xs text-natural-muted leading-relaxed">
              Zero chemical fertilizers, pesticides, or artificial growth stimulants.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Bottom Call to Action */}
      <section className="py-20 bg-brand-900 text-white border-t border-brand-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Ready to bring living greens to your table?
          </h2>
          <p className="text-base sm:text-lg text-brand-100/90 max-w-xl mx-auto font-normal">
            Order your favorite microgreens today. Freshly harvested to order in Bengaluru.
          </p>
          <div className="pt-2">
            <Link href="/products">
              <Button size="lg" className="bg-emerald-400 hover:bg-emerald-300 text-brand-950 font-bold px-8 py-4 rounded-xl shadow-lg">
                <span>Explore Microgreens Catalogue</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
