import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="py-24 sm:py-32 lg:py-36 bg-[#14532D] text-white relative overflow-hidden">
      {/* Subtle organic ambient background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-950/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          Ready for a fresher plate?
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-brand-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
          Explore our fresh microgreens and find your next favorite green.
        </p>

        <div className="pt-4 flex justify-center">
          <Link href="/products">
            <button
              type="button"
              className="px-9 py-4 rounded-xl bg-white hover:bg-natural-cream text-brand-950 font-extrabold text-base shadow-xl transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>Order Fresh Microgreens</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
