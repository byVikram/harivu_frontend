"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { ProductMedia } from "../ui/ProductMedia";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

interface FeaturedGreensProps {
  products: Product[];
}

const LOCAL_PRODUCT_VIDEOS: Record<string, string> = {
  "sunflower-microgreens": "/videos/sunflower.mp4",
  "radish-microgreens": "/videos/radish.mp4",
  "speckled-pea-shoots": "/videos/pea-shoot.mp4",
  "pea-shoots": "/videos/pea-shoot.mp4",
  "purple-radish-microgreens": "/videos/purple-radish.mp4",
  "mustard-microgreens": "/videos/mustard.mp4",
  "red-amaranth-microgreens": "/videos/red-amaranth.mp4",
};

export function FeaturedGreens({ products }: FeaturedGreensProps) {
  // Display initial 4 products
  const displayProducts = products.slice(0, 4);

  return (
    <section className="py-24 lg:py-32 bg-natural-warmWhite border-b border-natural-border/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-900 block">
            Our Living Harvest
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-natural-text leading-tight">
            Meet your greens
          </h2>

          <p className="text-base sm:text-lg text-natural-muted leading-relaxed max-w-2xl font-normal">
            Freshly grown microgreens for everyday meals, made brighter, crunchier and more flavorful.
          </p>
        </div>

        {/* Dynamic Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {displayProducts.map((product) => {
            const videoUrl = product.video_url || LOCAL_PRODUCT_VIDEOS[product.slug] || null;
            const defaultVariant = product.variants?.[0];
            const hasPrice = product.price > 0 || (defaultVariant && defaultVariant.price > 0);
            const price = defaultVariant?.price || product.price;

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group flex flex-col justify-between bg-natural-surface/40 hover:bg-white border border-natural-border hover:border-brand-300 rounded-2xl overflow-hidden transition-all duration-300 shadow-xs hover:shadow-card focus:outline-none focus:ring-2 focus:ring-brand-700"
              >
                {/* Media Container with Dynamic Video/Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-natural-surface">
                  <ProductMedia
                    src={product.image_url}
                    videoSrc={videoUrl}
                    alt={product.name}
                    aspectRatio="aspect-[4/3]"
                    autoPlay={true}
                    onHoverPlayOnly={false}
                  />

                  {/* Availability Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-brand-950 backdrop-blur-md shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{product.is_available ? "Fresh Harvest" : "Growing"}</span>
                    </span>
                  </div>

                  {product.growing_days && (
                    <div className="absolute bottom-3 right-3">
                      <span className="text-[10px] font-medium bg-black/60 text-white backdrop-blur-md px-2 py-0.5 rounded-md">
                        {product.growing_days}d cycle
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Information */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-natural-text group-hover:text-brand-900 transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-natural-muted leading-relaxed line-clamp-2">
                      {product.short_description}
                    </p>
                  </div>

                  {/* Footer & CTA */}
                  <div className="pt-3 border-t border-natural-border/60 flex items-center justify-between text-xs font-bold text-brand-900 group-hover:text-brand-700">
                    <span>
                      {hasPrice ? `From ${formatCurrency(price)}` : "View variety"}
                    </span>
                    <span className="inline-flex items-center gap-1 transition-transform duration-300 group-hover:translate-x-1">
                      <span>Order</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Explore All CTA Button */}
        <div className="mt-16 text-center">
          <Link href="/products">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-white font-bold text-sm transition-all duration-200"
            >
              <span>Explore all greens</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
