import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/common/PageHero';
import { OfferCard } from '@/components/offers/OfferCard';
import { SectionHeader } from '@/components/common/SectionHeader';
import { fetchOffers } from '@/lib/products';
import { BUSINESS, getWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Offers & Deals',
  description: 'Exclusive laptop offers at Punjab Laptop Sirsa — student discounts, refurbished deals, seasonal sales, and MacBook specials.',
};

function categorizeOffers(offers: Awaited<ReturnType<typeof fetchOffers>>) {
  const student = offers.filter((o) => o.title.toLowerCase().includes('student'));
  const refurbished = offers.filter((o) => o.title.toLowerCase().includes('refurbished'));
  const seasonal = offers.filter(
    (o) =>
      o.title.toLowerCase().includes('summer') ||
      o.title.toLowerCase().includes('sale') ||
      o.title.toLowerCase().includes('gaming') ||
      o.title.toLowerCase().includes('macbook')
  );
  const other = offers.filter(
    (o) => !student.includes(o) && !refurbished.includes(o) && !seasonal.includes(o)
  );
  return { student, refurbished, seasonal, other, all: offers };
}

export default async function OffersPage() {
  const offers = await fetchOffers();
  const { student, refurbished, seasonal, all } = categorizeOffers(offers);
  const featured = all[0];
  const gridOffers = featured ? all.filter((o) => o.id !== featured.id) : all;

  return (
    <>
      <PageHero
        overline="Exclusive Deals"
        title="Premium Offers, Not Bargain Bins"
        description="Curated discounts on genuine laptops — student specials, refurbished gems, and limited seasonal drops."
        dark
      >
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp inline-flex"
        >
          Claim Offer on WhatsApp
        </a>
      </PageHero>

      {/* Featured hero offer */}
      {featured && (
        <section className="section-padding-sm -mt-8 relative z-10">
          <div className="container-wide">
            <div className="grid lg:grid-cols-1">
              <OfferCard offer={featured} variant="featured" />
            </div>
          </div>
        </section>
      )}

      {/* All offers grid */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <SectionHeader
            overline="Live Now"
            heading="Current Offers"
            description="Limited-time deals with warranty included. Visit store or inquire on WhatsApp."
            align="left"
            className="!mb-10 !lg:mb-12"
          />
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {gridOffers.map((offer, i) => (
              <OfferCard key={offer.id} offer={offer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {student.length > 0 && (
        <OfferSection title="Student Offers" subtitle="Show valid college ID for extra savings" offers={student} />
      )}

      {refurbished.length > 0 && (
        <OfferSection
          title="Refurbished Deals"
          subtitle="Certified, tested, warranty-backed premium refurbished laptops"
          offers={refurbished}
          dark
        />
      )}

      {seasonal.length > 0 && (
        <OfferSection title="Seasonal & Special Sales" subtitle="Limited stock — act before countdown ends" offers={seasonal} />
      )}

      {/* CTA strip */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="rounded-[24px] bg-primary p-10 lg:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-whatsapp/20 blur-3xl" />
            <div className="relative z-10">
              <h2 className="font-display text-display-sm text-white mb-4">Ready to Save?</h2>
              <p className="text-white/70 text-body-lg max-w-xl mx-auto mb-8">
                Mention the offer name on WhatsApp and our team will reserve the best deal for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                  WhatsApp +91 {BUSINESS.phone}
                </a>
                <Link href="/products" className="btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                  Browse Laptops
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function OfferSection({
  title,
  subtitle,
  offers,
  dark = false,
}: {
  title: string;
  subtitle: string;
  offers: Awaited<ReturnType<typeof fetchOffers>>;
  dark?: boolean;
}) {
  return (
    <section className={`section-padding-sm ${dark ? 'bg-primary' : 'bg-background'}`}>
      <div className="container-wide">
        <SectionHeader
          heading={title}
          description={subtitle}
          align="left"
          dark={dark}
          className="!mb-10"
        />
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {offers.map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
