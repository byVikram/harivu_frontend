"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "../ui/Button";
import { formatCurrency } from "@/lib/utils";
import {
  Utensils,
  Sparkles,
  ChefHat,
  Plus,
  Check,
  ArrowRight,
  Flame,
  Award,
} from "lucide-react";

export function CulinaryPairing() {
  const { addItem } = useCart();
  const [selectedMealIdx, setSelectedMealIdx] = useState(0);
  const [added, setAdded] = useState(false);

  const pairings = [
    {
      mealName: "Avocado Sourdough Toast",
      category: "Artisanal Breakfast",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
      recommendedGreens: "Radish & Sunflower Shoots",
      flavorProfile: "Zesty pepper contrast against rich, buttery avocado fat",
      culinaryTip:
        "Top warm toasted sourdough and smashed avocado with a dense nest of radish microgreens. The peppery bite cuts through healthy fats perfectly while providing an audible crunch.",
      mockProduct: {
        id: "a1b2c3d4-e5f6-4a5b-8c9d-012345678901",
        name: "Radish Microgreens",
        slug: "radish-microgreens",
        price: 80.0,
        image_url: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80",
        variants: [
          {
            id: "b1b2c3d4-e5f6-4a5b-8c9d-012345678901",
            product_id: "a1b2c3d4-e5f6-4a5b-8c9d-012345678901",
            name: "50g Regular Pack",
            weight_grams: 50,
            price: 80.0,
            is_available: true,
            is_default: true,
          },
        ],
      },
    },
    {
      mealName: "Bengaluru Crisp Dosa & Chutney",
      category: "South Indian Classic",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
      recommendedGreens: "Mustard Microgreens (Sasive)",
      flavorProfile: "Traditional pungent Indian mustard warmth",
      culinaryTip:
        "Sprinkle freshly harvested mustard microgreens inside hot ghee roast dosa or over coconut chutney. It revitalizes traditional South Indian flavors with enzyme-rich raw pungency.",
      mockProduct: {
        id: "a6b2c3d4-e5f6-4a5b-8c9d-012345678906",
        name: "Mustard Microgreens",
        slug: "mustard-microgreens",
        price: 75.0,
        image_url: "https://images.unsplash.com/photo-1628773822503-930a84d4128f?auto=format&fit=crop&w=800&q=80",
        variants: [
          {
            id: "b6b2c3d4-e5f6-4a5b-8c9d-012345678901",
            product_id: "a6b2c3d4-e5f6-4a5b-8c9d-012345678906",
            name: "50g Regular Pack",
            weight_grams: 50,
            price: 75.0,
            is_available: true,
            is_default: true,
          },
        ],
      },
    },
    {
      mealName: "Mediterranean Quinoa & Feta Salad",
      category: "Gourmet Lunch",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
      recommendedGreens: "Speckled Pea Shoots & Signature Mix",
      flavorProfile: "Sweet, leafy succulent tenderness with mild earthy depth",
      culinaryTip:
        "Toss delicate tendrils of pea shoots with chilled quinoa, cherry tomatoes, and crumbled feta. Dress lightly with cold-pressed olive oil and lemon juice for an upscale cafe salad.",
      mockProduct: {
        id: "a3b2c3d4-e5f6-4a5b-8c9d-012345678903",
        name: "Speckled Pea Shoots",
        slug: "speckled-pea-shoots",
        price: 85.0,
        image_url: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=800&q=80",
        variants: [
          {
            id: "b3b2c3d4-e5f6-4a5b-8c9d-012345678901",
            product_id: "a3b2c3d4-e5f6-4a5b-8c9d-012345678903",
            name: "50g Regular Pack",
            weight_grams: 50,
            price: 85.0,
            is_available: true,
            is_default: true,
          },
        ],
      },
    },
    {
      mealName: "Warm Ramen & Asian Broth Bowls",
      category: "Noodle & Soup Bowl",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
      recommendedGreens: "Broccoli & Radish Microgreens",
      flavorProfile: "Fresh crisp texture that stays crunchy on steaming broth",
      culinaryTip:
        "Garnish hot noodle soup right before serving. The steam gently releases aromatic micro-nutrients while keeping the leaves vividly emerald and delightfully crunchy.",
      mockProduct: {
        id: "a4b2c3d4-e5f6-4a5b-8c9d-012345678904",
        name: "Broccoli Microgreens",
        slug: "broccoli-microgreens",
        price: 95.0,
        image_url: "https://images.unsplash.com/photo-1588865198282-f1d9675e640d?auto=format&fit=crop&w=800&q=80",
        variants: [
          {
            id: "b4b2c3d4-e5f6-4a5b-8c9d-012345678901",
            product_id: "a4b2c3d4-e5f6-4a5b-8c9d-012345678904",
            name: "50g Regular Pack",
            weight_grams: 50,
            price: 95.0,
            is_available: true,
            is_default: true,
          },
        ],
      },
    },
    {
      mealName: "Morning Green Vitality Smoothie",
      category: "Superfood Blend",
      image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80",
      recommendedGreens: "Beetroot & Broccoli Greens",
      flavorProfile: "Vivid ruby hue with concentrated bioavailable sulforaphane & iron",
      culinaryTip:
        "Blend a handful of fresh beetroot and broccoli microgreens with green apple, cucumber, and ginger. Delivers live phytonutrients directly to your cellular bloodstream.",
      mockProduct: {
        id: "a5b2c3d4-e5f6-4a5b-8c9d-012345678905",
        name: "Beetroot Microgreens",
        slug: "beetroot-microgreens",
        price: 90.0,
        image_url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80",
        variants: [
          {
            id: "b5b2c3d4-e5f6-4a5b-8c9d-012345678901",
            product_id: "a5b2c3d4-e5f6-4a5b-8c9d-012345678905",
            name: "50g Regular Pack",
            weight_grams: 50,
            price: 90.0,
            is_available: true,
            is_default: true,
          },
        ],
      },
    },
  ];

  const current = pairings[selectedMealIdx];

  const handleAddPairing = () => {
    const prod: any = current.mockProduct;
    const variant = prod.variants[0];
    addItem(prod, variant, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <section className="py-20 bg-natural-warmWhite relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-100 text-brand-950 text-xs font-semibold uppercase tracking-wider">
            <ChefHat className="w-3.5 h-3.5 text-brand-700" />
            <span>Interactive Culinary Canvas</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-natural-text">
            Elevate What You Eat Every Day
          </h2>

          <p className="text-natural-muted text-sm sm:text-base leading-relaxed">
            Click any everyday meal below to see how a handful of living microgreens transforms ordinary dishes into nutritional powerhouses.
          </p>
        </div>

        {/* Meal Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {pairings.map((p, idx) => {
            const isActive = selectedMealIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedMealIdx(idx)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all border ${
                  isActive
                    ? "bg-brand-900 text-white border-brand-900 shadow-md scale-105"
                    : "bg-white text-natural-text border-natural-border hover:border-brand-300 hover:bg-brand-50/50"
                }`}
              >
                <span>{p.mealName}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Pairing Feature Card */}
        <div className="bg-natural-surface/80 rounded-3xl p-6 sm:p-10 border border-natural-border shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Dish Image + Microgreen Overlay */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
              <img
                src={current.image}
                alt={current.mealName}
                className="w-full h-full object-cover animate-scale-in"
                key={current.mealName}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-white/95 text-brand-950 text-xs font-bold shadow-xs">
                  {current.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase tracking-wider text-brand-300 font-bold block mb-0.5">
                  Best Microgreen Garnish
                </span>
                <p className="font-serif text-xl font-bold">
                  {current.recommendedGreens}
                </p>
              </div>
            </div>
          </div>

          {/* Culinary Profile & Quick Add */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>Chef Pairing Notes</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-natural-text">
                {current.mealName}
              </h3>

              <p className="text-xs sm:text-sm font-semibold text-brand-900 bg-brand-50 p-3 rounded-xl border border-brand-200/60">
                🌿 {current.flavorProfile}
              </p>
            </div>

            <p className="text-natural-muted text-sm sm:text-base leading-relaxed">
              {current.culinaryTip}
            </p>

            {/* Paired Product Quick Add Banner */}
            <div className="p-4 rounded-2xl bg-white border border-brand-200/80 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={current.mockProduct.image_url}
                  alt={current.mockProduct.name}
                  className="w-12 h-12 rounded-xl object-cover shadow-xs border border-brand-100 shrink-0"
                />
                <div>
                  <span className="text-xs font-bold text-natural-text block">
                    {current.mockProduct.name} (50g)
                  </span>
                  <span className="text-sm font-extrabold text-brand-900">
                    {formatCurrency(current.mockProduct.price)}
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={handleAddPairing}
                className={added ? "bg-emerald-700" : ""}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 mr-1.5" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-1.5" />
                    <span>Add Paired Greens</span>
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
