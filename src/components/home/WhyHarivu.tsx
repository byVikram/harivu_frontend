import React from "react";

export function WhyHarivu() {
  const principles = [
    {
      num: "01",
      title: "Naturally grown",
      desc: "We focus on simple, careful growing from seed to harvest.",
    },
    {
      num: "02",
      title: "Harvested fresh",
      desc: "We harvest with freshness in mind, so your greens are ready for the table.",
    },
    {
      num: "03",
      title: "Grown with care",
      desc: "Every tray gets attention through its growing journey.",
    },
    {
      num: "04",
      title: "Made for everyday food",
      desc: "Add a handful to salads, sandwiches, bowls, wraps and more.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-natural-warmWhite text-natural-text border-b border-natural-border/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Heading */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-900 block">
              The Harivu Difference
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-natural-text leading-tight">
              Why Harivu?
            </h2>

            <p className="text-base text-natural-muted leading-relaxed font-normal pt-2">
              We believe fresh food should be grown honestly, harvested thoughtfully, and enjoyed every single day.
            </p>
          </div>

          {/* Right Principles Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
            {principles.map((p) => (
              <div key={p.title} className="space-y-3">
                <span className="font-serif text-sm font-bold text-brand-900/60 block">
                  {p.num}
                </span>
                <h3 className="font-serif text-2xl font-bold text-natural-text">
                  {p.title}
                </h3>
                <p className="text-sm sm:text-base text-natural-muted leading-relaxed font-normal">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
