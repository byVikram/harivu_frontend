import React from "react";
import Link from "next/link";
import { Sprout, Sun, Scissors, Package, Utensils, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "How It Works — The Seed to Table Process | Harivu Microgreens",
  description:
    "Follow the 5-step journey of Harivu microgreens: from pure seed selection and natural cultivation to morning harvest, gentle packing, and table enjoyment.",
};

export default function HowItWorksPage() {
  const processSteps = [
    {
      step: "01",
      icon: <Sprout className="w-8 h-8 text-brand-700" />,
      title: "We Seed",
      subtitle: "Selection of Untreated, Non-GMO Seeds",
      desc: "Our journey begins with sourcing premium, high-germination seeds specifically certified for microgreen cultivation. Each seed variety—from robust sunflower seeds to tiny speckled pea seeds—is gently pre-soaked and spread across natural, eco-friendly soil or coco-coir beds.",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6ef2c56a?auto=format&fit=crop&w=800&q=80",
    },
    {
      step: "02",
      icon: <Sun className="w-8 h-8 text-brand-700" />,
      title: "We Grow",
      subtitle: "Controlled Natural Cycles & Mineral Hydration",
      desc: "During the 7 to 14-day vegetative cycle, seedlings develop in a climate-optimized environment with gentle ventilation, purified mineral water, and natural light cycles. The plants draw nutrients stored within their seeds, developing deep chlorophyll pigmentation without any chemical fertilizers.",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    },
    {
      step: "03",
      icon: <Scissors className="w-8 h-8 text-brand-700" />,
      title: "We Harvest",
      subtitle: "Hand-Clipped at Peak Cotyledon Maturation",
      desc: "Timing is everything. We harvest exclusively in early morning cycles when internal moisture and nutrient concentrations are at their biological peak. Our growers hand-clip each batch just above the root line to protect delicate stem structures.",
      image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80",
    },
    {
      step: "04",
      icon: <Package className="w-8 h-8 text-brand-700" />,
      title: "We Pack",
      subtitle: "Food-Grade, Breathable Moisture Packaging",
      desc: "Freshly cut greens are weighed and placed into clean, breathable containers that prevent moisture condensation while maintaining crisp humidity. No chemical preservatives or gas flushes are ever used.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    },
    {
      step: "05",
      icon: <Utensils className="w-8 h-8 text-brand-700" />,
      title: "You Enjoy",
      subtitle: "Living Vitality on Your Daily Table",
      desc: "Delivered straight to your doorstep, Harivu microgreens are ready to elevate your daily avocado toasts, warm grain bowls, fresh salads, smoothies, and Indian delicacies with vibrant crunch and concentrated nutrition.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="py-12 lg:py-20 bg-natural-warmWhite min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-900 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
            Our Sustainable Journey
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-natural-text leading-tight">
            How Harivu Microgreens Are Cultivated & Delivered
          </h1>
          <p className="text-base text-natural-muted leading-relaxed">
            A transparent 5-stage process designed to bring you the freshest, most nutrient-dense greens possible.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-16">
          {processSteps.map((step, index) => {
            const isEven = index % 2 === 1;

            return (
              <div
                key={step.step}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-12 rounded-3xl bg-white border border-natural-border/90 shadow-subtle hover:border-brand-200 transition-all ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Text Description */}
                <div
                  className={`lg:col-span-7 space-y-4 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-3xl font-extrabold text-brand-900">
                      {step.step}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-800 bg-brand-100 px-3 py-1 rounded-full border border-brand-200">
                      Stage {step.step}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-natural-text">
                    {step.title}
                  </h2>
                  <h3 className="text-sm font-semibold text-brand-900">
                    {step.subtitle}
                  </h3>

                  <p className="text-sm text-natural-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Step Image */}
                <div
                  className={`lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card bg-natural-surface ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 p-2.5 rounded-xl bg-white/90 backdrop-blur-md shadow-xs">
                    {step.icon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="p-10 rounded-3xl bg-natural-cream text-center space-y-5 border border-natural-border/80">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-natural-text">
            Ready to Experience Fresh Microgreens?
          </h3>
          <p className="text-sm text-natural-muted max-w-md mx-auto">
            Select from our living varieties and book your freshly harvested pack today.
          </p>
          <div className="pt-2">
            <Link href="/products">
              <Button size="lg">
                <span>Explore Microgreens Catalogue</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
