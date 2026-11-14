"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/lib/types";
import { fetchProducts } from "@/lib/api";
import { fetchOfficeInventory, OfficeInventoryItem } from "@/lib/adminApi";
import { ProductCard } from "@/components/products/ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { Dropdown } from "@/components/ui/Dropdown";
import { Search, Sparkles, Filter, Boxes, Tag, MapPin, ArrowUpDown, Sprout, Check } from "lucide-react";

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
  const [supplies, setSupplies] = useState<OfficeInventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [catalogueTab, setCatalogueTab] = useState<"microgreens" | "supplies">("microgreens");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("default");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [prodData, officeData] = await Promise.all([
          fetchProducts(),
          fetchOfficeInventory(),
        ]);
        setProducts(prodData || []);
        setSupplies(officeData.items || []);
      } catch (e) {
        console.error("Failed to load catalogue data", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Filter Microgreens
  let filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.short_description.toLowerCase().includes(q) ||
      p.flavor_profile?.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  // Sort Microgreens
  if (sortBy === "stock-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.stock_quantity ?? 50) - (a.stock_quantity ?? 50));
  } else if (sortBy === "stock-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => (a.stock_quantity ?? 50) - (b.stock_quantity ?? 50));
  } else if (sortBy === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  // Filter Supplies
  const filteredSupplies = supplies.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
    const matchesSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      (s.location && s.location.toLowerCase().includes(q)) ||
      (s.notes && s.notes.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const sortOptions = [
    { value: "default", label: "Default Order", icon: <ArrowUpDown className="w-3.5 h-3.5" /> },
    { value: "stock-desc", label: "Highest In Stock", icon: <Boxes className="w-3.5 h-3.5 text-emerald-700" /> },
    { value: "stock-asc", label: "Lowest In Stock", icon: <Boxes className="w-3.5 h-3.5 text-amber-700" /> },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  return (
    <div className="py-10 lg:py-16 bg-natural-warmWhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-900 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
            <Sparkles className="w-3.5 h-3.5 text-brand-700" />
            <span>Living Produce & Supplies Catalogue</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-natural-text">
            Fresh Harvests & Supplies Catalogue
          </h1>
          <p className="text-sm sm:text-base text-natural-muted leading-relaxed">
            Naturally grown living microgreens and farm-grade workspace supplies. Check live available stock count and images below.
          </p>

          {/* Catalogue Segment Switcher */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex items-center bg-white p-1.5 rounded-2xl border border-natural-border shadow-xs">
              <button
                type="button"
                onClick={() => {
                  setCatalogueTab("microgreens");
                  setSelectedCategory("All");
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  catalogueTab === "microgreens"
                    ? "bg-brand-900 text-white shadow-xs"
                    : "text-natural-muted hover:text-natural-text"
                }`}
              >
                <Sprout className="w-4 h-4" />
                <span>Living Microgreens ({products.length})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCatalogueTab("supplies");
                  setSelectedCategory("All");
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  catalogueTab === "supplies"
                    ? "bg-indigo-900 text-white shadow-xs"
                    : "text-natural-muted hover:text-natural-text"
                }`}
              >
                <Boxes className="w-4 h-4" />
                <span>Farm & Supplies Equipment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            {/* Search Box */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-natural-muted" />
              <input
                type="text"
                placeholder={
                  catalogueTab === "microgreens"
                    ? "Search by variety (Radish, Sunflower, Pea)..."
                    : "Search supplies (Crates, Trays, Chairs, Scale)..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-natural-border bg-white text-xs sm:text-sm text-natural-text focus:outline-none focus:border-brand-900 focus:ring-1 focus:ring-brand-900 shadow-subtle placeholder:text-natural-muted/60"
              />
            </div>

            {/* Sort Dropdown Component */}
            {catalogueTab === "microgreens" && (
              <div className="w-full sm:w-60 shrink-0">
                <Dropdown
                  value={sortBy}
                  onChange={setSortBy}
                  options={sortOptions}
                  size="sm"
                  buttonClassName="rounded-full shadow-subtle"
                />
              </div>
            )}
          </div>

          {/* Category Chips with Counts */}
          {catalogueTab === "microgreens" ? (
            <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const count = cat === "All" ? products.length : products.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap border transition-all font-medium flex items-center gap-1.5 ${
                      selectedCategory === cat
                        ? "bg-brand-900 text-white border-brand-900 shadow-sm font-bold"
                        : "bg-white text-natural-muted border-natural-border hover:border-brand-800 hover:text-natural-text"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        selectedCategory === cat ? "bg-white/20 text-white" : "bg-natural-surface text-natural-muted"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className={`text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap border transition-all font-medium flex items-center gap-1.5 ${
                  selectedCategory === "All"
                    ? "bg-indigo-950 text-white border-indigo-950 shadow-sm font-bold"
                    : "bg-white text-natural-muted border-natural-border hover:border-indigo-800 hover:text-natural-text"
                }`}
              >
                <span>All Categories</span>
              </button>

              {Array.from(new Set(supplies.map((s) => s.category))).map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap border transition-all font-medium flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-indigo-800 text-white border-indigo-800 shadow-sm font-bold"
                        : "bg-white text-natural-muted border-natural-border hover:border-indigo-800 hover:text-natural-text"
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* TAB 1: MICROGREENS LIVING PRODUCE GRID */}
        {/* ========================================================= */}
        {catalogueTab === "microgreens" && (
          <>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="rounded-3xl border border-natural-border p-5 space-y-4 bg-white">
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
                  No matching varieties found for &ldquo;{searchQuery || selectedCategory}&rdquo;.
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
          </>
        )}

        {/* ========================================================= */}
        {/* TAB 2: FARM & WORKSPACE SUPPLIES / EQUIPMENT GRID */}
        {/* ========================================================= */}
        {catalogueTab === "supplies" && (
          <>
            {filteredSupplies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredSupplies.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col rounded-3xl bg-white border border-natural-border shadow-card hover:shadow-elevated transition-all overflow-hidden space-y-4"
                  >
                    {/* Item Image with Count Badge */}
                    <div className="relative aspect-[16/10] bg-natural-surface overflow-hidden">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-indigo-50/70 text-indigo-700 space-y-2">
                          <Boxes className="w-10 h-10" />
                          <span className="text-xs font-bold text-indigo-900">{item.category}</span>
                        </div>
                      )}

                      <div className="absolute top-3 left-3">
                        <span className="text-[11px] font-bold text-indigo-950 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs border border-indigo-200">
                          {item.category}
                        </span>
                      </div>

                      {/* Prominent Live Available Count Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full bg-brand-950/90 text-white backdrop-blur-md border border-white/20 shadow-xs">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{item.quantity} {item.unit} in stock</span>
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 pt-0 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        {item.location && (
                          <div className="flex items-center text-xs">
                            <span className="text-[11px] text-natural-muted font-medium">
                              {item.location}
                            </span>
                          </div>
                        )}

                        <h3 className="font-serif text-lg font-bold text-natural-text leading-snug">
                          {item.name}
                        </h3>

                        {item.notes && (
                          <p className="text-xs text-natural-muted leading-relaxed line-clamp-2">
                            {item.notes}
                          </p>
                        )}
                      </div>

                      {/* Stock Details Footer */}
                      <div className="pt-3 border-t border-natural-border flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-natural-muted block">
                            Available Inventory
                          </span>
                          <span className="font-serif text-xl font-extrabold text-brand-950">
                            {item.quantity}{" "}
                            <span className="text-xs font-semibold text-natural-muted">
                              {item.unit}
                            </span>
                          </span>
                        </div>

                        <span className="text-xs font-bold text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-200">
                          Verified Asset
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 space-y-3 bg-natural-surface/50 rounded-3xl border border-dashed border-natural-border p-8 max-w-md mx-auto">
                <p className="font-serif text-lg font-bold text-natural-text">
                  No supplies found
                </p>
                <p className="text-xs text-natural-muted">
                  No equipment matching &ldquo;{searchQuery || selectedCategory}&rdquo;.
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
          </>
        )}
      </div>
    </div>
  );
}
