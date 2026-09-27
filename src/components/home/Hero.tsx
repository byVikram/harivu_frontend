"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
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
} from "lucide-react";

export function Hero() {
  const [activeGreen, setActiveGreen] = useState(0);

  const heroGreens = [
    {
      name: "Radish Microgreens",
      accent: "Peppery & Crisp",
      tag: "Top Garnish",
      image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=1000&q=85",
      price: "₹80",
      harvestWindow: "7 Days Growth",
      tastePill: "🔥 Sharp zesty kick • Rich in Vitamin C",
    },
    {
      name: "Sunflower Microgreens",
      accent: "Nutty & Succulent",
      tag: "Chef Favorite",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=85",
      price: "₹90",
      harvestWindow: "10 Days Growth",
      tastePill: "🌱 Juicy crunch • Complete plant protein",
    },
    {
      name: "Speckled Pea Shoots",
      accent: "Sweet & Leafy",
      tag: "Fresh Tendrils",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=1000&q=85",
      price: "₹85",
      harvestWindow: "12 Days Growth",
      tastePill: "✨ Tender sweet flavor • High dietary fiber",
    },
  ];

  const current = heroGreens[activeGreen];

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24 bg-gradient-to-b from-brand-50/80 via-natural-cream/40 to-natural-warmWhite">
      {/* Background Organic Radial Glows */}
      <div className="absolute top-0 right-0 -mr-28 -mt-28 w-[500px] h-[500px] rounded-full bg-emerald-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-28 -mb-28 w-[400px] h-[400px] rounded-full bg-brand-100/40 blur-3xl pointer-events-none" />

      {/* Live Freshness Notification Ticker */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-brand-200 shadow-subtle text-xs text-brand-950 font-medium animate-scale-in">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="font-bold text-brand-900">Today's Harvest:</span>
          <span>Morning Clipped Trays Ready • Bengaluru Next-Day Delivery Available</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/90 text-brand-950 border border-brand-200 shadow-xs">
              <Sprout className="w-4 h-4 text-brand-800" />
              <span className="text-xs font-bold tracking-wider uppercase">
                Seed to Harvest • Bengaluru, India
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-natural-text leading-[1.12] tracking-tight">
              Living Greens Cultivated Naturally from{" "}
              <span className="text-brand-900 underline decoration-brand-400 decoration-wavy decoration-2">
                Seed to Harvest
              </span>
              .
            </h1>

            <p className="text-base sm:text-lg text-natural-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Harivu grows nutrient-dense microgreens in sustainable, pesticide-free micro-batches. Harvested strictly at sunrise for Bengaluru tables seeking vibrant freshness and honest vitality.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/products" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto shadow-md">
                  <span>Order Fresh Harvest</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/how-it-works" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Cultivation Process
                </Button>
              </Link>
            </div>

            {/* Natural Pillars Highlight */}
            <div className="pt-6 border-t border-natural-border/80 grid grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="p-3 rounded-2xl bg-white/70 border border-natural-border/70 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-brand-800 mb-1" />
                <p className="text-xs font-bold text-natural-text">100% Non-GMO</p>
                <p className="text-[11px] text-natural-muted">Untreated seeds</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/70 border border-natural-border/70 shadow-xs">
                <Droplets className="w-4 h-4 text-brand-800 mb-1" />
                <p className="text-xs font-bold text-natural-text">Pure Water Fed</p>
                <p className="text-[11px] text-natural-muted">Zero fertilizers</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/70 border border-natural-border/70 shadow-xs">
                <Sun className="w-4 h-4 text-brand-800 mb-1" />
                <p className="text-xs font-bold text-natural-text">6 AM Harvest</p>
                <p className="text-[11px] text-natural-muted">Clipped to order</p>
              </div>
            </div>
          </div>

          {/* Right Interactive Crop Visualizer */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Interactive Variety Preview Card */}
              <div className="relative rounded-3xl p-4 bg-white border border-brand-200 shadow-elevated">
                {/* Image Banner */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-inner bg-stone-900">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    key={current.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-white/95 text-brand-950 text-xs font-bold shadow-xs">
                      {current.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs uppercase tracking-wider text-brand-300 font-bold block mb-0.5">
                      {current.accent}
                    </span>
                    <h3 className="font-serif text-2xl font-bold">
                      {current.name}
                    </h3>
                  </div>
                </div>

                {/* Taste & Growth Specs */}
                <div className="mt-4 p-3 rounded-xl bg-brand-50/80 border border-brand-100 text-xs text-brand-950 font-medium">
                  {current.tastePill}
                </div>

                {/* Crop Switcher Interactive Selector */}
                <div className="mt-4 flex items-center justify-between gap-2 pt-2 border-t border-natural-border/60">
                  <div className="flex gap-1.5">
                    {heroGreens.map((g, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveGreen(idx)}
                        className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${
                          activeGreen === idx
                            ? "bg-brand-900 text-white shadow-xs"
                            : "bg-natural-surface text-natural-muted hover:text-natural-text"
                        }`}
                      >
                        {g.name.split(" ")[0]}
                      </button>
                    ))}
                  </div>

                  <Link href="/products">
                    <span className="text-xs font-bold text-brand-900 hover:underline">
                      From {current.price} →
                    </span>
                  </Link>
                </div>
              </div>

              {/* Floating Floating Stat Badge */}
              <div className="absolute -bottom-5 -left-4 bg-natural-warmWhite/95 backdrop-blur-md p-3.5 rounded-2xl border border-natural-border shadow-elevated flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-900 font-bold text-lg">
                  🌱
                </div>
                <div>
                  <span className="text-[11px] text-natural-muted font-medium block">
                    Cultivation Standard
                  </span>
                  <span className="text-xs font-bold text-brand-950 block">
                    100% Seed to Harvest
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
