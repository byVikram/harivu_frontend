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
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem, setIsCartOpen } = useCart();
  const variants = product.variants || [];

  const defaultVariant =
    variants.find((v) => v.is_default) ||
    variants[0] || {
      id: `${product.id}-default`,
      product_id: product.id,
      name: "50g Pack",
      weight_grams: 50,
      price: product.price,
      is_available: true,
    };

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(defaultVariant);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

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
    <div className="py-10 lg:py-16 bg-natural-warmWhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-natural-muted hover:text-brand-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Microgreens Catalogue</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Product Image Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-natural-surface border border-natural-border shadow-card">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <Badge variant="brand" className="backdrop-blur-md bg-white/90 shadow-sm text-xs py-1 px-3">
                  {product.category}
                </Badge>
                {product.is_featured && (
                  <Badge variant="earth" className="backdrop-blur-md bg-amber-50/90 shadow-sm text-xs py-1 px-3">
                    Featured Harvest
                  </Badge>
                )}
              </div>
            </div>

            {/* Quality Standard Badges */}
            <div className="p-6 rounded-3xl bg-natural-cream/60 border border-natural-border/70 grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Sprout className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-natural-text">Grown Naturally</h4>
                  <p className="text-[11px] text-natural-muted">Non-GMO seeds, zero chemical sprays</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-natural-text">Freshly Harvested</h4>
                  <p className="text-[11px] text-natural-muted">Clipped morning of dispatch</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Droplets className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-natural-text">Clean Hydration</h4>
                  <p className="text-[11px] text-natural-muted">Purified mineral water cultivation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-natural-text">No Processing</h4>
                  <p className="text-[11px] text-natural-muted">Untreated, living raw food</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Ordering Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-natural-text">
                {product.name}
              </h1>
              <p className="text-base text-natural-muted leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Flavor Profile */}
            {product.flavor_profile && (
              <div className="p-4 rounded-2xl bg-brand-50 border border-brand-100/80">
                <span className="text-xs font-bold text-brand-900 uppercase tracking-wider block mb-1">
                  Flavor Profile & Texture
                </span>
                <p className="text-sm text-brand-950 font-medium">
                  {product.flavor_profile}
                </p>
              </div>
            )}

            {/* Pack Size / Variant Selector */}
            {variants.length > 0 && (
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-natural-text">
                  Choose Pack Size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        selectedVariant.id === v.id
                          ? "border-brand-900 bg-brand-50/70 shadow-sm ring-1 ring-brand-900"
                          : "border-natural-border bg-white hover:border-natural-muted"
                      }`}
                    >
                      <span className="block text-xs font-bold text-natural-text">
                        {v.name}
                      </span>
                      <span className="block text-sm font-extrabold text-brand-900 mt-1">
                        {formatCurrency(v.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price & Quantity Selector */}
            <div className="p-6 rounded-3xl bg-white border border-natural-border shadow-subtle space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-natural-muted font-medium block">
                    Selected Pack Price
                  </span>
                  <span className="font-serif text-3xl font-extrabold text-brand-950">
                    {formatCurrency(selectedVariant.price * quantity)}
                  </span>
                </div>

                {/* Quantity controller */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-natural-muted uppercase">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-natural-border rounded-xl bg-natural-surface">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:text-brand-900 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 text-sm font-bold text-natural-text min-w-[28px] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(50, quantity + 1))}
                      className="p-2 hover:text-brand-900 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleAddToCart}
                  className={`w-full ${added ? "border-emerald-600 text-emerald-800 bg-emerald-50" : ""}`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      <span>Added to Basket</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      <span>Add to Basket</span>
                    </>
                  )}
                </Button>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleBookNow}
                  className="w-full shadow-md"
                >
                  <span>Book Order Now</span>
                </Button>
              </div>

              <p className="text-[11px] text-center text-natural-muted">
                🌱 Freshly harvested in Bengaluru. Free delivery on orders above ₹300.
              </p>
            </div>

            {/* Nutrition Highlights */}
            {product.nutrition_highlights && product.nutrition_highlights.length > 0 && (
              <div className="p-5 rounded-2xl bg-natural-surface/60 border border-natural-border/70 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-natural-text">
                  Nutritional Highlights
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.nutrition_highlights.map((item) => (
                    <span
                      key={item}
                      className="text-xs bg-white text-natural-text px-3 py-1 rounded-full border border-natural-border/80 font-medium"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
