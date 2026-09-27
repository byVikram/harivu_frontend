"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/lib/types";
import { fetchProducts } from "@/lib/api";
import { ProductCard } from "@/components/products/ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { Search, Sparkles, Filter } from "lucide-react";

const CATEGORIES = [
  "All",
  "Spicy & Peppery",
  "Nutty & Crunchy",
  "Sweet & Tender",
  "Mild & Nutritious",
  "Earthy & Vibrant",
  "Zesty & Bold",
  "Balanced Mix",
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (e) {
        console.error("Failed to load products catalogue", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.flavor_profile?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 lg:py-16 bg-natural-warmWhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-900 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
            <Sparkles className="w-3.5 h-3.5 text-brand-700" />
            <span>Living Produce Catalogue</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-natural-text">
            Our Fresh Microgreens
          </h1>
          <p className="text-sm sm:text-base text-natural-muted leading-relaxed">
            All microgreens are grown from seed in controlled natural cycles and harvested fresh on demand. Select your preferred pack sizes below.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mb-10 space-y-4">
          {/* Search Box */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-natural-muted" />
            <input
              type="text"
              placeholder="Search by variety (e.g. Radish, Sunflower, Pea)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-natural-border bg-white text-sm text-natural-text focus:outline-none focus:border-brand-900 focus:ring-1 focus:ring-brand-900 shadow-subtle placeholder:text-natural-muted/60"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-4 py-2 rounded-full whitespace-nowrap border transition-all font-medium ${
                  selectedCategory === cat
                    ? "bg-brand-900 text-white border-brand-900 shadow-sm"
                    : "bg-white text-natural-muted border-natural-border hover:border-brand-800 hover:text-natural-text"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Catalogue Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="rounded-3xl border border-natural-border p-5 space-y-4 bg-white"
              >
                <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
                <Skeleton className="h-6 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-2/3 rounded-lg" />
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-6 w-20 rounded-lg" />
                  <Skeleton className="h-9 w-24 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3 bg-natural-surface/50 rounded-3xl border border-dashed border-natural-border p-8 max-w-md mx-auto">
            <p className="font-serif text-lg font-bold text-natural-text">
              Fresh harvests are being prepared.
            </p>
            <p className="text-xs text-natural-muted">
              No matching varieties found for &ldquo;{searchQuery || selectedCategory}&rdquo;. Try another search term or check back soon.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-xs font-semibold text-brand-900 underline mt-2"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
