# Harivu Frontend (Next.js 14 + Tailwind CSS)

High-performance, mobile-first web storefront for **Harivu (harivu.in)**, a microgreens company based in Bengaluru, India.

---

## 🎨 Visual Identity & Brand System

- **Primary Brand Color**: `#14532D` (Deep Natural Green)
- **Dark Green**: `#0B3B24`
- **Light Green**: `#DCFCE7`
- **Cream**: `#F8F7F0`
- **Warm White**: `#FFFEFA`
- **Text**: `#17201A`
- **Muted Text**: `#66736A`
- **Border**: `#DDE5DE`

---

## 🚀 Key Features

1. **Dynamic Catalogue (`/products`)**:
   - Filter by taste profile (Spicy, Nutty, Sweet, Mild, Earthy, Balanced Mix) and search.
   - Dynamic variant packs (50g, 100g, 200g, 400g) with live price updates.
   - Skeletons, loading states, and empty states.
2. **Product Details (`/products/[slug]`)**:
   - Detailed photography, growing information (days, natural water cycles), harvest notes, nutrition highlights.
   - Interactive quantity selector and 1-click &ldquo;Book Order Now&rdquo;.
3. **Persistent Cart Drawer**:
   - Real-time free delivery progress bar (&ldquo;Add ₹X more for FREE Delivery!&rdquo;).
   - Quantity adjustments, variant pills, and instant subtotal recalculation.
4. **Checkout & Ordering (`/checkout`)**:
   - Customer information and full delivery address collection with pincode validation.
   - Zero advance payment friction (&ldquo;Book Order&rdquo; flow).
5. **Confirmation & Order Tracking (`/order/success` & `/order/track`)**:
   - Collision-resistant human-friendly order reference `HAR-YYYYMMDD-XXXX`.
   - 6-stage visual timeline (*Order Received &rarr; Confirmed &rarr; Preparing &rarr; Harvested &rarr; Out for Delivery &rarr; Delivered*).
6. **SEO & Structured Data**:
   - Rich JSON-LD LocalBusiness and Product schemas, OpenGraph meta tags, and responsive layouts.

---

## 📁 File Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with CartProvider, Navbar, Footer, JSON-LD
│   │   ├── page.tsx               # Homepage with Hero, Featured, Story, Why Harivu, CTA
│   │   ├── products/
│   │   │   ├── page.tsx           # Catalogue with search & category filters
│   │   │   └── [slug]/
│   │   │       ├── page.tsx       # Dynamic product slug page (Server)
│   │   │       └── ProductDetailClient.tsx # Interactive variant & quantity selector
│   │   ├── checkout/page.tsx      # Booking form with address validation
│   │   ├── order/
│   │   │   ├── success/page.tsx   # Order confirmation receipt & next steps
│   │   │   └── track/page.tsx     # Order stage tracker
│   │   ├── about/page.tsx         # Brand story and local farming philosophy
│   │   ├── how-it-works/page.tsx  # 5-stage visual timeline
│   │   ├── contact/page.tsx       # Contact details, WhatsApp link, and inquiry form
│   │   ├── privacy/page.tsx       # Privacy policy
│   │   └── terms/page.tsx         # Terms of service
│   ├── components/
│   │   ├── ui/                    # Button, Badge, Input, Textarea, Skeleton
│   │   ├── layout/                # Navbar, Footer
│   │   ├── cart/                  # CartDrawer
│   │   ├── products/              # ProductCard
│   │   └── home/                  # Hero, FeaturedProducts, WhyHarivu, HowItWorksPreview, FreshnessBanner, CtaBanner
│   ├── context/
│   │   └── CartContext.tsx        # Persistent LocalStorage cart state
│   └── lib/
│       ├── types.ts               # TypeScript interfaces
│       ├── utils.ts               # Currency (₹) and date formatters
│       ├── mockData.ts            # High-fidelity fallback catalog
│       ├── supabase.ts            # Supabase browser client
│       └── api.ts                 # Backend API and fallback data fetcher
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## 💻 Local Development

```bash
# In /frontend
npm install

# Start development server on port 3000
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).
