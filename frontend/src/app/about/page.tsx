import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/common/PageHero';
import { GoogleMap } from '@/components/common/GoogleMap';
import { AboutStory } from '@/components/about/AboutStory';
import { TrustMetrics } from '@/components/about/TrustMetrics';
import { WhyTrustUs } from '@/components/about/WhyTrustUs';
import { StoreGallery } from '@/components/about/StoreGallery';
import { CTASection } from '@/components/home/CTASection';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about Punjab Laptop Sirsa — ${BUSINESS.instagramFollowers} followers, ${BUSINESS.rating}★ rated laptop shop in Sirsa. Genuine products, warranty, and expert support since day one.`,
  openGraph: {
    title: 'About Punjab Laptop Sirsa',
    description: BUSINESS.description,
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        overline="About Us"
        title="Built on Trust. Powered by Community."
        description={`${BUSINESS.officialName} — Sirsa's most trusted laptop destination with ${BUSINESS.instagramFollowers} Instagram followers and ${BUSINESS.reviewCount} verified reviews.`}
      >
        <Link
          href={BUSINESS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline inline-flex"
        >
          Follow on Instagram
        </Link>
      </PageHero>

      <AboutStory />
      <TrustMetrics />
      <WhyTrustUs />
      <StoreGallery />

      <section className="section-padding-sm bg-background">
        <div className="container-wide">
          <GoogleMap />
        </div>
      </section>

      <CTASection />
    </>
  );
}
