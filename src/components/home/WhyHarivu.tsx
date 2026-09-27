import React from "react";
import Link from "next/link";
import { Sprout, Droplets, Sun, Clock, Sparkles, Check, X, ArrowRight } from "lucide-react";

export function WhyHarivu() {
  const comparison = [
    {
      aspect: "Harvest Timing",
      harivu: "Harvested at 6:00 AM on order day (Peak turgor & crispness)",
      supermarket: "Harvested 5–9 days ago, languishing in distribution depots",
    },
    {
      aspect: "Growing Medium & Water",
      harivu: "Sterilized organic coir fed with pure mineral RO hydration (< 50 PPM)",
      supermarket: "Mass recirculated solutions or conventional soil runoff",
    },
    {
      aspect: "Nutrient Integrity",
      harivu: "100% active enzymes & living antioxidants delivered within hours",
      supermarket: "Degraded vitamin C and wilted phytonutrient concentration",
    },
    {
      aspect: "Packaging & Handling",
      harivu: "Zero unwashed chemical sprays; breathable food-safe chill tubs",
      supermarket: "Chlorine rinse baths and non-breathable plastic wraps",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-natural-warmWhite relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-8 border-b border-natural-border/80">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-100 text-brand-950 text-xs font-semibold uppercase tracking-wider">
              <Sprout className="w-3.5 h-3.5 text-brand-700" />
              <span>The Harivu Standard</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-natural-text leading-tight">
              Why Discerning Bengaluru Homes & Chefs Choose Harivu
            </h2>
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <p className="text-sm text-natural-muted leading-relaxed">
              We reject industrial shortcuts. Every tray is cultivated naturally from seed with zero growth boosters, delivering pure concentrated vitality.
            </p>
          </div>
        </div>

        {/* Editorial Direct Comparison Table (No boring cards!) */}
        <div className="bg-white rounded-3xl border border-natural-border/80 shadow-card overflow-hidden mb-16">
          <div className="p-6 sm:p-8 bg-brand-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-300 block mb-1">
                Transparency Benchmark
              </span>
              <h3 className="font-serif text-2xl font-bold">
                Harivu Living Harvest vs. Standard Supermarket Greens
              </h3>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-brand-800 text-brand-200 text-xs font-semibold border border-brand-700 self-start sm:self-auto">
              Bengaluru Direct Farm-to-Table
            </span>
          </div>

          <div className="divide-y divide-natural-border/70">
            {comparison.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-6 sm:p-8 gap-4 sm:gap-6 hover:bg-natural-surface/40 transition-colors items-center"
              >
                <div className="md:col-span-3">
                  <span className="text-xs uppercase font-extrabold text-natural-muted tracking-wider block mb-1">
                    Criterion
                  </span>
                  <span className="font-serif text-lg font-bold text-natural-text">
                    {item.aspect}
                  </span>
                </div>

                <div className="md:col-span-5 p-4 rounded-2xl bg-brand-50/70 border border-brand-100 flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase font-bold text-brand-900 block mb-0.5">
                      Harivu Guarantee
                    </span>
                    <p className="text-xs font-semibold text-brand-950 leading-relaxed">
                      {item.harivu}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-4 p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3 opacity-75">
                  <X className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase font-bold text-stone-500 block mb-0.5">
                      Conventional Retail
                    </span>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.supermarket}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nutritional Supercharge Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-brand-900 via-brand-950 to-emerald-950 text-white p-8 sm:p-12 shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs uppercase tracking-widest text-brand-300 font-bold block">
              Nutrient Science
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug">
              40x More Concentrated Micronutrients in Every Handful
            </h3>
            <p className="text-brand-200/80 text-sm sm:text-base leading-relaxed max-w-2xl">
              Scientific research confirms that young cotyledon leaves contain significantly higher concentrations of polyphenols, vitamins C, E, K, and sulforaphane compared to mature vegetables.
            </p>
          </div>

          <div className="lg:col-span-4 text-left lg:text-right">
            <Link href="/products">
              <button
                type="button"
                className="px-6 py-3.5 rounded-2xl bg-white text-brand-950 hover:bg-brand-100 text-sm font-bold shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Shop Fresh Varieties</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
