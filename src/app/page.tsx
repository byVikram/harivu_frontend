import React from "react";
import { fetchProducts } from "@/lib/api";
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyHarivu } from "@/components/home/WhyHarivu";
import { HowItWorksPreview } from "@/components/home/HowItWorksPreview";
import { FreshnessBanner } from "@/components/home/FreshnessBanner";
import { CtaBanner } from "@/components/home/CtaBanner";

export const revalidate = 60;

export default async function HomePage() {
  const products = await fetchProducts({ featuredOnly: true });

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedProducts products={products} />
      <WhyHarivu />
      <HowItWorksPreview />
      <FreshnessBanner />
      <CtaBanner />
    </div>
  );
}
