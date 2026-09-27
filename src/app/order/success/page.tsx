"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  CheckCircle2,
  Sprout,
  ArrowRight,
  PhoneCall,
  Clock,
  Truck,
  ShieldCheck,
} from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "HAR-RECENT";

  return (
    <div className="py-12 lg:py-20 bg-natural-warmWhite min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-natural-border shadow-elevated text-center space-y-8">
          {/* Celebratory Icon */}
          <div className="w-20 h-20 rounded-full bg-brand-100 text-brand-900 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-brand-800" />
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-800 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
              Harvest Booking Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-natural-text">
              Order Received Successfully!
            </h1>
            <p className="text-base text-natural-muted max-w-lg mx-auto">
              Thank you for choosing Harivu. Your living microgreens have been queued for fresh harvest.
            </p>
          </div>

          {/* Order ID Badge Box */}
          <div className="p-6 rounded-2xl bg-natural-cream border border-natural-border/80 max-w-md mx-auto space-y-1">
            <span className="text-xs uppercase font-bold text-natural-muted tracking-wider">
              Your Unique Order Reference
            </span>
            <p className="font-mono text-2xl font-bold text-brand-950 select-all">
              {orderNumber}
            </p>
            <p className="text-[11px] text-natural-muted pt-1">
              Please save this order reference for status tracking or support inquiries.
            </p>
          </div>

          {/* What happens next timeline */}
          <div className="pt-6 border-t border-natural-border/70 text-left space-y-4">
            <h3 className="font-serif text-lg font-bold text-natural-text text-center">
              What Happens Next?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-natural-surface/60 border border-natural-border/60 space-y-2">
                <div className="flex items-center gap-2 text-brand-900 font-bold text-xs uppercase">
                  <PhoneCall className="w-4 h-4 text-brand-700" />
                  <span>1. Confirmation</span>
                </div>
                <p className="text-xs text-natural-muted leading-relaxed">
                  We verify harvest readiness and contact you via WhatsApp / Call.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-natural-surface/60 border border-natural-border/60 space-y-2">
                <div className="flex items-center gap-2 text-brand-900 font-bold text-xs uppercase">
                  <Clock className="w-4 h-4 text-brand-700" />
                  <span>2. Morning Harvest</span>
                </div>
                <p className="text-xs text-natural-muted leading-relaxed">
                  Your greens are clipped early morning to preserve crispness and natural flavor.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-natural-surface/60 border border-natural-border/60 space-y-2">
                <div className="flex items-center gap-2 text-brand-900 font-bold text-xs uppercase">
                  <Truck className="w-4 h-4 text-brand-700" />
                  <span>3. Fresh Delivery</span>
                </div>
                <p className="text-xs text-natural-muted leading-relaxed">
                  Dispatched in food-safe containers directly to your doorstep in Bengaluru.
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-natural-border/60">
            <Link href={`/order/track?orderNumber=${encodeURIComponent(orderNumber)}`} className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="w-full sm:w-auto">
                <span>Track Order Status</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link href="/products" className="w-full sm:w-auto">
              <Button variant="outline" size="md" className="w-full sm:w-auto">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-natural-muted">
          Loading order confirmation...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
