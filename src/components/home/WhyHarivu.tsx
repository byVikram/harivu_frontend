import React from "react";
import { Sprout, SunMedium, Clock, HeartHandshake, MapPin } from "lucide-react";

export function WhyHarivu() {
  const pillars = [
    {
      icon: <Sprout className="w-6 h-6 text-brand-700" />,
      title: "Seed to Harvest",
      desc: "Every crop begins from carefully selected, untreated seeds and is nurtured in-house under controlled natural conditions until optimal leaf maturation.",
    },
    {
      icon: <SunMedium className="w-6 h-6 text-brand-700" />,
      title: "Naturally Grown",
      desc: "We rely on clean water, optimal airflow, and natural light cycles with zero synthetic growth accelerants or chemical sprays.",
    },
    {
      icon: <Clock className="w-6 h-6 text-brand-700" />,
      title: "Freshly Harvested to Order",
      desc: "Unlike mass retail greens that sit on supermarket shelves for days, your greens are harvested in morning cycles right before delivery.",
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-brand-700" />,
      title: "Carefully Handled",
      desc: "Tender stems and cotyledons are gently clipped and packaged in food-grade, breathable containers to retain crisp moisture and living vitality.",
    },
    {
      icon: <MapPin className="w-6 h-6 text-brand-700" />,
      title: "Locally Cultivated",
      desc: "Cultivated right here in the city to maintain the shortest possible transit time from seed tray to your dining plate.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-natural-cream/60 border-y border-natural-border/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-900 bg-brand-100 px-3 py-1 rounded-full border border-brand-200">
            Our Growing Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-natural-text">
            Why Harivu Microgreens?
          </h2>
          <p className="text-sm sm:text-base text-natural-muted">
            We believe the healthiest greens are living, local, and grown with honest agricultural practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className={`p-7 rounded-3xl bg-white border border-natural-border shadow-subtle hover:shadow-card hover:border-brand-300 transition-all duration-300 ${
                idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center border border-brand-100 mb-5">
                {pillar.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-natural-text mb-2.5">
                {pillar.title}
              </h3>
              <p className="text-sm text-natural-muted leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}

          {/* Quick Stat Highlight Card */}
          <div className="p-7 rounded-3xl bg-brand-900 text-natural-warmWhite shadow-card flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-brand-300 block">
                Pure Nutrition
              </span>
              <h3 className="font-serif text-2xl font-bold leading-tight">
                Up to 40x denser micronutrients than mature vegetables.
              </h3>
            </div>
            <p className="text-xs text-brand-200/80 pt-4 border-t border-brand-800">
              Young seedlings concentrate beneficial vitamins, carotenoids, and minerals for immediate bioavailability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
