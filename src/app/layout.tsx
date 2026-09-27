import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harivu — Fresh Naturally Grown Microgreens | Bengaluru",
  description:
    "Harivu grows fresh living microgreens naturally from seed to harvest. Harvested to order in Bengaluru for peak crispness, flavor, and everyday wellness.",
  keywords: [
    "microgreens",
    "fresh microgreens Bangalore",
    "radish microgreens",
    "sunflower microgreens",
    "pea shoots",
    "broccoli microgreens",
    "naturally grown",
    "Harivu",
    "harivu.in",
  ],
  authors: [{ name: "Harivu Team" }],
  openGraph: {
    title: "Harivu — Fresh Naturally Grown Microgreens",
    description:
      "Living microgreens harvested to order from seed to harvest. Discover crisp, concentrated nutrition delivered directly to your doorstep.",
    url: "https://harivu.in",
    siteName: "Harivu",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Harivu Fresh Naturally Grown Microgreens",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harivu — Fresh Naturally Grown Microgreens",
    description:
      "Fresh living microgreens naturally grown from seed to harvest in Bengaluru.",
  },
  metadataBase: new URL("https://harivu.in"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Harivu Microgreens",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999",
    "@id": "https://harivu.in",
    url: "https://harivu.in",
    telephone: "+91-9876543210",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.9716,
      longitude: 77.5946,
    },
    servesCuisine: "Living Microgreens, Fresh Produce",
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-natural-warmWhite text-natural-text font-sans selection:bg-brand-100 selection:text-brand-950">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
