import type { Metadata } from 'next';
import { ProductsPageClient } from '@/components/products/ProductsPageClient';
import { fetchProducts, fetchCategories, fetchBrands } from '@/lib/products';
import { canonical } from '@/lib/seo';

export const revalidate = 120;

export const metadata: Metadata = {
  title: 'All Laptops',
  description: 'Browse new and refurbished laptops from Dell, HP, Lenovo, ASUS, Apple & more. Best prices in Sirsa with warranty.',
  alternates: { canonical: canonical('/products') },
};

interface ProductsPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(searchParams)) {
    params[key] = Array.isArray(value) ? value[0] : value;
  }

  const [{ products, meta }, categories, brands] = await Promise.all([
    fetchProducts({
      brand: params.brand,
      category: params.category,
      search: params.search,
      sort: params.sort || 'newest',
      page: params.page ? parseInt(params.page, 10) : 1,
      limit: 12,
      processor: params.processor,
      ram: params.ram,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
    }),
    fetchCategories(),
    fetchBrands(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-slate-50 to-background border-b border-gray-100">
        <div className="container-wide py-12 lg:py-16">
          <span className="text-caption font-semibold tracking-[0.2em] uppercase text-accent mb-3 block">
            Collection
          </span>
          <h1 className="font-display text-display-sm lg:text-display-md text-text-primary">
            All Laptops
          </h1>
          <p className="mt-3 text-body-lg text-text-muted max-w-2xl">
            {meta?.total ?? products.length} laptops available — filter by brand, category, or budget.
          </p>
        </div>
      </div>

      <ProductsPageClient
        initialProducts={products}
        meta={meta}
        categories={categories}
        brands={brands}
        initialFilters={params}
      />
    </div>
  );
}
