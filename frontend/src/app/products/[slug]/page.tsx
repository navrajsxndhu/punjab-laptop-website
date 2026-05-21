import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetailView } from '@/components/products/ProductDetailView';
import { fetchProductBySlug } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildProductSchema, buildBreadcrumbSchema, canonical, SITE_URL } from '@/lib/seo';

export const revalidate = 120;

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
    alternates: { canonical: canonical(`/products/${product.slug}`) },
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160),
      url: canonical(`/products/${product.slug}`),
      type: 'website',
      images: product.images?.[0] ? [{ url: product.images[0], alt: product.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description?.slice(0, 160),
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) notFound();

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: product.name },
  ];

  return (
    <>
      <JsonLd
        data={[
          buildProductSchema(product),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
            { name: product.name, path: `/products/${product.slug}` },
          ]),
        ]}
      />
      <ProductDetailView product={product} siteUrl={SITE_URL} breadcrumbs={breadcrumbs} />
    </>
  );
}
