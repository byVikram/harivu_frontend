"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product, ProductVariant } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Plus,
  Minus,
  Check,
  Clock,
  Droplets,
  Sprout,
  ShieldCheck,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Heart,
  Zap,
  Leaf,
  Activity,
  Award,
  Utensils,
  Truck,
  CheckCircle2,
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
}

const BENEFIT_ICONS = [Zap, ShieldCheck, Activity, Heart, Leaf, Sparkles];

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem, setIsCartOpen } = useCart();
  const variants = product.variants || [];

  const defaultVariant =
    variants.find((v) => v.is_default) ||
    variants[0] || {
      id: `${product.id}-default`,
      product_id: product.id,
      name: "50g Regular Pack",
      weight_grams: 50,
      price: product.price,
      is_available: true,
    };

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(defaultVariant);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeMedia, setActiveMedia] = useState<"video" | "image">("video");

  const videoSrc = product.video_url || product.media_files?.[0]?.url || (product as any).mediaFiles?.[0]?.url || null;

  // 1. Read benefits array directly from API
  const benefitsList = product.benefits && product.benefits.length > 0
    ? product.benefits
    : [
        "Rich in essential vitamins and living antioxidants",
        "Contains clean plant-based nutrients",
        "Supports natural immune resilience",
        "Good source of living dietary fiber",
        "Helps promote overall daily wellness"
      ];

  // 2. Read culinary uses array directly from API
  const usesList = product.uses && product.uses.length > 0
    ? product.uses
    : [
        "Add to fresh salads for extra crunch",
        "Use in sandwiches, burgers, and wraps",
        "Blend into morning wellness smoothies",
        "Garnish soups, curries, and warm grain bowls",
        "Mix into pasta, noodle dishes, and stir-fries"
      ];

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBookNow = () => {
    addItem(product, selectedVariant, quantity);
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="py-8 lg:py-14 bg-natural-warmWhite min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Back Link */}
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-natural-muted hover:text-brand-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Microgreens</span>
          </Link>
        </div>

        {/* Main Product Stage: Media & Purchase Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Media Stage & Farm Standards */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-natural-surface border border-natural-border/80 shadow-md group">
              {videoSrc && activeMedia === "video" ? (
                <video
                  src={videoSrc}
                  poster={product.image_url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}

              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <Badge variant="brand" className="backdrop-blur-md bg-white/95 shadow-xs text-xs font-bold py-1 px-3">
                  {product.category}
                </Badge>
                {product.is_featured && (
                  <Badge variant="earth" className="backdrop-blur-md bg-amber-50/95 shadow-xs text-xs font-bold py-1 px-3">
                    Featured Harvest
                  </Badge>
                )}
              </div>

              {/* Media Toggle Switch if video is available */}
              {videoSrc && (
                <div className="absolute bottom-3 right-3 flex items-center bg-black/60 backdrop-blur-md rounded-lg p-1 text-[11px] font-semibold text-white">
                  <button
                    type="button"
                    onClick={() => setActiveMedia("video")}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeMedia === "video" ? "bg-white text-brand-950 font-bold" : "text-white/80 hover:text-white"
                    }`}
                  >
                    Living Video
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMedia("image")}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeMedia === "image" ? "bg-white text-brand-950 font-bold" : "text-white/80 hover:text-white"
                    }`}
                  >
                    Photo
                  </button>
                </div>
              )}
            </div>

            {/* Quality Standard Bar */}
            <div className="p-4 rounded-xl bg-natural-surface/60 border border-natural-border grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5">
                <Sprout className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-natural-text">100% Non-GMO</h4>
                  <p className="text-[11px] text-natural-muted">Untreated clean seeds</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-natural-text">6:00 AM Harvest</h4>
                  <p className="text-[11px] text-natural-muted">Clipped morning of dispatch</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Droplets className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-natural-text">Pure RO Fed</h4>
                  <p className="text-[11px] text-natural-muted">Zero chemical fertilizers</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-natural-text">Raw & Living</h4>
                  <p className="text-[11px] text-natural-muted">Active natural enzymes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Pack Selector & Cart Action */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-brand-800 bg-brand-50 px-2.5 py-0.5 rounded-lg border border-brand-200/60">
                  ⏱️ {product.growing_days || 10} Days Growth
                </span>
                <span className="text-xs text-natural-muted">
                  • Bengaluru Sunrise Harvest
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-natural-text leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-natural-muted leading-relaxed">
                {product.description || product.short_description}
              </p>
            </div>

            {/* Price & Variant Selection Box */}
            <div className="p-5 rounded-2xl bg-natural-surface/80 border border-natural-border/90 space-y-4 shadow-xs">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-brand-900 font-serif">
                    {formatCurrency(selectedVariant.price)}
                  </span>
                  <span className="text-xs text-natural-muted ml-1.5 font-normal">
                    / {selectedVariant.weight_grams}g ({product.unit || "pack"})
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  In Stock & Ready
                </span>
              </div>

              {/* Variant Selector Tabs */}
              {variants.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-natural-text uppercase tracking-wider block">
                    Select Harvest Pack Size
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all border text-center ${
                          selectedVariant.id === v.id
                            ? "bg-brand-900 text-white border-brand-900 shadow-sm ring-2 ring-brand-700/20"
                            : "bg-white text-natural-text border-natural-border hover:border-brand-300"
                        }`}
                      >
                        <div className="truncate">{v.name}</div>
                        <div className="text-[11px] font-medium opacity-90 mt-0.5">
                          {formatCurrency(v.price)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-natural-muted">
                  Quantity:
                </span>
                <div className="flex items-center border border-natural-border rounded-xl bg-white shadow-inner">
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

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleAddToCart}
                  className={`w-full text-xs py-2.5 rounded-xl ${
                    added ? "border-emerald-600 text-emerald-800 bg-emerald-50" : ""
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1.5" />
                      <span>Added to Basket</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
                      <span>Add to Basket</span>
                    </>
                  )}
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleBookNow}
                  className="w-full text-xs py-2.5 rounded-xl shadow-md"
                >
                  <span>Book Order Now</span>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-natural-muted pt-1">
                <Truck className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                <span>Harvested at 6 AM. Free Bengaluru delivery above ₹300.</span>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* API-DRIVEN HEALTH & WELLNESS BENEFITS SECTION                     */}
        {/* ----------------------------------------------------------------- */}
        <div className="mt-14 pt-10 border-t border-natural-border/80 space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Living Nutrient Profile</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-natural-text">
              Health & Wellness Benefits
            </h2>

            <p className="text-xs sm:text-sm text-natural-muted max-w-2xl leading-relaxed">
              {product.name} are harvested at peak cellular expansion when micronutrient concentrations are highest.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefitsList.map((benefit, idx) => {
              const Icon = BENEFIT_ICONS[idx % BENEFIT_ICONS.length];
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white border border-natural-border shadow-xs hover:shadow-card hover:border-brand-300 transition-all flex items-start gap-3.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-800 shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-brand-800" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-natural-text">
                      {benefit}
                    </h3>
                    <p className="text-xs text-natural-muted mt-1 leading-relaxed">
                      Naturally bioavailable nutrients for daily wellness and vitality.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* API-DRIVEN CULINARY USES SECTION                                  */}
          {/* ----------------------------------------------------------------- */}
          <div className="p-6 sm:p-8 rounded-2xl bg-brand-50/70 border border-brand-200/70 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-900">
              <Utensils className="w-4 h-4 text-brand-700" />
              <span>Everyday Culinary Uses & Meal Ideas</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-natural-text">
              How to enjoy {product.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {usesList.map((use, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3.5 rounded-xl bg-white/90 border border-brand-100 shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-brand-950">
                    {use}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
