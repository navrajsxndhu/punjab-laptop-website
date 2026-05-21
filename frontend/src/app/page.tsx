import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { BrandStrip } from '@/components/home/BrandStrip';
import { OffersBanner } from '@/components/home/OffersBanner';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';
import { fetchCategories, fetchBrands, fetchTestimonials, fetchOffers } from '@/lib/products';

export default async function HomePage() {
  const [categories, brands, testimonials, offers] = await Promise.all([
    fetchCategories(),
    fetchBrands(),
    fetchTestimonials(),
    fetchOffers(),
  ]);

  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeaturedProducts />
      <CategoryGrid categories={categories} />
      <BrandStrip brands={brands} />
      <OffersBanner offers={offers} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </>
  );
}
