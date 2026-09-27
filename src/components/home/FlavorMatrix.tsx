"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, ProductVariant } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { Button } from "../ui/Button";
import {
  Sparkles,
  Leaf,
  Plus,
  Minus,
  Check,
  ArrowRight,
  Clock,
  ShieldCheck,
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

  const categories = ["All", "Spicy & Peppery", "Nutty & Crunchy", "Sweet & Tender", "Mild & Nutritious"];

  const filteredProducts = products.filter((p) => {
    if (activeCategoryFilter === "All") return true;
    return p.category.toLowerCase().includes(activeCategoryFilter.toLowerCase());
  });

  const activeProduct = filteredProducts[selectedIdx] || filteredProducts[0] || products[0];
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
    <section className="py-12 sm:py-20 bg-natural-warmWhite border-t border-natural-border/70 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="space-y-3 mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-950 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-700" />
            <span>Living Harvest Explorer</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-natural-text">
            Explore All 7 Fresh Varieties
          </h2>

          <p className="text-natural-muted text-xs sm:text-sm leading-relaxed max-w-2xl">
            Clipped fresh on order morning. Tap any variety to switch between taste profiles, growth cycles, and pack weights.
          </p>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategoryFilter(cat);
                  setSelectedIdx(0);
                }}
                className={`text-xs px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all border shrink-0 ${
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

        {/* Variety Tap Bar (Horizontal on mobile, vertical ledger on desktop) */}
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {filteredProducts.map((p, idx) => {
              const isSelected = p.id === activeProduct.id;
              const price = p.variants?.[0]?.price || p.price;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setSelectedIdx(idx);
                    setSelectedVariantId(null);
                    setQuantity(1);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl whitespace-nowrap text-xs font-bold transition-all border shrink-0 ${
                    isSelected
                      ? "bg-brand-900 text-white border-brand-900 shadow-md scale-[1.03]"
                      : "bg-white text-natural-text border-natural-border hover:border-brand-300"
                  }`}
                >
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-5 h-5 rounded-full object-cover shrink-0"
                  />
                  <span>{p.name}</span>
                  <span className={`text-[10px] ${isSelected ? "text-brand-300" : "text-brand-800"}`}>
                    ₹{price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fluid Active Showcase (NO NESTED BOXES) */}
        <div className="space-y-6">
          {/* Main Visual Image */}
          <div className="relative aspect-[16/10] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-elevated bg-stone-900">
            <img
              src={activeProduct.image_url}
              alt={activeProduct.name}
              className="w-full h-full object-cover animate-scale-in"
              key={activeProduct.id}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-white/95 text-brand-950 text-xs font-bold shadow-xs">
                {activeProduct.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/60 text-brand-300 text-xs font-semibold backdrop-blur-md">
                ⏱️ {activeProduct.growing_days} Days Growth
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs uppercase tracking-wider text-brand-300 font-bold block mb-1">
                Harvested 6 AM Sunrise Dispatch
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold">
                {activeProduct.name}
              </h3>
            </div>
          </div>

          {/* Details & Interactive Pack Selection */}
          <div className="space-y-5">
            <p className="text-sm sm:text-base text-natural-muted leading-relaxed">
              {activeProduct.description || activeProduct.short_description}
            </p>

            {/* Palate Notes */}
            {activeProduct.flavor_profile && (
              <div className="p-3.5 rounded-2xl bg-brand-50 border border-brand-200/80 text-xs sm:text-sm text-brand-950 flex items-start gap-2">
                <span className="font-bold text-brand-900 shrink-0">🌿 Palate:</span>
                <span className="font-medium italic">{activeProduct.flavor_profile}</span>
              </div>
            )}

            {/* Pack Size Pills */}
            {variants.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-natural-text block">
                  Select Pack Size:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {variants.map((v) => {
                    const isSelected = activeVariant.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`py-2.5 px-2 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? "bg-brand-900 text-white border-brand-900 shadow-md scale-105"
                            : "bg-white text-natural-text border-natural-border hover:border-brand-700 hover:bg-brand-50/40"
                        }`}
                      >
                        <span className="block text-xs font-bold truncate">
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

            {/* Sticky/Responsive Bottom Mobile Purchase Strip */}
            <div className="pt-4 border-t border-natural-border flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-natural-muted block">
                  {activeVariant.name}
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-950">
                  {formatCurrency(activeVariant.price * quantity)}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center border border-natural-border rounded-xl bg-white shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-natural-muted hover:text-brand-900"
                  aria-label="Decrease"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 text-xs font-bold text-natural-text min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(50, quantity + 1))}
                  className="p-2 text-natural-muted hover:text-brand-900"
                  aria-label="Increase"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Big Mobile Action Button */}
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                className={`text-xs sm:text-sm px-5 sm:px-8 shadow-md flex-1 sm:flex-none ${
                  justAdded ? "bg-emerald-700" : ""
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 mr-1.5" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-1.5" />
                    <span>Add to Bag</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
