"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "../ui/Button";

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    deliveryCharge,
    total,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery,
    itemCount,
  } = useCart();

  if (!isCartOpen) return null;

  const progressPercent = Math.min(
    100,
    Math.round((subtotal / freeDeliveryThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-natural-text/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-natural-warmWhite shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-natural-border flex items-center justify-between bg-natural-cream/60">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-brand-900" />
              <h2 className="font-serif text-lg font-bold text-natural-text">
                Your Fresh Harvest Order ({itemCount})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-natural-muted hover:text-natural-text rounded-full hover:bg-natural-surface transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          <div className="px-6 py-3 bg-brand-50 border-b border-brand-100">
            <div className="flex items-center gap-2 text-xs font-medium text-brand-900 mb-1.5">
              <Truck className="w-4 h-4 text-brand-700 shrink-0" />
              {amountNeededForFreeDelivery > 0 ? (
                <span>
                  Add <strong>{formatCurrency(amountNeededForFreeDelivery)}</strong> more for <strong>FREE Delivery</strong>!
                </span>
              ) : (
                <span className="text-brand-950 font-bold">
                  🎉 You unlocked FREE Delivery on this harvest!
                </span>
              )}
            </div>
            <div className="w-full bg-brand-200/80 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-brand-900 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-natural-surface flex items-center justify-center text-natural-muted">
                  <ShoppingBag className="w-8 h-8 text-natural-muted/60" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-natural-text">Your basket is empty</p>
                  <p className="text-xs text-natural-muted max-w-xs">
                    Choose from our freshly harvested living microgreens to get started.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsCartOpen(false)}
                >
                  <Link href="/products">Explore Our Greens</Link>
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.variantId}
                  className="flex gap-4 p-3.5 rounded-2xl bg-white border border-natural-border shadow-subtle hover:border-brand-200 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-natural-surface shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-semibold text-sm text-natural-text truncate">
                          {item.productName}
                        </h4>
                        <span className="inline-block text-xs text-brand-900 font-medium bg-brand-50 px-2 py-0.5 rounded-md border border-brand-100 mt-0.5">
                          {item.variantName}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.variantId)}
                        className="text-natural-muted hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-natural-border/50">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-natural-border rounded-lg bg-natural-surface/60">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="p-1 hover:text-brand-900 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-natural-text min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="p-1 hover:text-brand-900 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-bold text-sm text-brand-950">
                        {formatCurrency(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-natural-border bg-natural-surface/40 space-y-3">
              <div className="space-y-1.5 text-xs text-natural-muted">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-natural-text">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Fresh Delivery Charge</span>
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
                <div className="flex justify-between text-sm font-bold text-natural-text pt-2 border-t border-natural-border/80">
                  <span>Total Payable</span>
                  <span className="text-brand-950 text-base">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="block w-full pt-1"
              >
                <Button className="w-full" size="lg">
                  <span>Proceed to Book Order</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <p className="text-[11px] text-center text-natural-muted">
                Harvested to order. Payment collected on confirmation or delivery.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
