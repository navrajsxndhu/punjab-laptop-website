'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/common/SectionHeader';
import { StaggerContainer, StaggerItem } from '@/components/common/AnimatedSection';
import type { Category } from '@/types';

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <SectionHeader
          overline="Categories"
          heading="Find Your Perfect Match"
          description="Whether you game, study, or run a business — we have the right laptop."
        />

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {categories.slice(0, 5).map((cat) => (
            <StaggerItem key={cat.slug}>
              <Link href={`/products?category=${cat.slug}`}>
                <motion.div
                  className="group relative p-6 lg:p-8 rounded-card bg-white/5 border border-white/10 shadow-soft text-center transition-all duration-400 ease-apple hover:shadow-card-hover hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-3xl lg:text-4xl mb-3 block">{cat.icon || '💻'}</span>
                  <h3 className="font-display font-semibold text-body-md text-text-primary group-hover:text-accent transition-colors">
                    {cat.name}
                  </h3>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
