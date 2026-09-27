import React from "react";
import { notFound } from "next/navigation";
import { fetchProductBySlug, fetchProducts } from "@/lib/api";
import { ProductDetailClient } from "./ProductDetailClient";
import type { Metadata } from "next";

export const revalidate = 60;

interface ProductPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await fetchProductBySlug(params.slug);
  if (!product) {
    return {
      title: "Product Not Found | Harivu",
    };
  }

  return {
    title: `${product.name} — Fresh Naturally Grown Microgreens | Harivu`,
    description: product.short_description,
    openGraph: {
      title: `${product.name} | Harivu Microgreens`,
      description: product.short_description,
      images: [{ url: product.image_url }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await fetchProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
