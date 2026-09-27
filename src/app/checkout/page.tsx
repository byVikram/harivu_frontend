"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { submitOrder } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { CheckoutFormData } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import {
  ShoppingBag,
  ArrowLeft,
  Truck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, deliveryCharge, total, clearCart } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    delivery_name: "",
    delivery_phone: "",
    delivery_email: "",
    address: "",
    locality: "",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "",
    delivery_notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.delivery_name.trim() || formData.delivery_name.trim().length < 2) {
      errs.delivery_name = "Please enter your full name (at least 2 characters)";
    }
    const cleanPhone = formData.delivery_phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      errs.delivery_phone = "Please enter a valid 10-digit mobile number";
    }
    if (formData.delivery_email && !formData.delivery_email.includes("@")) {
      errs.delivery_email = "Please enter a valid email address";
    }
    if (!formData.address.trim() || formData.address.trim().length < 5) {
      errs.address = "Please enter your complete street address (house/flat no.)";
    }
    if (!formData.locality.trim()) {
      errs.locality = "Area or locality is required (e.g. Indiranagar, Koramangala)";
    }
    if (!formData.city.trim()) {
      errs.city = "City is required";
    }
    if (!formData.state.trim()) {
      errs.state = "State is required";
    }
    if (!/^\d{6}$/.test(formData.pincode.trim())) {
      errs.pincode = "Pincode must be exactly 6 digits";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (items.length === 0) {
      setServerError("Your basket is empty. Please add microgreens before placing an order.");
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitOrder(formData, items);

      if (res.success && res.orderNumber) {
        clearCart();
        router.push(
          `/order/success?orderNumber=${encodeURIComponent(res.orderNumber)}`
        );
      } else {
        setServerError(res.error || "We couldn't place your order. Please check your details and try again.");
      }
    } catch {
      setServerError("Network error. Please verify your connection or try again shortly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-20 bg-natural-warmWhite min-h-screen">
        <div className="max-w-md mx-auto px-4 text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-natural-surface flex items-center justify-center text-natural-muted mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-bold text-natural-text">
              Your Basket is Empty
            </h1>
            <p className="text-sm text-natural-muted leading-relaxed">
              You do not have any microgreens selected for booking. Explore our living varieties to place an order.
            </p>
          </div>
          <Link href="/products" className="inline-block">
            <Button size="md">Explore Fresh Microgreens</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 lg:py-16 bg-natural-warmWhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-natural-muted hover:text-brand-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shopping</span>
          </Link>
        </div>

        <div className="mb-10 space-y-2 text-left">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-natural-text">
            Book Your Fresh Harvest
          </h1>
          <p className="text-sm text-natural-muted">
            Enter your delivery details below. We harvest fresh upon receiving your order and contact you to confirm delivery.
          </p>
        </div>

        {serverError && (
          <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold">Unable to complete order</p>
              <p className="text-xs">{serverError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Customer and Delivery Form */}
            <div className="lg:col-span-7 space-y-8">
              {/* Contact Information */}
              <div className="p-6 rounded-3xl bg-white border border-natural-border shadow-subtle space-y-5">
                <div className="border-b border-natural-border/70 pb-3 flex items-center justify-between">
                  <h2 className="font-serif text-lg font-bold text-natural-text">
                    1. Customer Information
                  </h2>
                  <span className="text-[11px] text-natural-muted">Required *</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={formData.delivery_name}
                    onChange={(e) =>
                      setFormData({ ...formData, delivery_name: e.target.value })
                    }
                    error={errors.delivery_name}
                  />

                  <Input
                    label="Mobile Number"
                    required
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={formData.delivery_phone}
                    onChange={(e) =>
                      setFormData({ ...formData, delivery_phone: e.target.value })
                    }
                    error={errors.delivery_phone}
                    helperText="For harvest updates and delivery confirmation"
                  />
                </div>

                <Input
                  label="Email Address (Optional)"
                  type="email"
                  placeholder="e.g. vikram@example.com"
                  value={formData.delivery_email}
                  onChange={(e) =>
                    setFormData({ ...formData, delivery_email: e.target.value })
                  }
                  error={errors.delivery_email}
                  helperText="Receive order receipt and tracking link"
                />
              </div>

              {/* Delivery Address */}
              <div className="p-6 rounded-3xl bg-white border border-natural-border shadow-subtle space-y-5">
                <div className="border-b border-natural-border/70 pb-3">
                  <h2 className="font-serif text-lg font-bold text-natural-text">
                    2. Delivery Address
                  </h2>
                </div>

                <Input
                  label="Flat / House No., Building Name & Street"
                  required
                  placeholder="e.g. #402, Green Valley Apartments, 1st Cross"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  error={errors.address}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Area / Locality"
                    required
                    placeholder="e.g. Indiranagar, HSR Layout"
                    value={formData.locality}
                    onChange={(e) =>
                      setFormData({ ...formData, locality: e.target.value })
                    }
                    error={errors.locality}
                  />

                  <Input
                    label="Pincode"
                    required
                    maxLength={6}
                    placeholder="e.g. 560038"
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({ ...formData, pincode: e.target.value })
                    }
                    error={errors.pincode}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="City"
                    required
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    error={errors.city}
                  />

                  <Input
                    label="State"
                    required
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    error={errors.state}
                  />
                </div>

                <Textarea
                  label="Delivery Notes or Instructions (Optional)"
                  placeholder="e.g. Ring bell or leave with building security desk"
                  value={formData.delivery_notes}
                  onChange={(e) =>
                    setFormData({ ...formData, delivery_notes: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-natural-cream/80 border border-natural-border/80 shadow-subtle space-y-5">
                <div className="border-b border-natural-border pb-3 flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-natural-text">
                    Order Summary
                  </h3>
                  <span className="text-xs font-semibold text-brand-900 bg-brand-100 px-2.5 py-0.5 rounded-full">
                    {items.length} {items.length === 1 ? "Variety" : "Varieties"}
                  </span>
                </div>

                {/* Items Breakdown */}
                <div className="space-y-3 divide-y divide-natural-border/60 max-h-72 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.variantId} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="w-10 h-10 rounded-lg object-cover bg-white shrink-0 border border-natural-border/60"
                        />
                        <div>
                          <p className="font-bold text-natural-text">{item.productName}</p>
                          <p className="text-natural-muted">{item.variantName} × {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-brand-950">
                        {formatCurrency(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing totals */}
                <div className="pt-4 border-t border-natural-border space-y-2 text-xs">
                  <div className="flex justify-between text-natural-muted">
                    <span>Subtotal</span>
                    <span className="font-semibold text-natural-text">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-natural-muted items-center">
                    <span>Fresh Delivery Fee</span>
                    <span>
                      {deliveryCharge === 0 ? (
                        <span className="text-emerald-700 font-bold uppercase text-[11px]">
                          FREE
                        </span>
                      ) : (
                        formatCurrency(deliveryCharge)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-natural-text pt-2 border-t border-natural-border">
                    <span>Total Amount</span>
                    <span className="text-brand-950 font-serif text-xl">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full shadow-md mt-2"
                >
                  <span>Confirm & Book Order</span>
                </Button>

                {/* Reassurance notes */}
                <div className="pt-2 text-[11px] text-natural-muted space-y-2 border-t border-natural-border/60">
                  <div className="flex items-center gap-2 text-brand-900 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>No advance online payment required</span>
                  </div>
                  <p>
                    We review each booking and reach out on WhatsApp/phone to confirm morning harvest scheduling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
