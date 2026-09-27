"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import {
  Sprout,
  Moon,
  Sun,
  Scissors,
  Droplets,
  Thermometer,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export function GrowthTimeline() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      day: "Day 0",
      stageTitle: "Non-GMO Seed Selection & Clean Soak",
      badge: "Pure Initiation",
      icon: Sprout,
      color: "from-amber-600 to-amber-800",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=800&q=80",
      headline: "Untreated seeds awakened in filtered RO water",
      description:
        "Every batch begins with certified non-GMO seeds selected for germination vigor. We pre-soak in clean mineral water to trigger natural biological enzymes without any chemical fertilizers.",
      metrics: [
        { label: "Medium", value: "Organic Sterilized Coir" },
        { label: "Water Purity", value: "< 50 PPM Filtered" },
        { label: "Chemicals", value: "0% Synthetic" },
      ],
      botanicalFact: "Soaking softens the seed coat and activates latent amylase enzymes to kickstart rapid root radicle emergence.",
    },
    {
      day: "Days 1 – 3",
      stageTitle: "Weighted Blackout Germination",
      badge: "Root Anchorage",
      icon: Moon,
      color: "from-slate-700 to-slate-900",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80",
      headline: "Simulating underground pressure for deep root strength",
      description:
        "Trays are stacked under gentle weighted blackout domes in climate-controlled micro-rooms (22°C, 65% RH). This encourages thick, resilient stems and deep root anchorage into the organic substrate.",
      metrics: [
        { label: "Light", value: "0 Lux (Complete Dark)" },
        { label: "Temperature", value: "22°C Steady" },
        { label: "Humidity", value: "65% Optimal RH" },
      ],
      botanicalFact: "Geotropism guides root tips downward while etiolation elongates the embryonic hypocotyl stalk for maximum juiciness.",
    },
    {
      day: "Days 4 – 7",
      stageTitle: "Photosynthesis & Light Canopy",
      badge: "Chlorophyll Activation",
      icon: Sun,
      color: "from-emerald-600 to-teal-800",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
      headline: "Basking under full-spectrum balanced light arrays",
      description:
        "The blackout dome lifts to reveal dense green cotyledons. Trays receive 16 hours of targeted light spectrum, converting clean water and seed energy into rich chlorophyll, anthocyanins, and bioavailable vitamins.",
      metrics: [
        { label: "Photoperiod", value: "16h Light / 8h Dark" },
        { label: "Airflow", value: "Gentle HEPA Breeze" },
        { label: "Nutrient Density", value: "Up to 40x Mature Veg" },
      ],
      botanicalFact: "Microgreens synthesize vitamins C, E, and carotenoids at their absolute highest concentration during early cotyledon expansion.",
    },
    {
      day: "Days 8 – 10",
      stageTitle: "Morning Razor Harvest & Cold Dispatch",
      badge: "Peak Freshness",
      icon: Scissors,
      color: "from-brand-800 to-brand-950",
      image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80",
      headline: "Harvested at 6:00 AM on order day for immediate delivery",
      description:
        "We harvest strictly right above the root collar using sanitized stainless blades during early morning hours when cellular turgor pressure is peak. Packed immediately into breathable containers for same-day Bengaluru delivery.",
      metrics: [
        { label: "Harvest Hour", value: "6:00 AM Daily" },
        { label: "Dispatch Window", value: "Same-Day Bengaluru" },
        { label: "Shelf Life", value: "7–10 Days Chilled" },
      ],
      botanicalFact: "Cutting during morning hydration preserves crisp cellular moisture, giving Harivu microgreens their signature audible crunch.",
    },
  ];

  const current = stages[activeStage];

  return (
    <section className="py-20 bg-natural-surface/60 border-y border-natural-border/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-100 text-brand-950 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-700" />
            <span>Interactive Farm Journey</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-natural-text">
            Seed to Harvest: The 10-Day Lifecycle
          </h2>

          <p className="text-natural-muted text-sm sm:text-base leading-relaxed">
            Click any growth phase below to inspect the natural science and precision care behind every tray.
          </p>
        </div>

        {/* Interactive Step Selector Pill Rail */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {stages.map((st, idx) => {
            const Icon = st.icon;
            const isActive = activeStage === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`relative p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isActive
                    ? "bg-white border-brand-800 shadow-elevated scale-[1.02]"
                    : "bg-white/60 border-natural-border hover:bg-white hover:border-brand-300"
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-900" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isActive ? "bg-brand-900 text-white" : "bg-stone-100 text-stone-700"
                  }`}>
                    {st.day}
                  </span>
                  <Icon className={`w-5 h-5 ${isActive ? "text-brand-900" : "text-stone-400"}`} />
                </div>

                <div>
                  <h4 className={`text-xs sm:text-sm font-bold leading-snug line-clamp-2 ${
                    isActive ? "text-brand-950" : "text-natural-text"
                  }`}>
                    {st.stageTitle}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Active Stage Cinematic Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-natural-border shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-inner bg-stone-900">
              <img
                src={current.image}
                alt={current.stageTitle}
                className="w-full h-full object-cover animate-scale-in"
                key={current.day}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase tracking-widest text-brand-300 font-bold block mb-1">
                  Phase {activeStage + 1} of 4 • {current.day}
                </span>
                <p className="font-serif text-lg sm:text-xl font-bold">
                  {current.headline}
                </p>
              </div>
            </div>

            {/* Botanical Science Insight Callout */}
            <div className="p-4 rounded-xl bg-brand-50/70 border border-brand-200/60 flex items-start gap-3">
              <Sprout className="w-5 h-5 text-brand-800 shrink-0 mt-0.5" />
              <div className="text-xs text-brand-950 leading-relaxed">
                <strong className="block text-brand-900 font-bold mb-0.5">Botanical Science Note:</strong>
                {current.botanicalFact}
              </div>
            </div>
          </div>

          {/* Details & Live Metrics */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-900 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{current.badge}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-natural-text">
                {current.stageTitle}
              </h3>
              <p className="text-natural-muted text-sm sm:text-base leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Environmental Specifications Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {current.metrics.map((m, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-natural-surface border border-natural-border text-center">
                  <span className="text-[10px] uppercase font-bold text-natural-muted block mb-1">
                    {m.label}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-natural-text block">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 border-t border-natural-border/70 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={activeStage === 0}
                  onClick={() => setActiveStage((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl border border-natural-border text-xs font-bold text-natural-text hover:bg-stone-100 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  disabled={activeStage === stages.length - 1}
                  onClick={() => setActiveStage((prev) => Math.min(stages.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-xl bg-brand-900 text-white text-xs font-bold hover:bg-brand-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  Next Phase →
                </button>
              </div>

              <Link href="/products">
                <Button variant="outline" size="sm" className="text-xs">
                  <span>Order Batch Harvest</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
