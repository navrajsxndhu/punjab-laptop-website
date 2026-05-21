'use client';

import { motion } from 'framer-motion';
import { Instagram, Shield, GraduationCap, BadgeCheck } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/common/AnimatedSection';
import { BUSINESS } from '@/lib/constants';

const metrics = [
  {
    icon: Instagram,
    value: BUSINESS.instagramFollowers,
    label: 'Instagram Followers',
    description: 'Real community, real trust',
    color: 'text-pink-500',
    bg: 'bg-pink-50',
  },
  {
    icon: BadgeCheck,
    value: '100%',
    label: 'Genuine Products',
    description: 'Verified stock, no grey market',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    icon: Shield,
    value: 'Warranty',
    label: 'On Every Purchase',
    description: 'New & refurbished coverage',
    color: 'text-whatsapp',
    bg: 'bg-whatsapp/10',
  },
  {
    icon: GraduationCap,
    value: 'Student',
    label: 'Friendly Pricing',
    description: 'Extra discounts with college ID',
    color: 'text-deals',
    bg: 'bg-deals/10',
  },
];

export function TrustMetrics() {
  return (
    <section className="section-padding bg-background border-t border-white/10">
      <div className="container-wide">
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m) => (
            <StaggerItem key={m.label}>
              <motion.div
                className="relative p-6 lg:p-8 rounded-card bg-background shadow-soft h-full transition-all duration-400 ease-apple hover:shadow-card-hover hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`w-12 h-12 rounded-xl ${m.bg} flex items-center justify-center mb-5`}>
                  <m.icon className={`w-6 h-6 ${m.color}`} />
                </div>
                <span className="font-display text-display-sm text-text-primary block">{m.value}</span>
                <span className="font-semibold text-body-md text-text-primary mt-1 block">{m.label}</span>
                <p className="text-body-sm text-text-muted mt-2">{m.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
