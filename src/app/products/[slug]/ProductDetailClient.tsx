"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product, ProductVariant } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Plus,
  Minus,
  Check,
  Clock,
  Droplets,
  Sprout,
  ShieldCheck,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Heart,
  Zap,
  Leaf,
  Activity,
  Award,
  Utensils,
  Truck,
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
}

// Comprehensive botanical benefits dictionary per variety
const VARIETY_BENEFITS: Record<
  string,
  {
    tagline: string;
    highlights: { title: string; desc: string; icon: any }[];
    culinaryIdea: string;
    shelfLifeDays: number;
  }
> = {
  "sunflower-microgreens": {
    tagline: "Nutrient powerhouse rich in complete plant protein, zinc & vitamin E",
    highlights: [
      {
        title: "Complete Plant-Based Protein",
        desc: "Contains all 9 essential amino acids, making it an ideal muscle repair and clean vitality source for active lifestyles.",
        icon: Zap,
      },
      {
        title: "Cellular Shield & Vitamin E",
        desc: "High concentration of natural alpha-tocopherol (Vitamin E) neutralizes free radicals and supports radiant skin elasticity.",
        icon: ShieldCheck,
      },
      {
        title: "Immunity & Trace Minerals",
        desc: "Abundant bioavailable zinc, iron, selenium, and magnesium reinforce natural immune defenses and red blood cell production.",
        icon: Activity,
      },
      {
        title: "Heart Health & Healthy Fats",
        desc: "Packed with essential fatty acids (omega-6) that support arterial elasticity and balanced cholesterol levels.",
        icon: Heart,
      },
      {
        title: "Active Gut Digestion",
        desc: "Living enzymes and dietary fiber facilitate optimal gut microbiome activity and smooth nutrient assimilation.",
        icon: Leaf,
      },
    ],
    culinaryIdea:
      "Substantial and crunchy enough to serve as the main leafy base for gourmet salads, stuffed in sourdough sandwiches, or blended into morning vitality smoothies.",
    shelfLifeDays: 8,
  },
  "radish-microgreens": {
    tagline: "Spicy zesty kick loaded with 40x Vitamin C and natural detoxifying sulforaphenes",
    highlights: [
      {
        title: "40x Concentrated Vitamin C",
        desc: "Delivers significantly higher ascorbic acid than mature radish bulbs to energize your daily immune resistance.",
        icon: ShieldCheck,
      },
      {
        title: "Natural Detoxification",
        desc: "Contains glucosinolates that activate phase-2 liver enzymes for gentle, natural daily bodily cleansing.",
        icon: Droplets,
      },
      {
        title: "Digestive Spark & Bio-Enzymes",
        desc: "The sharp peppery zest stimulates gastric salivary enzymes to aid protein digestion in heavy meals.",
        icon: Zap,
      },
      {
        title: "Folate & Heart Wellness",
        desc: "Rich in active folate (Vitamin B9) supporting vascular wellness and healthy cell division.",
        icon: Heart,
      },
    ],
    culinaryIdea:
      "Sprinkle over avocado toast, warm grain bowls, street wraps, street tacos, or sunny-side eggs for an invigorating gourmet kick.",
    shelfLifeDays: 8,
  },
  "speckled-pea-shoots": {
    tagline: "Sweet tender tendrils packed with active folate, iron & natural plant fiber",
    highlights: [
      {
        title: "High Bioavailable Iron & Folate",
        desc: "Supports steady red blood cell oxygenation and combats daily fatigue with easily absorbed plant iron.",
        icon: Zap,
      },
      {
        title: "Cardiovascular & Vascular Support",
        desc: "High potassium and bioactive polyphenols promote healthy blood pressure regulation.",
        icon: Heart,
      },
      {
        title: "Eye Health & Carotenoids",
        desc: "Loaded with lutein and beta-carotene (pro-vitamin A) that protect ocular cells against screen-induced oxidative strain.",
        icon: Sparkles,
      },
      {
        title: "Low Calorie Dietary Fiber",
        desc: "Tender, crunchy tendrils provide clean prebiotic fiber without heavy starch.",
        icon: Leaf,
      },
    ],
    culinaryIdea:
      "Toss with cold quinoa salads, stir into warm fried rice during the last 30 seconds of cooking, or garnish clear soups and pastas.",
    shelfLifeDays: 9,
  },
  "broccoli-microgreens": {
    tagline: "The world's highest natural concentration of anticancer Sulforaphane",
    highlights: [
      {
        title: "Up to 50x Sulforaphane",
        desc: "Contains massive concentrations of glucoraphanin, converting into sulforaphane to trigger powerful cellular defense genes.",
        icon: Award,
      },
      {
        title: "Deep Cellular Longevity",
        desc: "Proven potent antioxidant activity supporting DNA repair and healthy inflammatory response.",
        icon: ShieldCheck,
      },
      {
        title: "Cardiovascular Defense",
        desc: "Helps protect arterial linings and supports normal cellular mitochondrial function.",
        icon: Heart,
      },
      {
        title: "Immunity & Skin Vitality",
        desc: "Rich in vitamins A, C, and K which reinforce skin barrier resilience and bone mineral retention.",
        icon: Activity,
      },
    ],
    culinaryIdea:
      "Blend directly into morning green juices, fold into scrambled eggs/tofu scrambles, or top hot soups right before serving.",
    shelfLifeDays: 8,
  },
  "beetroot-microgreens": {
    tagline: "Vivid ruby stems packed with dietary nitrates, betalains & stamina support",
    highlights: [
      {
        title: "Dietary Nitrates for Athletic Stamina",
        desc: "Natural nitrates convert into nitric oxide to enhance blood circulation, oxygen delivery, and physical endurance.",
        icon: Zap,
      },
      {
        title: "Betalain Antioxidant Shield",
        desc: "Vivid red pigments provide potent free-radical scavenging and support liver detoxification pathways.",
        icon: ShieldCheck,
      },
      {
        title: "Mineral Rich Complex",
        desc: "Rich in bioavailable potassium, calcium, magnesium, and iron for balanced cellular electrolyte hydration.",
        icon: Droplets,
      },
    ],
    culinaryIdea:
      "Use as a striking crimson garnish on avocado tartines, gourmet goat cheese salads, or blended into recovery protein shakes.",
    shelfLifeDays: 8,
  },
  "mustard-microgreens": {
    tagline: "Traditional pungent spice with sinus-clearing allylisothiocyanates & immunity",
    highlights: [
      {
        title: "Respiratory & Sinus Clearance",
        desc: "Natural spicy isothiocyanates promote clear breathing passages and support respiratory mucosa.",
        icon: WindIcon,
      },
      {
        title: "Immune Defense (Vitamins A & C)",
        desc: "Sharp, pungent greens packed with immunity-strengthening vitamins to guard against seasonal congestion.",
        icon: ShieldCheck,
      },
      {
        title: "Metabolic Activation",
        desc: "The thermogenic pungency awakens sluggish digestion and stimulates natural digestive fire (Agni).",
        icon: Zap,
      },
    ],
    culinaryIdea:
      "Garnish traditional Bengaluru dosas, sprinkle over coconut chutney, or top grilled meats and dal for authentic Indian zest.",
    shelfLifeDays: 8,
  },
  "harivu-signature-salad-mix": {
    tagline: "Curated harmonious blend of peppery radish, sweet pea & nutty sunflower",
    highlights: [
      {
        title: "Broad-Spectrum Micronutrients",
        desc: "Combines the benefits of multiple species: sulforaphane, complete proteins, vitamin C, folate, and zinc.",
        icon: Sparkles,
      },
      {
        title: "Sensory Texture & Flavor Balance",
        desc: "Features tender sweet shoots, juicy crunch, and a mild peppery undertone for an effortless ready-to-eat salad.",
        icon: Leaf,
      },
      {
        title: "Complete Daily Vitality Serving",
        desc: "A single generous handful supplies your daily antioxidant quota in a bioavailable living format.",
        icon: Heart,
      },
    ],
    culinaryIdea:
      "Enjoy as an instant raw micro-salad dressed with cold-pressed olive oil, lemon juice, and roasted pumpkin seeds.",
    shelfLifeDays: 8,
  },
};

