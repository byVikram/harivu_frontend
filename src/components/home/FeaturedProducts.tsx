"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { ProductCard } from "../products/ProductCard";
import { Button } from "../ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const displayProducts = products.slice(0, 6);

  return (
    <section className="py-16 lg:py-24 bg-natural-warmWhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-900 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
              <Sparkles className="w-3.5 h-3.5 text-brand-700" />
              <span>Current Harvest Varieties</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-natural-text tracking-tight">
              Featured Fresh Microgreens
            </h2>
            <p className="text-sm sm:text-base text-natural-muted max-w-xl">
              Harvested in peak vitality and crispness. Choose your favorite pack sizes and add fresh vibrancy to your meals.
            </p>
          </div>

          <Link href="/products" className="shrink-0">
            <Button variant="outline" size="md">
              <span>View Full Catalogue</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
