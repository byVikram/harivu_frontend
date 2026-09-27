"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { trackOrderApi } from "@/lib/api";
import { Order, OrderStatus } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Sprout,
  PackageCheck,
  Calendar,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

const STAGES: { key: OrderStatus; label: string; desc: string }[] = [
  { key: "pending", label: "Order Received", desc: "Booking logged in queue" },
  { key: "confirmed", label: "Confirmed", desc: "Availability verified" },
  { key: "preparing", label: "Preparing", desc: "Inspection & scheduled" },
  { key: "harvested", label: "Harvested", desc: "Freshly clipped at dawn" },
  { key: "out_for_delivery", label: "Out for Delivery", desc: "With local courier" },
  { key: "delivered", label: "Delivered", desc: "Delivered to table" },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderNumber = searchParams.get("orderNumber") || "";

  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      setError("Please enter your Order Number (e.g. HAR-20260927-XXXX)");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your registered mobile number for verification");
      return;
    }

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const res = await trackOrderApi(orderNumber.trim(), phone.trim());
      if (res.success && res.order) {
        setOrder(res.order);
      } else {
        setError(res.error || "Order not found. Please double-check your order number and mobile number.");
      }
    } catch {
      setError("Could not retrieve tracking details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStageIndex = (status: OrderStatus) => {
    const idx = STAGES.findIndex((s) => s.key === status);
    return idx === -1 ? 0 : idx;
  };

  const currentStageIndex = order ? getStageIndex(order.status) : 0;

  return (
    <div className="py-10 lg:py-16 bg-natural-warmWhite min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-900 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
            Live Order Tracking
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-natural-text">
            Track Your Fresh Harvest
          </h1>
          <p className="text-sm text-natural-muted">
            Enter your order reference number and registered phone number to view live progress from clipping to delivery.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-natural-border shadow-subtle mb-10">
          <form onSubmit={handleTrack} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
            <div className="sm:col-span-6">
              <Input
                label="Order Number"
                required
                placeholder="e.g. HAR-20260927-4821"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>

            <div className="sm:col-span-4">
              <Input
                label="Registered Mobile Number"
                required
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={loading}
                className="w-full h-[42px]"
              >
                <span>Track</span>
              </Button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2.5 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Order Details & Progress Display */}
        {order && (
          <div className="space-y-8 animate-scale-in">
            {/* Stage Timeline */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-natural-border shadow-card space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-natural-border/70 gap-2">
                <div>
                  <span className="text-xs uppercase font-bold text-natural-muted block">
                    Order Reference
                  </span>
                  <span className="font-mono text-xl font-bold text-brand-950">
                    {order.order_number}
                  </span>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs uppercase font-bold text-natural-muted block">
                    Current Status
                  </span>
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-900 bg-brand-100 px-3 py-1 rounded-full border border-brand-200">
                    {order.status.replace(/_/g, " ")}
                  </span>
                </div>
              </div>

              {/* Visual Progress Stepper */}
              <div className="relative pt-4 pb-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {STAGES.map((stg, idx) => {
                    const isPassed = idx <= currentStageIndex;
                    const isCurrent = idx === currentStageIndex;

                    return (
                      <div
                        key={stg.key}
                        className={`p-3.5 rounded-2xl border text-center transition-all ${
                          isCurrent
                            ? "border-brand-900 bg-brand-50 shadow-sm ring-1 ring-brand-900"
                            : isPassed
                            ? "border-emerald-200 bg-emerald-50/50 text-emerald-950"
                            : "border-natural-border/60 bg-natural-surface/40 text-natural-muted opacity-60"
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full mx-auto mb-2 flex items-center justify-center text-xs font-bold ${
                            isCurrent
                              ? "bg-brand-900 text-white"
                              : isPassed
                              ? "bg-emerald-600 text-white"
                              : "bg-natural-border text-natural-muted"
                          }`}
                        >
                          {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <p className="text-xs font-bold text-natural-text leading-tight mb-1">
                          {stg.label}
                        </p>
                        <p className="text-[10px] text-natural-muted">
                          {stg.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Items & Customer Receipt Summary */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Items Card */}
              <div className="md:col-span-7 p-6 rounded-3xl bg-white border border-natural-border shadow-subtle space-y-4">
                <h3 className="font-serif text-base font-bold text-natural-text border-b border-natural-border/70 pb-3">
                  Harvest Items
                </h3>

                <div className="space-y-3 divide-y divide-natural-border/60">
                  {order.items?.map((item, i) => (
                    <div key={i} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-natural-text">{item.product_name}</p>
                        <p className="text-natural-muted">
                          {item.variant_name} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-bold text-brand-950">
                        {formatCurrency(item.total_price)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-natural-border space-y-1.5 text-xs">
                  <div className="flex justify-between text-natural-muted">
                    <span>Subtotal</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-natural-muted">
                    <span>Delivery Charge</span>
                    <span>{order.delivery_charge === 0 ? "FREE" : formatCurrency(order.delivery_charge)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-natural-text pt-2 border-t border-natural-border">
                    <span>Total</span>
                    <span className="text-brand-950 font-serif text-base">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Info Card */}
              <div className="md:col-span-5 p-6 rounded-3xl bg-natural-cream/80 border border-natural-border/80 space-y-4">
                <h3 className="font-serif text-base font-bold text-natural-text border-b border-natural-border/70 pb-3">
                  Delivery Destination
                </h3>

                <div className="space-y-2 text-xs text-natural-muted">
                  <p className="font-bold text-natural-text text-sm">{order.delivery_name}</p>
                  <p>{order.delivery_phone}</p>
                  <p className="pt-2 text-natural-text leading-relaxed">
                    {order.address}, {order.locality}
                    <br />
                    {order.city}, {order.state} - {order.pincode}
                  </p>
                  {order.delivery_notes && (
                    <p className="p-3 bg-white rounded-xl border border-natural-border/60 text-[11px] mt-2 italic">
                      &ldquo;{order.delivery_notes}&rdquo;
                    </p>
                  )}
                </div>

                {order.created_at && (
                  <div className="pt-3 border-t border-natural-border/60 text-[11px] text-natural-muted flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-700" />
                    <span>Booked on: {formatDate(order.created_at)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-natural-muted">
          Loading order lookup...
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
