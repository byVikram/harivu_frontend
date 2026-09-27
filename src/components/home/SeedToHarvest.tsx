import React from "react";
import { Sprout, Sun, Scissors, PackageCheck, Utensils } from "lucide-react";

export function SeedToHarvest() {
  const steps = [
    {
      num: "01",
      title: "We Seed",
      desc: "Every harvest begins with carefully selected seeds.",
      icon: Sprout,
    },
    {
      num: "02",
      title: "We Grow",
      desc: "We nurture each tray through its growing cycle with care.",
      icon: Sun,
    },
    {
      num: "03",
      title: "We Harvest",
      desc: "We harvest the greens fresh at the right stage.",
      icon: Scissors,
    },
    {
      num: "04",
      title: "We Pack",
      desc: "We carefully prepare each harvest for its journey to you.",
      icon: PackageCheck,
    },
    {
      num: "05",
      title: "You Enjoy",
      desc: "Fresh microgreens arrive ready for your everyday meals.",
      icon: Utensils,
    },
  ];

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-natural-cream text-natural-text border-b border-natural-border/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-900 block">
            Our Growing Journey
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-natural-text leading-[1.12] tracking-tight">
            From a tiny seed<br />
            <span className="italic font-serif text-brand-900">
              to something worth eating.
            </span>
          </h2>
        </div>

        {/* 5-Stage Editorial Process Grid / Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative flex flex-col justify-between space-y-6 pt-6 border-t-2 border-brand-900/20 hover:border-brand-900 transition-colors duration-300 group"
              >
                {/* Step Header */}
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-900/40 group-hover:text-brand-900 transition-colors">
                    {step.num}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-natural-surface border border-natural-border/60 flex items-center justify-center text-brand-900 group-hover:bg-brand-900 group-hover:text-white transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Step Content */}
                <div className="space-y-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-natural-text group-hover:text-brand-900 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-natural-muted leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
