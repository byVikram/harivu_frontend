import React from "react";
import { Hero } from "@/components/home/Hero";
import { GrowthTimeline } from "@/components/home/GrowthTimeline";
import { WhyHarivu } from "@/components/home/WhyHarivu";
import { DeliveryEstimator } from "@/components/home/DeliveryEstimator";
import { CtaBanner } from "@/components/home/CtaBanner";

export const revalidate = 60;

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <GrowthTimeline />
      <WhyHarivu />
      <DeliveryEstimator />
      <CtaBanner />
    </div>
  );
}
