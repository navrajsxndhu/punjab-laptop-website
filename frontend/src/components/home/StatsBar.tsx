'use client';

import { motion } from 'framer-motion';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/common/AnimatedSection';
import { BUSINESS } from '@/lib/constants';

const stats = [
  { value: '47K+', label: 'Instagram Followers' },
  { value: `${BUSINESS.rating}★`, label: 'JustDial Rating' },
  { value: '200+', label: 'Happy Customers' },
  { value: '7+', label: 'Top Brands' },
];

export function StatsBar() {
  return (
    <section className="border-y border-white/10 bg-background/50 backdrop-blur-sm">
      <div className="container-wide py-10">
        <AnimatedSection>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <motion.span
                  className="font-display text-display-sm text-text-primary block"
                  whileInView={{ scale: [0.9, 1.02, 1] }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-body-sm text-text-muted mt-1 block">{stat.label}</span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatedSection>
      </div>
    </section>
  );
}
