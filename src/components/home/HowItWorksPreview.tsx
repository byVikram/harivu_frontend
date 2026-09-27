import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";

export function HowItWorksPreview() {
  const steps = [
    {
      num: "01",
      title: "We Seed",
      desc: "Pure, non-GMO untreated seeds are selected and placed on natural growing media.",
    },
    {
      num: "02",
      title: "We Grow",
      desc: "Hydrated with mineral water and nurtured under ideal light cycles for 7–14 days.",
    },
    {
      num: "03",
      title: "We Harvest",
      desc: "Hand-clipped fresh at the peak cotyledon stage for maximal crunch and vibrant taste.",
    },
    {
      num: "04",
      title: "We Pack",
      desc: "Safely packaged in protective containers to retain moisture and living freshness.",
    },
    {
      num: "05",
      title: "You Enjoy",
      desc: "Delivered straight to your doorstep ready to elevate your daily meals.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-natural-warmWhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-900 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
              The Harivu Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-natural-text">
              How It Works
            </h2>
            <p className="text-sm sm:text-base text-natural-muted max-w-xl">
              From our seed trays to your dining table — an honest, sustainable process.
            </p>
          </div>

          <Link href="/how-it-works">
            <Button variant="outline" size="md">
              <span>Read Detailed Process</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* 5-Step Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.num}
              className="relative p-6 rounded-3xl bg-natural-surface/60 border border-natural-border/80 flex flex-col justify-between hover:bg-natural-surface transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl font-bold text-brand-900">
                    {step.num}
                  </span>
                  {index < steps.length - 1 && (
                    <span className="hidden lg:block text-natural-border text-lg font-bold">
                      →
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-lg font-bold text-natural-text">
                  {step.title}
                </h3>
                <p className="text-xs text-natural-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-natural-border/50 text-[11px] font-semibold text-brand-900">
                Stage {step.num}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
