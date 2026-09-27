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
  Check,
  ArrowRight,
} from "lucide-react";

interface FlavorMatrixProps {
  products: Product[];
}

type FilterType = "flavor" | "benefit";

export function FlavorMatrix({ products }: FlavorMatrixProps) {
  const { addItem } = useCart();
  const [filterType, setFilterType] = useState<FilterType>("flavor");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [addedVariantId, setAddedVariantId] = useState<string | null>(null);

  const flavorTags = [
    { id: "All", label: "All Varieties", icon: Leaf },
    { id: "peppery", label: "Spicy & Peppery", icon: Flame, match: ["Radish", "Mustard"] },
    { id: "nutty", label: "Nutty & Crunchy", icon: Nut, match: ["Sunflower", "Salad Mix"] },
    { id: "sweet", label: "Sweet & Tender", icon: Sparkles, match: ["Pea", "Beetroot"] },
    { id: "mild", label: "Mild & Nutrient-Rich", icon: Droplets, match: ["Broccoli", "Salad Mix"] },
  ];

  const benefitTags = [
    { id: "All", label: "All Benefits", icon: Leaf },
    { id: "immunity", label: "Immunity Boost (Vit C & A)", icon: ShieldCheck, match: ["Radish", "Broccoli", "Mustard"] },
    { id: "energy", label: "Clean Vitality & Iron", icon: Zap, match: ["Beetroot", "Pea", "Sunflower"] },
    { id: "cellular", label: "Cellular Protection & Sulforaphane", icon: Heart, match: ["Broccoli", "Radish"] },
  ];

  const activeTags = filterType === "flavor" ? flavorTags : benefitTags;

  const filteredProducts = products.filter((p) => {
    if (selectedTag === "All") return true;
    const activeGroup = activeTags.find((t) => t.id === selectedTag);
    if (!activeGroup || !("match" in activeGroup) || !activeGroup.match) return true;
    return activeGroup.match.some((keyword) =>
      p.name.toLowerCase().includes(keyword.toLowerCase()) ||
      p.category.toLowerCase().includes(keyword.toLowerCase()) ||
      (p.flavor_profile && p.flavor_profile.toLowerCase().includes(keyword.toLowerCase()))
    );
  });

  const handleQuickAdd = (product: Product) => {
    const variant: ProductVariant = product.variants?.[0] || {
      id: `${product.id}-def`,
      product_id: product.id,
      name: "50g Pack",
      weight_grams: 50,
      price: product.price,
      is_available: true,
    };
    addItem(product, variant, 1);
    setAddedVariantId(variant.id);
    setTimeout(() => setAddedVariantId(null), 1400);
  };

  return (
    <section className="py-20 bg-natural-warmWhite border-t border-natural-border/60 relative overflow-hidden">
      {/* Subtle organic ambient blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-50/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-100/30 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-950 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-700" />
            <span>Interactive Taste & Wellness Profiler</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-natural-text leading-tight">
            Discover Greens Tailored to Your Palate & Body
          </h2>

          <p className="text-natural-muted text-sm sm:text-base leading-relaxed">
            Toggle between tasting notes and nutritional supercharges to find your perfect living harvest.
          </p>

          {/* Master Mode Switcher */}
          <div className="inline-flex p-1 bg-natural-surface rounded-2xl border border-natural-border/80 shadow-inner mt-4">
            <button
              type="button"
              onClick={() => {
                setFilterType("flavor");
                setSelectedTag("All");
              }}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                filterType === "flavor"
                  ? "bg-brand-900 text-white shadow-xs"
                  : "text-natural-muted hover:text-natural-text"
              }`}
            >
              🌿 Filter by Taste & Flavor
            </button>
            <button
              type="button"
              onClick={() => {
                setFilterType("benefit");
                setSelectedTag("All");
              }}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                filterType === "benefit"
                  ? "bg-brand-900 text-white shadow-xs"
                  : "text-natural-muted hover:text-natural-text"
              }`}
            >
              ✨ Filter by Health & Supernutrients
            </button>
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {activeTags.map((tag) => {
            const Icon = tag.icon;
            const isSelected = selectedTag === tag.id;
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => setSelectedTag(tag.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all border ${
                  isSelected
                    ? "bg-brand-900 text-white border-brand-900 shadow-md scale-105"
                    : "bg-white text-natural-text border-natural-border hover:border-brand-300 hover:bg-brand-50/40"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-brand-300" : "text-brand-700"}`} />
                <span>{tag.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Product Showcase (Clean Editorial List / Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const firstVariant = product.variants?.[0];
            const price = firstVariant?.price || product.price;
            const isJustAdded = addedVariantId === (firstVariant?.id || `${product.id}-def`);

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-3xl p-6 border border-natural-border/70 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between hover:border-brand-400"
              >
                <div>
                  {/* Top Image + Quick Highlights */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-natural-surface mb-5">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-white/95 text-brand-950 text-[11px] font-bold shadow-xs backdrop-blur-md">
                        {product.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="font-semibold bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-md">
                        ⏱️ {product.growing_days} Days Growth
                      </span>
                      <span className="font-bold text-brand-200">
                        From ₹{price}
                      </span>
                    </div>
                  </div>

                  {/* Variety Title & Sensor Notes */}
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-serif text-xl font-bold text-natural-text group-hover:text-brand-900 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                    </div>

                    <p className="text-xs text-natural-muted leading-relaxed line-clamp-2">
                      {product.short_description}
                    </p>

                    {/* Sensor / Flavor Badge */}
                    {product.flavor_profile && (
                      <div className="p-2.5 rounded-xl bg-brand-50/70 border border-brand-100/80 text-[11px] text-brand-950 flex items-start gap-2">
                        <span className="shrink-0 text-brand-700 font-bold">Palate:</span>
                        <span className="font-medium italic">{product.flavor_profile}</span>
                      </div>
                    )}

                    {/* Nutrition Highlights Tag Cloud */}
                    {product.nutrition_highlights && product.nutrition_highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {product.nutrition_highlights.slice(0, 3).map((nutr, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/60"
                          >
                            ✓ {nutr}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-5 mt-5 border-t border-natural-border/60 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-natural-muted block">
                      50g Pack
                    </span>
                    <span className="font-serif text-lg font-extrabold text-brand-950">
                      {formatCurrency(price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={`/products/${product.slug}`}>
                      <Button variant="outline" size="sm" className="text-xs py-1.5 px-3">
                        Profile
                      </Button>
                    </Link>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleQuickAdd(product)}
                      className={`text-xs py-1.5 px-3.5 transition-all ${
                        isJustAdded ? "bg-emerald-700" : ""
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Catalogue Link */}
        <div className="text-center mt-12">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-brand-900 hover:text-brand-700 transition-colors">
            <span>Explore all living varieties in our full harvest catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
