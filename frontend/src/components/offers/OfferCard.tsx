'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Percent, Tag, Sparkles } from 'lucide-react';
import type { Offer } from '@/types';
import { OfferCountdown } from './OfferCountdown';
import { cn } from '@/lib/utils';

interface OfferCardProps {
  offer: Offer;
  index?: number;
  variant?: 'featured' | 'default';
}

function formatDiscount(offer: Offer): string {
  if (offer.discount_type === 'percentage' && offer.discount_value) {
    return `${offer.discount_value}% OFF`;
  }
  if (offer.discount_type === 'flat' && offer.discount_value) {
    return `₹${offer.discount_value.toLocaleString('en-IN')} OFF`;
  }
  return 'Special Deal';
}

function getOfferCategory(title: string): 'student' | 'refurbished' | 'seasonal' | 'default' {
  const t = title.toLowerCase();
  if (t.includes('student')) return 'student';
  if (t.includes('refurbished')) return 'refurbished';
  if (t.includes('summer') || t.includes('sale') || t.includes('gaming')) return 'seasonal';
  return 'default';
}

const categoryStyles = {
  student: 'from-blue-600/90 via-accent/80 to-indigo-900/90',
  refurbished: 'from-emerald-700/90 via-teal-600/80 to-slate-900/90',
  seasonal: 'from-amber-600/90 via-deals/80 to-orange-900/90',
  default: 'from-primary/90 via-primary-800/80 to-accent/70',
};

export function OfferCard({ offer, index = 0, variant = 'default' }: OfferCardProps) {
  const category = getOfferCategory(offer.title);
  const isFeatured = variant === 'featured';

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn('group', isFeatured && 'lg:col-span-2')}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-[20px] shadow-soft transition-all duration-500 ease-apple',
          'hover:shadow-card-hover hover:-translate-y-1',
          isFeatured ? 'min-h-[320px] lg:min-h-[380px]' : 'min-h-[280px]'
        )}
      >
        {offer.banner_image && (
          <img
            src={offer.banner_image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-apple group-hover:scale-105"
          />
        )}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br',
            categoryStyles[category]
          )}
        />

        <div className="relative z-10 flex flex-col justify-between h-full p-6 lg:p-8 min-h-[inherit]">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="inline-flex items-center gap-1.5 glass rounded-pill px-3 py-1 text-caption font-semibold text-white">
                {offer.discount_type === 'percentage' ? (
                  <Percent className="w-3 h-3" />
                ) : offer.discount_type === 'flat' ? (
                  <Tag className="w-3 h-3" />
                ) : (
                  <Sparkles className="w-3 h-3" />
                )}
                {formatDiscount(offer)}
              </span>
              {offer.valid_until && <OfferCountdown endDate={offer.valid_until} />}
            </div>
            <h3
              className={cn(
                'font-display font-bold text-white text-balance',
                isFeatured ? 'text-display-sm' : 'text-heading-lg'
              )}
            >
              {offer.title}
            </h3>
            {offer.description && (
              <p className="mt-3 text-white/75 text-body-md max-w-lg leading-relaxed line-clamp-3">
                {offer.description}
              </p>
            )}
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 mt-6 text-white font-medium text-body-sm group/link w-fit"
          >
            <span className="border-b border-white/40 group-hover/link:border-white transition-colors">
              Browse eligible laptops
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
