import React from "react";

export function FreshnessStatement() {
  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-natural-cream text-natural-text border-b border-natural-border/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-900 block">
          Our Philosophy
        </span>

        {/* Large Statement */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-natural-text leading-[1.18] tracking-tight">
          Grown with care.<br />
          Harvested fresh.<br />
          <span className="text-brand-900 italic font-serif">
            Made for your table.
          </span>
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg lg:text-xl text-natural-muted max-w-3xl mx-auto leading-relaxed font-normal">
          At Harivu, we grow our microgreens from seed to harvest with care, so every harvest reaches you fresh, vibrant, and full of natural flavor.
        </p>
      </div>
    </section>
  );
}
