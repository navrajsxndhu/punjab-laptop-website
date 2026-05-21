import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/common/ProductCard';
import { SectionHeader } from '@/components/common/SectionHeader';
import { fetchProducts } from '@/lib/products';

export async function FeaturedProducts() {
  const { products } = await fetchProducts({ featured: true, limit: 6 });

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <SectionHeader
          overline="Featured"
          heading="Handpicked Laptops"
          description="Our top recommendations — tested, verified, and ready with warranty."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.slice(0, 6).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/products" className="btn-outline group">
            View All Products
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
