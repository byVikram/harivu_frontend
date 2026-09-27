import React from "react";
import Link from "next/link";
import { Leaf, Clock, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";

export function FreshnessBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-brand-950 via-brand-900 to-emerald-950 text-natural-warmWhite relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-brand-800/80 text-brand-200 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-brand-700">
              <Sparkles className="w-3.5 h-3.5 text-brand-300" />
              <span>Harvested On Demand</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Microgreens are Living Food, Not Mass-Produced Packaged Goods.
            </h2>
            <p className="text-brand-100/85 text-sm sm:text-base leading-relaxed max-w-2xl">
              When microgreens sit in cold warehouse chains for days, they lose cellular turgor, delicate vitamins, and aromatic punch. At Harivu, we schedule harvests specifically for our registered orders so you receive maximum vibrancy within hours of clipping.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-brand-300 font-bold text-sm">
                <Clock className="w-4 h-4" />
                <span>Morning Harvest Routine</span>
              </div>
              <p className="text-xs text-brand-100/70 leading-relaxed">
                Clipped at dawn when plant moisture and nutrient absorption are at their diurnal peak.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-brand-300 font-bold text-sm">
                <Leaf className="w-4 h-4" />
                <span>Zero Unnecessary Processing</span>
              </div>
              <p className="text-xs text-brand-100/70 leading-relaxed">
                No chemical washes, synthetic preservatives, or artificial shelf-life extenders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
