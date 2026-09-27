"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sprout } from "lucide-react";

export function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const heroVideoUrl = "/videos/sunflower.mp4";
  const heroPoster = "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=85";

  return (
    <section className="relative w-full overflow-hidden bg-brand-950 text-white min-h-[90vh] lg:min-h-[92vh] flex items-center">
      {/* Background Editorial Video / Visual Stage */}
      <div className="absolute inset-0 z-0">
        <video
          src={heroVideoUrl}
          poster={heroPoster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className="w-full h-full object-cover object-center scale-105 transition-opacity duration-1000"
          style={{ opacity: videoLoaded ? 0.45 : 0.35 }}
        />
        {/* Editorial Multi-stop Soft Botanical Gradient for pristine contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/80 to-brand-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-brand-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-3xl space-y-8 text-left">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-900/90 text-brand-200 border border-brand-700/60 text-xs font-semibold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span>FRESH FROM SEED TO HARVEST</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.05]">
            Tiny greens.<br />
            <span className="italic font-serif text-emerald-300">
              Big freshness.
            </span>
          </h1>

          {/* Supporting Message */}
          <p className="text-lg sm:text-xl text-brand-100/90 max-w-2xl font-normal leading-relaxed">
            Naturally grown microgreens, harvested fresh and brought to your table.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Link href="/products" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-brand-950 font-bold text-base transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/50 transform hover:-translate-y-0.5"
              >
                <span>Explore Our Greens</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <Link href="/how-it-works" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-brand-900/80 hover:bg-brand-800/90 text-brand-100 font-semibold text-base border border-brand-700/70 transition-all duration-200 text-center"
              >
                How We Grow
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
