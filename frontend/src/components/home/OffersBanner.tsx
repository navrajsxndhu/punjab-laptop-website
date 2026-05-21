'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import type { Offer } from '@/types';

interface OffersBannerProps {
  offers: Offer[];
}

export function OffersBanner({ offers }: OffersBannerProps) {
  const offer = offers[0];
  if (!offer) return null;

  return (
    <section className="section-padding-sm">
      <div className="container-wide">
        <Link href="/offers">
          <motion.div
            className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-primary via-primary-800 to-accent shadow-large group"
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="absolute inset-0 opacity-30">
              {offer.banner_image && (
                <img
                  src={offer.banner_image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 lg:p-12">
              <div>
                <span className="inline-flex items-center gap-1.5 badge bg-deals/20 text-deals-light mb-4">
                  <Flame className="w-3.5 h-3.5" />
                  Limited Offer
                </span>
                <h2 className="font-display text-display-sm text-white mb-2">{offer.title}</h2>
                {offer.description && (
                  <p className="text-white/70 text-body-lg max-w-xl">{offer.description}</p>
                )}
              </div>
              <span className="inline-flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all">
                View Deals
                <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
