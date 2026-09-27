import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { ArrowRight, Sprout } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-20 bg-natural-cream border-t border-natural-border/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-900 mx-auto">
          <Sprout className="w-6 h-6" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-natural-text tracking-tight">
          Bring Fresh Greens to Your Table.
        </h2>

        <p className="text-sm sm:text-base text-natural-muted max-w-xl mx-auto leading-relaxed">
          Experience the honest difference of crisp, naturally grown microgreens harvested specifically for your order.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link href="/products" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              <span>Order Fresh Microgreens</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Bulk & Cafe Inquiries
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
