import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { SectionSkeleton } from '@/components/common/SectionSkeleton';
import { fetchCategories, fetchBrands, fetchTestimonials, fetchOffers } from '@/lib/products';
import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';
import { canonical } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = {
  title: SEO.defaultTitle,
  description: SEO.defaultDescription,
  keywords: [...SEO.keywords],
  alternates: { canonical: canonical('/') },
  openGraph: {
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    url: canonical('/'),
    type: 'website',
  },
};

const FeaturedProducts = dynamic(
  () => import('@/components/home/FeaturedProducts').then((m) => m.FeaturedProducts),
  { loading: () => <SectionSkeleton rows={3} /> }
);

const CategoryGrid = dynamic(
  () => import('@/components/home/CategoryGrid').then((m) => m.CategoryGrid),
  { loading: () => <SectionSkeleton rows={2} /> }
);

const BrandStrip = dynamic(() => import('@/components/home/BrandStrip').then((m) => m.BrandStrip));
const OffersBanner = dynamic(() => import('@/components/home/OffersBanner').then((m) => m.OffersBanner));
const TestimonialsSection = dynamic(
  () => import('@/components/home/TestimonialsSection').then((m) => m.TestimonialsSection)
);
const FAQSection = dynamic(() => import('@/components/home/FAQSection').then((m) => m.FAQSection));
const CTASection = dynamic(() => import('@/components/home/CTASection').then((m) => m.CTASection));

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
      <FAQSection />
      <CTASection />
    </>
  );
}