function WindIcon(props: any) {
  return <Droplets {...props} />;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem, setIsCartOpen } = useCart();
  const variants = product.variants || [];

  const defaultVariant =
    variants.find((v) => v.is_default) ||
    variants[0] || {
      id: `${product.id}-default`,
      product_id: product.id,
      name: "50g Pack",
      weight_grams: 50,
      price: product.price,
      is_available: true,
    };

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(defaultVariant);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // 1. Read health benefits directly from database if populated
  const dbBenefits = product.health_benefits && Array.isArray(product.health_benefits) && product.health_benefits.length > 0
    ? {
        tagline: product.flavor_profile || product.short_description,
        highlights: product.health_benefits.map((b) => ({
          title: b.title,
          desc: b.desc,
          icon: Sparkles,
        })),
        culinaryIdea: `Perfect for elevating artisanal toasts, gourmet salads, and fresh morning wellness bowls with raw living vitality.`,
        shelfLifeDays: product.growing_days ? Math.min(10, product.growing_days) : 8,
      }
    : null;

  // 2. Fallback to variety dictionary if DB has not populated yet
  const specificBenefits = dbBenefits || VARIETY_BENEFITS[product.slug] || {
    tagline: product.short_description,
    highlights: [
      {
        title: "Nutrient-Dense Living Greens",
        desc: "Harvested at peak cotyledon stage containing up to 40x the vitamin concentration of mature vegetables.",
        icon: Sparkles,
      },
      {
        title: "100% Pesticide & Chemical Free",
        desc: "Cultivated in sterilized organic coir fed solely with pure filtered mineral water.",
        icon: Droplets,
      },
      {
        title: "Direct Morning Sunrise Harvest",
        desc: "Clipped to order at 6:00 AM on dispatch day to ensure cellular turgor and maximum freshness.",
        icon: Clock,
      },
    ],
    culinaryIdea:
      "Ideal for garnishing salads, avocado toast, warm broths, or blending into morning wellness smoothies.",
    shelfLifeDays: 8,
  };

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBookNow = () => {
    addItem(product, selectedVariant, quantity);
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="py-8 lg:py-14 bg-natural-warmWhite min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Back Link */}
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-natural-muted hover:text-brand-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Microgreens</span>
          </Link>
        </div>

        {/* Main Product Stage: Image & Purchase Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Macro Photography & Farm Standards */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-natural-surface border border-natural-border/80 shadow-md">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <Badge variant="brand" className="backdrop-blur-md bg-white/95 shadow-xs text-xs font-bold py-1 px-3">
                  {product.category}
                </Badge>
                {product.is_featured && (
                  <Badge variant="earth" className="backdrop-blur-md bg-amber-50/95 shadow-xs text-xs font-bold py-1 px-3">
                    Featured Harvest
                  </Badge>
                )}
              </div>
            </div>

            {/* Quality Standard Bar (Sleek, refined border radius) */}
            <div className="p-4 rounded-xl bg-natural-surface/60 border border-natural-border grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5">
                <Sprout className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-natural-text">100% Non-GMO</h4>
                  <p className="text-[11px] text-natural-muted">Untreated clean seeds</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-natural-text">6:00 AM Harvest</h4>
                  <p className="text-[11px] text-natural-muted">Clipped morning of dispatch</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Droplets className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-natural-text">Pure RO Fed</h4>
                  <p className="text-[11px] text-natural-muted">Zero chemical fertilizers</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-natural-text">Raw & Living</h4>
                  <p className="text-[11px] text-natural-muted">Active natural enzymes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Pack Selector & Cart Action */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-brand-800 bg-brand-50 px-2.5 py-0.5 rounded-lg border border-brand-200/60">
                  ⏱️ {product.growing_days} Days Growth
                </span>
                <span className="text-xs text-natural-muted">
                  • Bengaluru Sunrise Harvest
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-natural-text leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-natural-muted leading-relaxed">
                {product.description || product.short_description}
              </p>
            </div>

            {/* Flavor Profile Highlight */}
            {product.flavor_profile && (
              <div className="p-3 rounded-xl bg-brand-50/80 border border-brand-200/70 text-xs text-brand-950 flex items-start gap-2">
                <span className="font-bold text-brand-900 shrink-0">🌿 Palate & Texture:</span>
                <span className="font-medium italic">{product.flavor_profile}</span>
              </div>
            )}

            {/* Pack Size / Variant Selector (Modern refined buttons) */}
            {variants.length > 0 && (
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-natural-text">
                  Choose Pack Size:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {variants.map((v) => {
                    const isSelected = selectedVariant.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          isSelected
                            ? "border-brand-900 bg-brand-900 text-white shadow-sm font-bold scale-[1.02]"
                            : "border-natural-border bg-white text-natural-text hover:border-brand-700 hover:bg-brand-50/40"
                        }`}
                      >
                        <span className="block text-xs truncate">
                          {v.name}
                        </span>
                        <span className={`block text-xs font-extrabold mt-0.5 ${
                          isSelected ? "text-brand-200" : "text-brand-900"
                        }`}>
                          {formatCurrency(v.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price & Quantity Selector Container (Refined radius) */}
            <div className="p-5 rounded-2xl bg-white border border-natural-border shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-natural-muted block">
                    Portion Price ({selectedVariant.weight_grams || 50}g)
                  </span>
                  <span className="font-serif text-3xl font-extrabold text-brand-950">
                    {formatCurrency(selectedVariant.price * quantity)}
                  </span>
                </div>

                {/* Quantity controller */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-natural-muted uppercase">
                    Qty:
                  </span>
                  <div className="flex items-center border border-natural-border rounded-xl bg-natural-surface shadow-inner">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-natural-muted hover:text-brand-900"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2.5 text-xs font-bold text-natural-text min-w-[24px] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(50, quantity + 1))}
                      className="p-2 text-natural-muted hover:text-brand-900"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleAddToCart}
                  className={`w-full text-xs py-2.5 rounded-xl ${
                    added ? "border-emerald-600 text-emerald-800 bg-emerald-50" : ""
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1.5" />
                      <span>Added to Basket</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
                      <span>Add to Basket</span>
                    </>
                  )}
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleBookNow}
                  className="w-full text-xs py-2.5 rounded-xl shadow-md"
                >
                  <span>Book Order Now</span>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-natural-muted pt-1">
                <Truck className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                <span>Harvested at 6 AM. Free Bengaluru delivery above ₹300.</span>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* COMPREHENSIVE HEALTH & WELLNESS BENEFITS SECTION                   */}
        {/* ----------------------------------------------------------------- */}
        <div className="mt-14 pt-10 border-t border-natural-border/80 space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Nutritional Profile & Bioactive Compounds</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-natural-text">
              Health & Wellness Benefits of {product.name}
            </h2>

            <p className="text-xs sm:text-sm text-natural-muted max-w-2xl leading-relaxed">
              {specificBenefits.tagline}. Harvested in early cotyledon expansion when cellular nutrient concentration is up to 40x higher than mature vegetables.
            </p>
          </div>

          {/* Benefits Grid (Clean, refined border radius) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {specificBenefits.highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white border border-natural-border shadow-xs hover:shadow-card hover:border-brand-300 transition-all space-y-2.5"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-800">
                    <Icon className="w-4 h-4 text-brand-800" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-natural-text">
                    {item.title}
                  </h3>
                  <p className="text-xs text-natural-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Culinary Pairings & Storage Guide Strip */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Culinary Garnish Ideas */}
            <div className="p-5 rounded-xl bg-brand-50/70 border border-brand-200/70 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-900">
                <Utensils className="w-4 h-4 text-brand-700" />
                <span>Chef & Kitchen Recommendation</span>
              </div>
              <p className="text-xs sm:text-sm text-brand-950 leading-relaxed font-medium">
                {specificBenefits.culinaryIdea}
              </p>
            </div>

            {/* Shelf Life & Storage */}
            <div className="p-5 rounded-xl bg-emerald-50/60 border border-emerald-200/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
                <Leaf className="w-4 h-4 text-emerald-700" />
                <span>Storage & Shelf Life ({specificBenefits.shelfLifeDays}–10 Days)</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                Store in the original breathable container in your refrigerator vegetable crisper (4°C). Keep dry until right before eating to preserve maximum crispness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
