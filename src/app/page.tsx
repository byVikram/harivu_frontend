import React from "react";
import { fetchProducts } from "@/lib/api";
import { Hero } from "@/components/home/Hero";
import { FreshnessStatement } from "@/components/home/FreshnessStatement";
import { FeaturedGreens } from "@/components/home/FeaturedGreens";
import { SeedToHarvest } from "@/components/home/SeedToHarvest";
import { WhyHarivu } from "@/components/home/WhyHarivu";
import { FoodLifestyle } from "@/components/home/FoodLifestyle";
import { BrandStory } from "@/components/home/BrandStory";
import { FinalCta } from "@/components/home/FinalCta";

export const revalidate = 60;

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <div className="flex flex-col min-h-screen bg-natural-warmWhite text-natural-text antialiased selection:bg-brand-100 selection:text-brand-900">
      {/* 2. Hero */}
      <Hero />

      {/* 3. Freshness Statement */}
      <FreshnessStatement />

      {/* 4 & 5. Featured Greens & Product Visual Stage */}
      <FeaturedGreens products={products} />

      {/* 6. From Seed to Harvest (5 steps) */}
      <SeedToHarvest />

      {/* 7. Why Harivu (4 core pillars) */}
      <WhyHarivu />

      {/* 8. Food / Lifestyle Integration */}
      <FoodLifestyle />

      {/* 9. Brand Story */}
      <BrandStory />

      {/* 10. Final Call to Action */}
      <FinalCta />
    </div>
  );
}

