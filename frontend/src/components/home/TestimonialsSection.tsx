'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { StaggerContainer, StaggerItem } from '@/components/common/AnimatedSection';
import type { Testimonial } from '@/types';
import { getInitials } from '@/lib/utils';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-wide relative">
        <SectionHeader
          overline="Reviews"
          heading="Trusted by Sirsa"
          description="Real customers. Real experiences. Rated 4.7★ on JustDial."
          dark
        />

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t) => (
            <StaggerItem key={t.id}>
              <motion.div
                className="glass-dark rounded-card p-6 lg:p-8 h-full flex flex-col"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <Quote className="w-8 h-8 text-accent/40 mb-4" />
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-deals text-deals" />
                  ))}
                </div>
                <p className="text-white/80 text-body-md flex-1 leading-relaxed mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold text-sm">
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <span className="text-white font-medium text-body-sm block">{t.name}</span>
                    {t.location && (
                      <span className="text-white/50 text-caption">{t.location}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
