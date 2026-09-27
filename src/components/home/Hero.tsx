"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  Droplets,
  Sun,
  Plus,
  Check,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

export function Hero() {
  const { addItem, setIsCartOpen } = useCart();
  const [activeIdx, setActiveIdx] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const crops = [
    {
      id: "a1b2c3d4-e5f6-4a5b-8c9d-012345678901",
      name: "Radish Microgreens",
      shortName: "Radish",
      emoji: "🌱",
      taste: "Spicy & Peppery Crunch",
      badge: "Sunrise Harvest",
      days: 7,
      price: 80,
      image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=1200&q=85",
      quickBenefit: "40x Vitamin C • Vitality Boost",
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
      name: "Sunflower Shoots",
      shortName: "Sunflower",
      emoji: "🌻",
      taste: "Nutty, Hearty & Sweet",
      badge: "Chef Favorite",
      days: 10,
      price: 90,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
      quickBenefit: "Complete Plant Protein & Zinc",
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
      shortName: "Pea Shoots",
      emoji: "🌿",
      taste: "Sweet Tendril Crunch",
      badge: "Artisanal",
      days: 12,
      price: 85,
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=1200&q=85",
      quickBenefit: "Rich in Natural Folate & Iron",
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
    {
      id: "a4b2c3d4-e5f6-4a5b-8c9d-012345678904",
      name: "Broccoli Microgreens",
      shortName: "Broccoli",
      emoji: "🥦",
      taste: "Mild & Nutrient Dense",
      badge: "Superfood",
      days: 9,
      price: 95,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85",
      quickBenefit: "High Sulforaphane Concentration",
      slug: "broccoli-microgreens",
      variant: {
        id: "b4b2c3d4-e5f6-4a5b-8c9d-012345678901",
        product_id: "a4b2c3d4-e5f6-4a5b-8c9d-012345678904",
        name: "50g Regular Pack",
        weight_grams: 50,
        price: 95.0,
        is_available: true,
      },
    },
  ];

  const current = crops[activeIdx];

  const handleQuickAdd = () => {
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
    <section className="relative w-full overflow-hidden bg-brand-950 text-white">
      {/* Full Bleed Visual Backdrop with Dynamic Crossfade */}
      <div className="absolute inset-0 z-0">
        <img
          src={current.image}
          alt={current.name}
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-all duration-700 ease-out"
          key={current.id}
        />
        {/* Soft Multi-Stop Gradient for Maximum Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/95 via-brand-950/85 to-brand-950" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-14 sm:pb-20 flex flex-col justify-between min-h-[85vh] sm:min-h-[75vh]">
        {/* Top Freshness Bar */}
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-xs font-bold text-emerald-300 tracking-wide uppercase">
              Harvested 6 AM Today
            </span>
          </div>
          <span className="text-[11px] text-white/70 font-medium">
            Bengaluru Same-Day Delivery
          </span>
        </div>

        {/* Main Editorial Story Section */}
        <div className="my-auto py-6 space-y-5 text-center sm:text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider mx-auto sm:mx-0">
            <Sprout className="w-3.5 h-3.5" />
            <span>Living Harvest • Bengaluru</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight">
            Fresh, Living Greens Clipped{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-lime-200 to-emerald-400 italic">
              Sunrise to Table
            </span>
            .
          </h1>

          <p className="text-white/80 text-sm sm:text-base leading-relaxed font-normal">
            No warehouse storage. No chemical boosters. We grow in micro-batches and harvest morning of dispatch for pure crunch, deep vitality, and unforgettable taste.
          </p>

          {/* Quick Primary Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Link href="/products" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-brand-950 font-extrabold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Shop Fresh Greens</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <Link href="/how-it-works" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-all text-center"
              >
                Our 10-Day Process
              </button>
            </Link>
          </div>
        </div>

        {/* Interactive App-Style Mobile Variety Switcher (NO CARDS!) */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs text-white/70">
            <span className="font-bold uppercase tracking-wider text-emerald-300">
              ⚡ Tap to preview today&apos;s sunrise harvest:
            </span>
            <span className="text-white/50 text-[11px]">Swipe →</span>
          </div>

          {/* Horizontal Scrollable Pill Rail */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {crops.map((c, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl whitespace-nowrap text-xs font-bold transition-all border shrink-0 ${
                    isSelected
                      ? "bg-emerald-400 text-brand-950 border-emerald-300 shadow-md scale-105"
                      : "bg-white/10 text-white/90 border-white/15 hover:bg-white/20"
                  }`}
                >
                  <span>{c.emoji}</span>
                  <span>{c.shortName}</span>
                  <span className={`text-[10px] ${isSelected ? "text-brand-900 font-extrabold" : "text-emerald-300"}`}>
                    ₹{c.price}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Variety Mobile Quick Strip */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="min-w-0">
              <span className="text-xs font-bold text-white truncate block">
                {current.name} (50g)
              </span>
              <span className="text-[11px] text-emerald-300 truncate block">
                {current.taste} • {current.quickBenefit}
              </span>
            </div>

            <button
              type="button"
              onClick={handleQuickAdd}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 ${
                justAdded
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-brand-950 hover:bg-emerald-100"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add ₹{current.price}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Minimalist Trust Chips Ribbon */}
        <div className="pt-6 mt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-[11px] text-white/70">
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Non-GMO Seeds</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Pure Water Fed</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Zero Chemicals</span>
          </div>
        </div>
      </div>
    </section>
  );
}
