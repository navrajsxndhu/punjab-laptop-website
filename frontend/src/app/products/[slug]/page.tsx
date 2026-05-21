import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetailView } from '@/components/products/ProductDetailView';
import { fetchProductBySlug } from '@/lib/products';
import { SEO } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await fetchProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };

  const price = product.sale_price || product.price;
  return {
    title: product.name,
    description: `${product.name} — ${product.processor}, ${product.ram}, ${product.storage}. ${formatPrice(price)} at Punjab Laptop Sirsa.`,
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160),
      images: product.images?.[0] ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjablaptopsirsa.com';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    offers: {
      '@type': 'Offer',
      price: product.sale_price || product.price,
      priceCurrency: 'INR',
      availability: product.in_stock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: SEO.openGraph.siteName,
      },
    },
    brand: product.brand ? { '@type': 'Brand', name: product.brand.name } : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailView product={product} siteUrl={siteUrl} />
    </>
  );
}
