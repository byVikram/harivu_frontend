import React from "react";
import Link from "next/link";
import { Sprout, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Logo } from "../ui/Logo";

export function Footer() {
  return (
    <footer className="bg-brand-950 text-natural-warmWhite border-t border-brand-900/50">
      {/* Brand Highlights Strip */}
      <div className="border-b border-brand-900/60 bg-brand-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-800/80 flex items-center justify-center text-brand-300 font-bold text-sm">
                01
              </span>
              <div>
                <p className="text-sm font-semibold text-natural-warmWhite">
                  Seed to Harvest
                </p>
                <p className="text-xs text-brand-200/70">
                  Grown with care in-house
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-800/80 flex items-center justify-center text-brand-300 font-bold text-sm">
                02
              </span>
              <div>
                <p className="text-sm font-semibold text-natural-warmWhite">
                  Naturally Cultivated
                </p>
                <p className="text-xs text-brand-200/70">
                  Pure water & pristine care
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-800/80 flex items-center justify-center text-brand-300 font-bold text-sm">
                03
              </span>
              <div>
                <p className="text-sm font-semibold text-natural-warmWhite">
                  Harvested to Order
                </p>
                <p className="text-xs text-brand-200/70">
                  Never stale on shelf
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-800/80 flex items-center justify-center text-brand-300 font-bold text-sm">
                04
              </span>
              <div>
                <p className="text-sm font-semibold text-natural-warmWhite">
                  Local Bengaluru
                </p>
                <p className="text-xs text-brand-200/70">
                  Direct from grower to you
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <Logo variant="light" size="md" />
            <p className="text-sm text-brand-200/80 leading-relaxed pr-4">
              Harivu grows fresh, living microgreens naturally from seed to harvest. We harvest to order so every leaf delivers maximum vitality, crunch, and crisp flavor straight to your table.
            </p>
            <div className="pt-2 text-xs text-brand-300/80">
              <p>harivu.in — Naturally grown in India</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-300">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-brand-100/80">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All Microgreens
                </Link>
              </li>
              <li>
                <Link href="/products?featured=true" className="hover:text-white transition-colors">
                  Featured Greens
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer & Orders */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-300">
              Orders & Support
            </h4>
            <ul className="space-y-2 text-sm text-brand-100/80">
              <li>
                <Link href="/order/track" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-brand-300 font-semibold hover:text-white transition-colors">
                  ⚙️ Admin Command Hub
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-300">
              Get in Touch
            </h4>
            <div className="space-y-2 text-sm text-brand-100/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                <span>Bengaluru Urban, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="mailto:contact@harivu.in" className="hover:text-white transition-colors">
                  contact@harivu.in
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 (Contact on order)
                </a>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs font-semibold text-brand-200 bg-brand-900/80 hover:bg-brand-800 px-3.5 py-2 rounded-full border border-brand-700/60 transition-colors"
              >
                <span>Book a Fresh Harvest</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="mt-12 pt-8 border-t border-brand-900/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-300/70">
          <p>© {new Date().getFullYear()} Harivu (harivu.in). All rights reserved.</p>
          <p className="text-center md:text-right">
            Naturally grown from seed to harvest. Fresh microgreens delivered with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
