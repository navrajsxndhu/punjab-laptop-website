'use client';

import { AnimatedSection } from '@/components/common/AnimatedSection';
import { SectionHeader } from '@/components/common/SectionHeader';
import { BUSINESS } from '@/lib/constants';

export function AboutStory() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimatedSection direction="left">
            <SectionHeader
              overline="Our Story"
              heading={`${BUSINESS.officialName}`}
              description="From a trusted neighborhood shop to Sirsa's most followed laptop destination — we've built our reputation one genuine sale at a time."
              align="left"
              className="mb-0 lg:mb-0"
            />
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.15}>
            <div className="space-y-5 text-body-lg text-text-muted leading-relaxed">
              <p>
                Punjab Laptop Solution began with a simple mission: make quality laptops accessible to every
                student, professional, and gamer in Sirsa and surrounding areas — without compromise on
                authenticity or after-sales support.
              </p>
              <p>
                Today, with <strong className="text-text-primary font-medium">{BUSINESS.instagramFollowers} Instagram followers</strong> and
                a <strong className="text-text-primary font-medium">{BUSINESS.rating}★ rating on JustDial</strong> from {BUSINESS.reviewCount} reviews,
                we are proud to be the go-to laptop store in Haryana.
              </p>
              <p>
                Whether you need a brand-new gaming rig, a budget student laptop, or a certified refurbished
                MacBook — our team personally tests every machine before it reaches your hands.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
