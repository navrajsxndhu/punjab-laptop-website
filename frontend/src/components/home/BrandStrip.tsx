'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Brand } from '@/types';

interface BrandStripProps {
  brands: Brand[];
}

export function BrandStrip({ brands }: BrandStripProps) {
  return (
    <section className="section-padding-sm bg-white border-y border-gray-100">
      <div className="container-wide">
        <p className="text-center text-caption font-semibold tracking-[0.2em] uppercase text-text-muted mb-8">
          Authorized Dealer — All Major Brands
        </p>
        <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/products?brand=${brand.slug}`}
                className="inline-flex items-center px-6 py-3 rounded-pill bg-gray-50 text-text-primary font-medium text-body-sm hover:bg-accent/5 hover:text-accent border border-transparent hover:border-accent/20 transition-all duration-300 ease-apple"
              >
                {brand.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
