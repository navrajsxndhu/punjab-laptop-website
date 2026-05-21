'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Wrench, HandCoins, Users } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { StaggerContainer, StaggerItem } from '@/components/common/AnimatedSection';

const reasons = [
  {
    icon: CheckCircle2,
    title: 'Personally Tested Stock',
    text: 'Every laptop is inspected for display, battery, keyboard, ports, and performance before sale.',
  },
  {
    icon: HandCoins,
    title: 'Best Prices in Sirsa',
    text: 'Wholesale and retail pricing — we match or beat local competitors on genuine products.',
  },
  {
    icon: Wrench,
    title: 'Repair & Genuine Parts',
    text: 'In-house service for repairs, upgrades, and authentic spare parts under one roof.',
  },
  {
    icon: Users,
    title: 'Expert Guidance',
    text: 'We help you choose the right laptop for your budget — students, gamers, and businesses alike.',
  },
];

export function WhyTrustUs() {
  return (
    <section className="section-padding-sm bg-background">
      <div className="container-wide">
        <SectionHeader
          overline="Why Us"
          heading="Why Customers Trust Punjab Laptop"
          description="Established reputation built on transparency, fair pricing, and long-term support."
        />

        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {reasons.map((r) => (
            <StaggerItem key={r.title}>
              <motion.div
                className="flex gap-5 p-6 lg:p-8 rounded-card glass shadow-soft"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="shrink-0 w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                  <r.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-heading-sm text-text-primary">{r.title}</h3>
                  <p className="mt-2 text-body-md text-text-muted leading-relaxed">{r.text}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
