"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import {
  MapPin,
  Clock,
  Truck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export function DeliveryEstimator() {
  const [selectedArea, setSelectedArea] = useState("Indiranagar");
  const [customPincode, setCustomPincode] = useState("");
  const [pincodeChecked, setPincodeChecked] = useState(false);

  const areas = [
    { name: "Indiranagar", slot: "7:30 AM – 11:30 AM", hub: "Central Bengaluru Hub", pincode: "560038" },
    { name: "Koramangala", slot: "8:00 AM – 12:00 PM", hub: "South Hub", pincode: "560034" },
    { name: "HSR Layout", slot: "8:30 AM – 12:30 PM", hub: "South Hub", pincode: "560102" },
    { name: "Whitefield", slot: "9:00 AM – 1:00 PM", hub: "East Hub", pincode: "560066" },
    { name: "JP Nagar", slot: "8:30 AM – 12:30 PM", hub: "South Hub", pincode: "560078" },
    { name: "Malleshwaram", slot: "8:00 AM – 12:00 PM", hub: "North-West Hub", pincode: "560003" },
    { name: "Sadashivanagar", slot: "7:30 AM – 11:30 AM", hub: "Central Hub", pincode: "560080" },
    { name: "Bellandur / ORR", slot: "9:00 AM – 1:00 PM", hub: "East Hub", pincode: "560103" },
  ];

  const currentArea = areas.find((a) => a.name === selectedArea) || areas[0];

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPincode.trim().length >= 3) {
      setPincodeChecked(true);
    }
  };

  return (
    <section className="py-20 bg-brand-950 text-white relative overflow-hidden">
      {/* Botanical ambient circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-800/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-900/40 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Description */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-900 text-brand-300 text-xs font-semibold border border-brand-800 tracking-wide uppercase">
              <Truck className="w-3.5 h-3.5 text-brand-400" />
              <span>Bengaluru Fresh Delivery Radar</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Harvested at 6:00 AM. On Your Table by Lunch.
            </h2>

            <p className="text-brand-200/80 text-sm sm:text-base leading-relaxed">
              We never store harvested microgreens in warehouses. Each tray is clipped to order in morning cycles and delivered directly across Bengaluru in temperature-insulated packaging.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-brand-100">
                  <strong>Free Express Delivery</strong> on all orders above ₹300
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-brand-100">
                  <strong>Live SMS / WhatsApp Updates</strong> with order tracker
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-brand-100">
                  <strong>Zero Preservatives</strong> • 100% natural pure harvest
                </span>
              </div>
            </div>
          </div>

          {/* Right Interactive Area & Pincode Checker Card */}
          <div className="lg:col-span-6">
            <div className="bg-brand-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-brand-800/80 shadow-elevated space-y-6">
              <div>
                <span className="text-xs font-bold text-brand-300 uppercase tracking-wider block mb-2">
                  Select Your Bengaluru Neighborhood:
                </span>
                <div className="flex flex-wrap gap-2">
                  {areas.map((a) => (
                    <button
                      key={a.name}
                      type="button"
                      onClick={() => {
                        setSelectedArea(a.name);
                        setPincodeChecked(false);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                        selectedArea === a.name
                          ? "bg-brand-400 text-brand-950 border-brand-300 font-bold shadow-xs scale-105"
                          : "bg-brand-950/60 text-brand-200 border-brand-800 hover:border-brand-700"
                      }`}
                    >
                      {a.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area Result Callout */}
              <div className="p-5 rounded-2xl bg-brand-950 border border-brand-800 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-brand-400 shrink-0" />
                    <div>
                      <h4 className="font-serif text-lg font-bold text-white">
                        {currentArea.name} ({currentArea.pincode})
                      </h4>
                      <p className="text-[11px] text-brand-300">
                        Routed via {currentArea.hub}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-300 text-[11px] font-bold border border-brand-500/30">
                    Active Delivery Zone
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-brand-900 text-left">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-brand-300/80 block">
                      Next Harvest Window
                    </span>
                    <span className="text-xs font-bold text-white block">
                      Tomorrow, 6:00 AM
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-semibold text-brand-300/80 block">
                      Estimated Doorstep Time
                    </span>
                    <span className="text-xs font-bold text-brand-300 block">
                      {currentArea.slot}
                    </span>
                  </div>
                </div>
              </div>

              {/* Custom Pincode Search */}
              <form onSubmit={handlePincodeSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Bengaluru Pincode..."
                    value={customPincode}
                    onChange={(e) => setCustomPincode(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-brand-950 border border-brand-800 text-white placeholder-brand-400/60 text-xs focus:outline-none focus:border-brand-400"
                  />
                  <Button type="submit" variant="secondary" size="sm" className="text-xs px-4">
                    Check Pincode
                  </Button>
                </div>

                {pincodeChecked && (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 flex items-center gap-2 animate-scale-in">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Pincode {customPincode} is serviceable for morning clipped deliveries!</span>
                  </div>
                )}
              </form>

              <div className="pt-2 text-center">
                <Link href="/products">
                  <Button variant="primary" size="lg" className="w-full bg-brand-400 text-brand-950 hover:bg-brand-300 font-bold">
                    <span>Order for Tomorrow Morning Harvest</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
