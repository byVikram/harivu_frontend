import React from "react";
import { fetchProducts } from "@/lib/api";
import { Hero } from "@/components/home/Hero";
import { FlavorMatrix } from "@/components/home/FlavorMatrix";
import { GrowthTimeline } from "@/components/home/GrowthTimeline";
import { CulinaryPairing } from "@/components/home/CulinaryPairing";
import { WhyHarivu } from "@/components/home/WhyHarivu";
import { DeliveryEstimator } from "@/components/home/DeliveryEstimator";
import { CtaBanner } from "@/components/home/CtaBanner";

export const revalidate = 60;

export default async function HomePage() {
  const allProducts = await fetchProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FlavorMatrix products={allProducts} />
      <GrowthTimeline />
      <CulinaryPairing />
      <WhyHarivu />
      <DeliveryEstimator />
      <CtaBanner />
    </div>
  );
}
