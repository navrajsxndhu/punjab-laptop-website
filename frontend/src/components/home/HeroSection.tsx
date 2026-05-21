'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, MapPin, Sparkles } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { PremiumBackground } from '@/components/common/PremiumBackground';
import { APPLE_EASE } from '@/lib/motion';

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: APPLE_EASE } },
};

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[var(--hero-height)] flex items-center overflow-hidden section-dark">
      <PremiumBackground variant="hero" />

      <div className="container-wide relative z-10 py-16 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 glass-dark rounded-pill px-4 py-2.5 mb-7 border border-white/10 gpu-accelerate"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" aria-hidden />
              <span className="flex items-center gap-1 text-deals">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-caption font-bold">{BUSINESS.rating}★</span>
              </span>
              <span className="w-px h-3 bg-gray-200/80" />
              <span className="text-caption text-text-muted font-medium">{BUSINESS.reviewCount} reviews</span>
              <span className="w-px h-3 bg-gray-200/80 hidden sm:block" />
              <span className="text-caption text-text-muted font-medium hidden sm:inline">
                {BUSINESS.instagramFollowers} on Instagram
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-[2.25rem] sm:text-display-md lg:text-[3.75rem] text-white text-balance mb-6 tracking-[-0.03em] leading-[1.08]"
            >
              Sirsa&apos;s Most{' '}
              <span className="text-gradient bg-gradient-to-r from-accent via-blue-600 to-accent-700 bg-clip-text text-transparent">
                Trusted
              </span>{' '}
              Laptop Destination
            </motion.h1>

            <motion.p variants={fadeUp} className="text-body-lg sm:text-[1.125rem] text-white/70 max-w-xl mb-9 leading-relaxed">
              {BUSINESS.description}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-9">
              <motion.div whileHover={reduce ? undefined : { scale: 1.02 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
                <Link href="/products" className="btn-primary btn-glass-shine text-[15px] px-8 py-4 min-h-[52px]">
                  Browse Laptops
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.a
                href={`https://wa.me/${BUSINESS.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp btn-glass-shine text-[15px] px-8 py-4 min-h-[52px]"
                whileHover={reduce ? undefined : { scale: 1.02 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </motion.a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-start gap-2 text-body-sm text-white/60 max-w-lg">
              <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>{BUSINESS.address}</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: APPLE_EASE }}
            className="relative lg:block hidden"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              <div className="absolute inset-4 rounded-[40px] bg-gradient-to-br from-accent/30 via-transparent to-whatsapp/25 opacity-80" />
              <motion.div
                animate={reduce ? undefined : { y: [0, -16, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 rounded-[32px] overflow-hidden shadow-2xl border border-white/10 glass-dark p-6 gpu-accelerate"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-accent/5 pointer-events-none" />
                <Image
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=80"
                  alt="Premium laptop showcase"
                  width={720}
                  height={540}
                  priority
                  className="w-full h-auto object-contain relative z-[1]"
                />
              </motion.div>
              <motion.div
                initial={reduce ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75, ease: APPLE_EASE }}
                className="absolute top-10 -right-2 glass-dark rounded-2xl px-5 py-4 shadow-medium border border-white/10 gpu-accelerate"
              >
                <span className="text-caption text-white/60 block mb-0.5">Starting from</span>
                <span className="font-display font-bold text-2xl text-accent tracking-tight">₹31,999</span>
              </motion.div>
              <motion.div
                initial={reduce ? false : { opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.95, ease: APPLE_EASE }}
                className="absolute bottom-20 -left-2 glass-dark rounded-2xl px-5 py-3.5 shadow-medium border border-white/10 gpu-accelerate"
              >
                <span className="text-body-sm font-semibold text-whatsapp">✓ Warranty included</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
