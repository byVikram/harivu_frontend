"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Sprout, ArrowRight, ShieldCheck, Sun, Droplets, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-brand-50/70 via-natural-cream/30 to-natural-warmWhite">
      {/* Decorative Natural Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-100/30 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/90 text-brand-950 border border-brand-200/80 shadow-xs">
              <Sprout className="w-4 h-4 text-brand-700" />
              <span className="text-xs font-semibold tracking-wide uppercase">
                Seed to Harvest • Bengaluru, India
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-natural-text leading-[1.15] tracking-tight">
              Fresh, Naturally Grown{" "}
              <span className="text-brand-900 underline decoration-brand-300 decoration-wavy decoration-2">
                Microgreens
              </span>{" "}
              for Everyday Wellness.
            </h1>

            <p className="text-base sm:text-lg text-natural-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Harivu nurtures living greens from pure seed to peak harvest in sustainable micro-batches. Harvested fresh on order so you enjoy pure crunch, concentrated vitality, and natural flavor.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/products" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto shadow-md">
                  <span>Order Fresh Microgreens</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/how-it-works" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Our Process
                </Button>
              </Link>
            </div>

            {/* Value Trust Badges */}
            <div className="pt-6 border-t border-natural-border/70 grid grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-700 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-natural-text">Naturally Grown</p>
                  <p className="text-[11px] text-natural-muted">No synthetic accelerators</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Droplets className="w-4 h-4 text-brand-700 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-natural-text">Pure Water Fed</p>
                  <p className="text-[11px] text-natural-muted">Clean mineral hydration</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Sun className="w-4 h-4 text-brand-700 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-natural-text">Morning Harvest</p>
                  <p className="text-[11px] text-natural-muted">Clipped right for you</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow Card */}
              <div className="relative rounded-3xl p-3 bg-gradient-to-tr from-brand-900/10 via-emerald-100/40 to-natural-cream border border-brand-200/50 shadow-elevated">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85"
                    alt="Harivu Freshly Grown Microgreens"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] uppercase tracking-widest text-brand-300 font-bold block mb-0.5">
                      Living Greens
                    </span>
                    <p className="font-serif text-lg font-bold leading-snug">
                      Packed with fresh natural flavor and dense nutrients
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Floating Stat Badge */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-natural-warmWhite/95 backdrop-blur-md p-4 rounded-2xl border border-natural-border shadow-elevated flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-900 font-bold">
                  🌱
                </div>
                <div>
                  <span className="text-xs text-natural-muted font-medium block">
                    Cultivation Standard
                  </span>
                  <span className="text-sm font-bold text-brand-950 block">
                    100% Seed to Harvest
                  </span>
                </div>
              </div>

              {/* Floating Free Delivery Badge */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-brand-900 text-natural-warmWhite p-3.5 rounded-2xl shadow-elevated hidden sm:flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-brand-300" />
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-brand-200 block">
                    Freshness Promise
                  </span>
                  <span className="text-xs font-bold block">
                    Clipped to Order
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
