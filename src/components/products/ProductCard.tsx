"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product, ProductVariant } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Plus, Check, Clock, Sparkles, ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const variants = product.variants || [];
  const defaultVariant = variants.find((v) => v.is_default) || variants[0] || {
    id: `${product.id}-default`,
    product_id: product.id,
    name: "50g Regular Pack",
    weight_grams: 50,
    price: product.price,
    is_available: true,
  };

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(defaultVariant);
  const [justAdded, setJustAdded] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) {
      return;
    }
    router.push(`/products/${product.slug}`);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedVariant, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const videoSrc =
    product.video_url ||
    product.media_files?.[0]?.url ||
    (product as any).mediaFiles?.[0]?.url ||
    null;

  return (
    <div
      onClick={handleCardClick}
      className="group flex flex-col rounded-3xl bg-white border border-natural-border/80 shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden hover:border-brand-400 cursor-pointer"
    >
      {/* Product Living Media Banner */}
      <div className="relative block aspect-[16/11] overflow-hidden bg-natural-surface">
        {videoSrc ? (
          <video
            src={videoSrc}
            poster={product.image_url}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            aria-label={product.name}
          />
        ) : (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity pointer-events-none" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
          <Badge variant="brand" className="backdrop-blur-md bg-white/95 shadow-xs font-bold text-[11px]">
            {product.category}
          </Badge>
          {product.is_featured && (
            <Badge variant="earth" className="backdrop-blur-md bg-amber-50/95 shadow-xs font-bold text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-700" />
              <span>Harvest Pick</span>
            </Badge>
          )}
        </div>

        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-black/60 text-white backdrop-blur-md px-2.5 py-1 rounded-full">
            <Clock className="w-3 h-3 text-brand-300" />
            <span>{product.growing_days || 10} Days Growth</span>
          </span>
        </div>
      </div>

      {/* Content Details */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <h3 className="font-serif text-xl font-bold text-natural-text group-hover:text-brand-900 transition-colors leading-snug flex items-center justify-between">
            <span>{product.name}</span>
            <ArrowRight className="w-4 h-4 text-natural-muted group-hover:text-brand-700 group-hover:translate-x-1 transition-all" />
          </h3>
          
          <p className="text-xs text-natural-muted leading-relaxed line-clamp-2">
            {product.short_description}
          </p>

          {/* Flavor Profile Callout */}
          {product.flavor_profile && (
            <div className="text-[11px] text-brand-950 bg-brand-50/80 px-2.5 py-1.5 rounded-xl border border-brand-100/70 font-medium">
              🌿 {product.flavor_profile}
            </div>
          )}
        </div>

        {/* Pack Size Selector Pills */}
        {variants.length > 1 && (
          <div className="space-y-1 pt-1" onClick={(e) => e.stopPropagation()}>
            <span className="text-[10px] uppercase font-bold text-natural-muted tracking-wider block">
              Select Pack Size:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVariant(v);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-xl border transition-all ${
                    selectedVariant.id === v.id
                      ? "bg-brand-900 text-white border-brand-900 font-bold shadow-xs scale-105"
                      : "bg-natural-surface text-natural-muted border-natural-border hover:border-brand-700 hover:text-natural-text"
                  }`}
                >
                  {v.weight_grams}g ({formatCurrency(v.price)})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-natural-border/70 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-natural-muted block">
              {selectedVariant.weight_grams || 50}g Pack
            </span>
            <span className="font-serif text-xl font-extrabold text-brand-950">
              {formatCurrency(selectedVariant.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/products/${product.slug}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Button variant="outline" size="sm" className="hidden sm:inline-flex text-xs py-1.5 px-3">
                View Details
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={handleQuickAdd}
              className={`text-xs py-1.5 px-3.5 shadow-xs ${justAdded ? "bg-emerald-700" : ""}`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  <span>Add</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

