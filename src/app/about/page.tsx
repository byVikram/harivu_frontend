import React from "react";
import Link from "next/link";
import { Sprout, Droplets, Clock, Heart, ShieldCheck, ArrowRight, Sparkles, CheckCircle2, MapPin, Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "About Us — The Harivu Story | Naturally Grown Microgreens",
  description:
    "Learn about Harivu (harivu.in), our philosophy of natural microgreen cultivation in Bengaluru, and our commitment to bringing living farm freshness directly to your everyday table.",
};

const PILLARS = [
  {
    icon: Sprout,
    title: "Naturally Grown from Seed",
    tagline: "Clean botanical genetics",
    desc: "We begin exclusively with certified untreated, non-GMO seed stock. Sown in sterilized organic coco-coir, our microgreens draw their vitality from the seed itself without synthetic soil additives.",
  },
  {
    icon: Droplets,
    title: "Pure Water Hydration",
    tagline: "Zero chemical inputs",
    desc: "Microgreens are over 90% water. We use multi-stage filtered pure RO water throughout the vegetative cycle to maintain pristine cellular purity and intense, unadulterated flavor.",
  },
  {
    icon: Clock,
    title: "Sunrise Morning Harvest",
    tagline: "6:00 AM clipping schedule",
    desc: "We clip microgreens on the morning of dispatch at the biological peak of cotyledon expansion when cellular turgor, aroma, and micronutrient concentrations are highest.",
  },
  {
    icon: Leaf,
    title: "Made for Everyday Food",
    tagline: "Accessible daily nutrition",
    desc: "Microgreens belong in daily home cooking. We grow tender, crunchy greens meant for everyday sourdough toasts, grain bowls, dal garnishes, fresh salads, and morning smoothies.",
  },
];

const VARIETIES_PREVIEW = [
  { name: "Sunflower", image: "/images/products/sunflower.jpg", note: "Nutty, crunchy, complete protein" },
  { name: "Radish", image: "/images/products/radish.jpg", note: "Spicy, peppery, 40x Vitamin C" },
  { name: "Pea Shoots", image: "/images/products/pea-shoot.jpg", note: "Sweet, tender, rich in folate" },
  { name: "Purple Radish", image: "/images/products/purple-radish.jpg", note: "Vibrant ruby stems, high antioxidants" },
];

export default function AboutPage() {
  return (
    <div className="bg-natural-warmWhite text-natural-text min-h-screen">
      {/* 1. Editorial Hero */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 text-xs font-semibold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>OUR STORY & GROWING PHILOSOPHY</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white">
            We believe fresh food should feel <br className="hidden sm:inline" />
            <span className="italic font-serif text-emerald-300">close to home.</span>
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Harivu was born from a simple belief: greens are at their nutritional and culinary peak when they are living, vibrant, and harvested right when you need them.
          </p>
        </div>
      </section>

      {/* 2. The Meaning of Harivu & Our Core Story */}
      <section className="py-20 lg:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-900 block font-mono">
                The Essence of Harivu
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-natural-text leading-tight">
                A continuous flow of pure, living freshness.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-natural-muted leading-relaxed">
              In Kannada, the word <strong className="text-natural-text font-semibold">Harivu</strong> represents a natural flow—a stream of life and continuous vitality. For us, it encapsulates our vision of modern agriculture: a transparent, unbroken flow from seed germination to harvest and onto your dining table.
            </p>

            <p className="text-sm sm:text-base text-natural-muted leading-relaxed">
              In conventional supply chains, produce sits in warehouse refrigeration for days or weeks before reaching store shelves, losing cellular moisture, active enzymes, and taste. We chose a different path.
            </p>

            <p className="text-sm sm:text-base text-natural-muted leading-relaxed">
              By cultivating microgreens locally in Bengaluru and clipping them fresh to order, we bring living vitality, authentic flavors, and up to 40x the vitamin concentration of mature greens directly into your home kitchen.
            </p>

            <div className="pt-2 flex items-center gap-6 text-xs sm:text-sm font-semibold text-brand-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Zero Pesticides</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>100% Non-GMO</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Morning Harvest</span>
              </div>
            </div>
          </div>

          {/* Right Video / Visual Stage */}
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card border border-natural-border bg-natural-surface group">
            <video
              src="/videos/sunflower.mp4"
              poster="/images/products/sunflower.jpg"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              aria-label="Harivu sunflower microgreens"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />

            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-md border border-white/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-900 shrink-0">
                  <MapPin className="w-5 h-5 text-brand-800" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-natural-text">Bengaluru Urban Micro-Farm</h4>
                  <p className="text-[11px] text-natural-muted">Locally grown • Zero food miles • Same-day dispatch</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 4 Principles of Honest Farming */}
      <section className="py-20 bg-natural-surface border-y border-natural-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-900 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
              Our Commitments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-natural-text">
              Grown with Care. Made for Everyday Life.
            </h2>
            <p className="text-sm text-natural-muted leading-relaxed">
              Every tray that leaves our farm adheres to four uncompromising principles of natural cultivation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-natural-border shadow-xs hover:shadow-card hover:border-brand-300 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-800">
                      <Icon className="w-5 h-5 text-brand-800" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-natural-text">
                      {pillar.title}
                    </h3>
                    <div className="text-[11px] font-semibold text-brand-800">
                      {pillar.tagline}
                    </div>
                    <p className="text-xs text-natural-muted leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Visual Living Harvest Collage */}
      <section className="py-20 lg:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-900 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
            Our Living Harvest
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-natural-text">
            Meet the Greens We Grow
          </h2>
          <p className="text-sm text-natural-muted leading-relaxed">
            Each variety offers a distinctive botanical personality, flavor profile, and nutritional density.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {VARIETIES_PREVIEW.map((item, idx) => (
            <Link
              key={idx}
              href="/products"
              className="group rounded-2xl overflow-hidden border border-natural-border bg-white shadow-xs hover:shadow-card hover:border-brand-300 transition-all"
            >
              <div className="aspect-square overflow-hidden bg-natural-surface relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-3.5 space-y-1">
                <h4 className="font-serif text-sm font-bold text-natural-text group-hover:text-brand-900 transition-colors">
                  {item.name}
                </h4>
                <p className="text-[11px] text-natural-muted line-clamp-1 font-medium">
                  {item.note}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Editorial Quote Strip */}
      <section className="py-16 bg-natural-cream border-y border-natural-border/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-brand-950 italic font-medium leading-relaxed">
            &ldquo;When you taste microgreens clipped on the morning of delivery, you realize what fresh food was always meant to feel like.&rdquo;
          </p>
          <div className="text-xs font-bold uppercase tracking-widest text-brand-800">
            — The Harivu Growing Team, Bengaluru
          </div>
        </div>
      </section>

      {/* 6. Final Call to Action */}
      <section className="py-20 bg-brand-900 text-white border-t border-brand-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Ready to experience fresh microgreens?
          </h2>
          <p className="text-base sm:text-lg text-brand-100/90 max-w-xl mx-auto font-normal">
            Choose from our 6 freshly grown varieties and enjoy living nutrition delivered to your doorstep.
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
