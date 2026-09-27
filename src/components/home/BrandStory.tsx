import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BrandStory() {
  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-natural-warmWhite text-natural-text border-b border-natural-border/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-900 block">
          About Harivu
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-natural-text leading-[1.15] tracking-tight max-w-3xl">
          We believe fresh food should feel close to home.
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-natural-muted leading-relaxed max-w-3xl font-normal">
          Harivu grows microgreens from seed to harvest with a simple goal — to make fresh, vibrant greens a natural part of everyday meals.
        </p>

        <div className="pt-4">
          <Link href="/about" className="inline-flex items-center gap-2 text-brand-900 hover:text-brand-700 font-bold text-base transition-colors group">
            <span>Our story</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
