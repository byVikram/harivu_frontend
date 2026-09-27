"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X, Sprout } from "lucide-react";
import { Button } from "../ui/Button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Greens", href: "/products" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-natural-warmWhite/90 backdrop-blur-md shadow-subtle border-b border-natural-border/60 py-3"
            : "bg-natural-warmWhite/60 backdrop-blur-sm py-4 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-brand-900 flex items-center justify-center text-natural-warmWhite shadow-sm group-hover:scale-105 transition-transform duration-200">
                <Sprout className="w-5 h-5 text-brand-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-brand-950">
                  HARIVU
                </span>
                <span className="text-[10px] tracking-widest text-brand-800 font-semibold uppercase -mt-1">
                  Fresh Microgreens
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-brand-900 ${
                      isActive
                        ? "text-brand-900 font-semibold border-b-2 border-brand-900 pb-0.5"
                        : "text-natural-muted"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/order/track"
                className="hidden lg:inline-flex text-xs font-semibold text-natural-muted hover:text-brand-900 transition-colors px-3 py-1.5 rounded-full border border-natural-border hover:border-brand-800"
              >
                Track Order
              </Link>

              {/* Cart Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full text-brand-950 hover:bg-brand-50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-700"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-5 h-5 text-brand-900" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-900 text-white text-[11px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-natural-warmWhite animate-scale-in">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Order Fresh CTA */}
              <Link href="/products" className="hidden sm:inline-block">
                <Button size="sm" variant="primary">
                  Order Fresh
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-natural-text hover:bg-natural-surface focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-xs bg-natural-warmWhite p-6 shadow-2xl flex flex-col justify-between animate-slide-left">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-natural-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-900 flex items-center justify-center text-white">
                    <Sprout className="w-4 h-4 text-brand-300" />
                  </div>
                  <span className="font-serif font-bold text-lg text-brand-950">
                    HARIVU
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-natural-muted hover:text-natural-text"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-xl text-base font-medium transition-colors ${
                      pathname === link.href
                        ? "bg-brand-100 text-brand-950 font-semibold"
                        : "text-natural-text hover:bg-natural-surface"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/order/track"
                  className="px-3 py-2 rounded-xl text-base font-medium text-natural-muted hover:bg-natural-surface"
                >
                  Track Order
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-natural-border space-y-3">
              <Link href="/products" className="block w-full">
                <Button className="w-full" size="md">
                  Order Fresh Microgreens
                </Button>
              </Link>
              <p className="text-xs text-center text-natural-muted">
                Freshly harvested from seed to table in Bengaluru.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
