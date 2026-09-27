"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, ProductVariant } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { Button } from "../ui/Button";
import {
  Sparkles,
  Flame,
  Nut,
  Droplets,
  Heart,
  ShieldCheck,
  Zap,
  Leaf,
  Plus,
  Minus,
  Check,
  ArrowRight,
  Clock,
  Award,
} from "lucide-react";

interface FlavorMatrixProps {
  products: Product[];
}

export function FlavorMatrix({ products }: FlavorMatrixProps) {
  const { addItem } = useCart();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("All");
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Available Categories
  const categories = ["All", "Spicy & Peppery", "Nutty & Crunchy", "Sweet & Tender", "Mild & Nutritious"];

  const filteredProducts = products.filter((p) => {
    if (activeCategoryFilter === "All") return true;
    return p.category.toLowerCase().includes(activeCategoryFilter.toLowerCase());
  });

  const activeProduct = filteredProducts[selectedIdx] || filteredProducts[0] || products[0];

  // Variants
  const variants = activeProduct?.variants || [];
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  const activeVariant: ProductVariant =
    variants.find((v) => v.id === selectedVariantId) ||
    variants.find((v) => v.is_default) ||
    variants[0] || {
      id: `${activeProduct?.id}-def`,
      product_id: activeProduct?.id || "",
      name: "50g Pack",
      weight_grams: 50,
      price: activeProduct?.price || 80,
      is_available: true,
    };

  const handleAddToCart = () => {
    if (!activeProduct) return;
    addItem(activeProduct, activeVariant, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  if (!activeProduct) return null;

  return (
    <section className="py-20 lg:py-28 bg-natural-warmWhite border-t border-natural-border/70 relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-emerald-100/30 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-100 text-brand-950 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-700" />
            <span>Living Harvest Explorer</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-natural-text leading-tight">
            Explore Bengaluru&apos;s Freshest Microgreens
          </h2>

          <p className="text-natural-muted text-sm sm:text-base leading-relaxed">
            Select any living variety below to inspect botanical growth days, flavor profiles, and nutrition highlights.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategoryFilter(cat);
                  setSelectedIdx(0);
                }}
                className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all border ${
                  activeCategoryFilter === cat
                    ? "bg-brand-900 text-white border-brand-900 shadow-xs"
                    : "bg-white text-natural-muted border-natural-border hover:border-brand-700 hover:text-natural-text"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Master Interactive Split Console (NO BORING REPEATING CARDS!) */}
        <div className="bg-white rounded-3xl border border-natural-border shadow-elevated overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Interactive Variety Directory */}
          <div className="lg:col-span-5 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-natural-border/80 bg-natural-surface/40 space-y-2 max-h-[640px] overflow-y-auto">
            <div className="flex items-center justify-between px-2 pb-2 text-xs font-bold uppercase tracking-wider text-natural-muted border-b border-natural-border/60">
              <span>Variety Catalog ({filteredProducts.length})</span>
              <span>Tap to Preview</span>
            </div>

            {filteredProducts.map((p, idx) => {
              const isSelected = p.id === activeProduct.id;
              const firstVariant = p.variants?.[0];
              const price = firstVariant?.price || p.price;

              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedIdx(idx);
                    setSelectedVariantId(null);
                    setQuantity(1);
                  }}
                  className={`w-full p-3.5 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 text-left border ${
                    isSelected
                      ? "bg-white border-brand-800 shadow-card ring-1 ring-brand-800 scale-[1.01]"
                      : "bg-white/60 border-transparent hover:bg-white hover:border-natural-border"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="w-12 h-12 rounded-xl object-cover shadow-xs shrink-0 border border-natural-border"
                    />
                    <div className="min-w-0">
                      <h4 className={`text-sm font-bold truncate ${
                        isSelected ? "text-brand-950 font-serif" : "text-natural-text"
                      }`}>
                        {p.name}
                      </h4>
                      <p className="text-[11px] text-natural-muted truncate">
                        {p.category} • {p.growing_days} Days
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-extrabold text-brand-900 block">
                      ₹{price}
                    </span>
                    <span className="text-[10px] text-natural-muted uppercase font-semibold">
                      50g
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Expansive Botanical Feature Stage */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-8 bg-natural-warmWhite">
            {/* Top Showcase: Image + Badges */}
            <div className="space-y-6">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-card bg-stone-900">
                <img
                  src={activeProduct.image_url}
                  alt={activeProduct.name}
                  className="w-full h-full object-cover animate-scale-in"
                  key={activeProduct.id}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/95 text-brand-950 text-xs font-bold shadow-xs">
                    {activeProduct.category}
                  </span>
                  {activeProduct.is_featured && (
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-700" />
                      Featured Harvest
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs uppercase tracking-wider text-brand-300 font-bold block mb-1">
                    ⏱️ {activeProduct.growing_days} Days Growth • Morning Harvested
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                    {activeProduct.name}
                  </h3>
                </div>
              </div>

              {/* Description & Tasting Notes */}
              <div className="space-y-3">
                <p className="text-sm sm:text-base text-natural-muted leading-relaxed">
                  {activeProduct.description || activeProduct.short_description}
                </p>

                {activeProduct.flavor_profile && (
                  <div className="p-3.5 rounded-2xl bg-brand-50 border border-brand-200/70 text-xs sm:text-sm text-brand-950 flex items-start gap-2">
                    <span className="font-bold text-brand-900 shrink-0">🌿 Palate Notes:</span>
                    <span className="font-medium italic">{activeProduct.flavor_profile}</span>
                  </div>
                )}

                {/* Nutrition Highlights Tag Cloud */}
                {activeProduct.nutrition_highlights && activeProduct.nutrition_highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeProduct.nutrition_highlights.map((nutr, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200"
                      >
                        ✓ {nutr}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Pack Size Selector Tabs */}
              {variants.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-natural-text block">
                    Choose Fresh Pack Size:
                  </span>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {variants.map((v) => {
                      const isSelected = activeVariant.id === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariantId(v.id)}
                          className={`p-3 rounded-2xl border text-center transition-all ${
                            isSelected
                              ? "bg-brand-900 text-white border-brand-900 shadow-md scale-105"
                              : "bg-white text-natural-text border-natural-border hover:border-brand-700 hover:bg-brand-50/50"
                          }`}
                        >
                          <span className="block text-xs font-bold">
                            {v.name}
                          </span>
                          <span className={`block text-xs font-extrabold mt-0.5 ${
                            isSelected ? "text-brand-300" : "text-brand-900"
                          }`}>
                            {formatCurrency(v.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Purchase Strip */}
            <div className="pt-6 border-t border-natural-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                <div>
                  <span className="text-[10px] uppercase font-bold text-natural-muted block">
                    Total Portion Price
                  </span>
                  <span className="font-serif text-3xl font-extrabold text-brand-950">
                    {formatCurrency(activeVariant.price * quantity)}
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-natural-border rounded-xl bg-white shadow-xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-natural-muted hover:text-brand-900"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2.5 text-xs font-bold text-natural-text min-w-[24px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(50, quantity + 1))}
                    className="p-2 text-natural-muted hover:text-brand-900"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <Link href={`/products/${activeProduct.slug}`} className="w-1/2 sm:w-auto">
                  <Button variant="outline" size="md" className="w-full text-xs">
                    Full Profile
                  </Button>
                </Link>

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleAddToCart}
                  className={`w-1/2 sm:w-auto text-xs px-6 shadow-md transition-all ${
                    justAdded ? "bg-emerald-700" : ""
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 mr-1.5" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-1.5" />
                      <span>Add to Harvest Bag</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
