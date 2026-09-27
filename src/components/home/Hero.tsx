"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "../ui/Button";
import { formatCurrency } from "@/lib/utils";
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  Sun,
  Droplets,
  Sparkles,
  CheckCircle2,
  Clock,
  Flame,
  Plus,
  Check,
  Award,
  Zap,
} from "lucide-react";

export function Hero() {
  const { addItem } = useCart();
  const [activeCropIdx, setActiveCropIdx] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const featuredCrops = [
    {
      id: "a1b2c3d4-e5f6-4a5b-8c9d-012345678901",
      name: "Radish Microgreens",
      tagline: "Vibrant Peppery Crunch",
      badge: "Sunrise Harvest Pick",
      days: 7,
      price: 80,
      weight: "50g Pack",
      image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=1200&q=85",
      notes: "Crisp pink stems packed with Vitamin C and bold wasabi-like zest.",
      flavorRadar: { crunch: 95, spice: 88, sweetness: 30 },
      nutrition: "40x Vit C vs Mature Radish",
      slug: "radish-microgreens",
      variant: {
        id: "b1b2c3d4-e5f6-4a5b-8c9d-012345678901",
        product_id: "a1b2c3d4-e5f6-4a5b-8c9d-012345678901",
        name: "50g Regular Pack",
        weight_grams: 50,
        price: 80.0,
        is_available: true,
      },
    },
    {
      id: "a2b2c3d4-e5f6-4a5b-8c9d-012345678902",
      name: "Sunflower Microgreens",
      tagline: "Nutty, Hearty & Succulent",
      badge: "Chef Signature Base",
      days: 10,
      price: 90,
      weight: "50g Pack",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
      notes: "Thick, juicy emerald leaves with the comforting sweet essence of raw sunflower kernels.",
      flavorRadar: { crunch: 98, spice: 10, sweetness: 75 },
      nutrition: "Rich in Complete Plant Protein & Zinc",
      slug: "sunflower-microgreens",
      variant: {
        id: "b2b2c3d4-e5f6-4a5b-8c9d-012345678901",
        product_id: "a2b2c3d4-e5f6-4a5b-8c9d-012345678902",
        name: "50g Regular Pack",
        weight_grams: 50,
        price: 90.0,
        is_available: true,
      },
    },
    {
      id: "a3b2c3d4-e5f6-4a5b-8c9d-012345678903",
      name: "Speckled Pea Shoots",
      tagline: "Sweet Leafy Tendrils",
      badge: "Artisanal Garnish",
      days: 12,
      price: 85,
      weight: "50g Pack",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=1200&q=85",
      notes: "Tender twisting tendrils with a sweet fresh garden pea flavor and crisp moisture.",
      flavorRadar: { crunch: 85, spice: 5, sweetness: 92 },
      nutrition: "High Bioavailable Folate & Fiber",
      slug: "speckled-pea-shoots",
      variant: {
        id: "b3b2c3d4-e5f6-4a5b-8c9d-012345678901",
        product_id: "a3b2c3d4-e5f6-4a5b-8c9d-012345678903",
        name: "50g Regular Pack",
        weight_grams: 50,
        price: 85.0,
        is_available: true,
      },
    },
  ];

  const current = featuredCrops[activeCropIdx];

  const handleHeroQuickAdd = () => {
    const product: any = {
      id: current.id,
      name: current.name,
      slug: current.slug,
      price: current.price,
      image_url: current.image,
      variants: [current.variant],
    };
    addItem(product, current.variant, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <section className="relative overflow-hidden bg-brand-950 text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Cinematic Lighting & Ambient Botanical Radiance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(34,197,94,0.18),rgba(11,59,36,0)_80%)] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-brand-800/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Live Farm Status Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10 pb-4 border-b border-brand-800/60">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-900/80 border border-brand-700/60 text-xs font-medium text-brand-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="font-bold text-white">Live Harvest:</span>
            <span>6:00 AM Sunrise Batches • Same-Day Bengaluru Doorstep Dispatch</span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-xs text-brand-300/80 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Non-GMO Seeds
            </span>
            <span className="flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-emerald-400" />
              Pure RO Water Fed
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              Zero Chemical Sprays
            </span>
          </div>
        </div>

        {/* Hero Headline & Interactive Split Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Text & Value Props */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-700/50 text-xs font-bold uppercase tracking-widest">
              <Sprout className="w-3.5 h-3.5" />
              <span>Living Farm to Table • Bengaluru</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight text-white">
              Cultivating Bengaluru&apos;s Purest{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-brand-300 to-lime-200 italic font-serif">
                Living Greens
              </span>
              .
            </h1>

            <p className="text-brand-200/90 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Harvested strictly at sunrise on the day of your order. No shelf-aging, no chemical accelerators—just concentrated raw vitality, crisp textures, and unforgettable flavor.
            </p>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/products" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-brand-950 font-extrabold text-sm sm:text-base shadow-elevated transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <span>Explore Harvest Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/how-it-works" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-brand-900/90 hover:bg-brand-800 text-white font-semibold text-sm sm:text-base border border-brand-700/70 transition-all"
                >
                  Our 10-Day Process
                </button>
              </Link>
            </div>

            {/* Live Interactive Tray Switcher Rail */}
            <div className="pt-6 border-t border-brand-900/80">
              <span className="text-[11px] uppercase font-extrabold tracking-widest text-brand-400 block mb-3 text-left">
                ⚡ Select Sunrise Harvest Tray to Preview:
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {featuredCrops.map((crop, idx) => {
                  const isSelected = activeCropIdx === idx;
                  return (
                    <button
                      key={crop.id}
                      type="button"
                      onClick={() => setActiveCropIdx(idx)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                        isSelected
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-md scale-105"
                          : "bg-brand-900/60 text-brand-300 border-brand-800 hover:bg-brand-900 hover:border-brand-700"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-emerald-400" : "bg-brand-600"}`} />
                      <span>{crop.name.split(" ")[0]}</span>
                      <span className="text-[10px] text-brand-400 font-normal">₹{crop.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Cinematic Live Variety Showcase (No generic cards!) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-brand-900/90 to-brand-950 border border-brand-700/60 shadow-2xl p-6 sm:p-8 space-y-6">
              {/* Macro Photography Window */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-inner bg-stone-900">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover animate-scale-in"
                  key={current.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-brand-950 text-xs font-extrabold shadow-sm backdrop-blur-md">
                    {current.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur-md">
                    ⏱️ {current.days} Days Growth
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs uppercase tracking-wider text-emerald-300 font-bold block mb-0.5">
                    {current.tagline}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                    {current.name}
                  </h3>
                </div>
              </div>

              {/* Sensory Flavor Radar Meters */}
              <div className="space-y-2 bg-brand-950/80 p-4 rounded-2xl border border-brand-800">
                <div className="flex items-center justify-between text-xs font-bold text-brand-200">
                  <span>Flavor Intensity Profile</span>
                  <span className="text-emerald-400">✨ {current.nutrition}</span>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div>
                    <div className="flex justify-between text-[11px] text-brand-300 mb-1">
                      <span>Crunch</span>
                      <span>{current.flavorRadar.crunch}%</span>
                    </div>
                    <div className="h-1.5 bg-brand-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${current.flavorRadar.crunch}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-brand-300 mb-1">
                      <span>Zest / Heat</span>
                      <span>{current.flavorRadar.spice}%</span>
                    </div>
                    <div className="h-1.5 bg-brand-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${current.flavorRadar.spice}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-brand-300 mb-1">
                      <span>Sweetness</span>
                      <span>{current.flavorRadar.sweetness}%</span>
                    </div>
                    <div className="h-1.5 bg-brand-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-300 rounded-full transition-all duration-500"
                        style={{ width: `${current.flavorRadar.sweetness}%` }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-brand-300/90 pt-1 leading-relaxed italic">
                  &ldquo;{current.notes}&rdquo;
                </p>
              </div>

              {/* Purchase Action Strip */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-400 block">
                    Living Crop Portion ({current.weight})
                  </span>
                  <span className="font-serif text-2xl font-extrabold text-white">
                    {formatCurrency(current.price)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/products/${current.slug}`}>
                    <button
                      type="button"
                      className="px-4 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-brand-200 text-xs font-bold border border-brand-700 transition-colors"
                    >
                      Botanical Profile
                    </button>
                  </Link>

                  <button
                    type="button"
                    onClick={handleHeroQuickAdd}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-md ${
                      justAdded
                        ? "bg-emerald-500 text-brand-950"
                        : "bg-emerald-400 hover:bg-emerald-300 text-brand-950"
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
