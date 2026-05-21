'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, MapPin } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-var(--nav-height))] flex items-center overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-background" />
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-whatsapp/10 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />

      <div className="container-wide relative z-10 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 glass rounded-pill px-4 py-2 mb-6 shadow-soft"
            >
              <span className="flex items-center gap-1 text-deals">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-caption font-bold">{BUSINESS.rating}★</span>
              </span>
              <span className="w-px h-3 bg-gray-200" />
              <span className="text-caption text-text-muted font-medium">
                {BUSINESS.reviewCount} JustDial Reviews
              </span>
              <span className="w-px h-3 bg-gray-200" />
              <span className="text-caption text-text-muted font-medium">
                {BUSINESS.instagramFollowers} Instagram
              </span>
            </motion.div>

            <h1 className="font-display text-display-sm sm:text-display-md lg:text-display-lg text-text-primary text-balance mb-6">
              Sirsa&apos;s Most{' '}
              <span className="text-gradient">Trusted</span>{' '}
              Laptop Destination
            </h1>

            <p className="text-body-lg text-text-muted max-w-xl mb-8 leading-relaxed">
              {BUSINESS.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link href="/products" className="btn-primary text-[15px] px-8 py-3.5">
                  Browse Laptops
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.a
                href={`https://wa.me/${BUSINESS.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-[15px] px-8 py-3.5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </motion.a>
            </div>

            <div className="flex items-center gap-2 text-body-sm text-text-muted">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <span>{BUSINESS.address}</span>
            </div>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-8 rounded-[32px] bg-gradient-to-br from-accent/20 via-transparent to-whatsapp/20 blur-2xl" />
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 rounded-[28px] overflow-hidden shadow-large bg-white p-8"
              >
                <img
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900"
                  alt="Premium laptop showcase"
                  className="w-full h-auto object-contain"
                />
              </motion.div>
              {/* Floating spec chips */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute top-12 -right-4 glass rounded-card px-4 py-3 shadow-medium"
              >
                <span className="text-caption text-text-muted block">Starting from</span>
                <span className="font-display font-bold text-heading-md text-accent">₹31,999</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute bottom-16 -left-4 glass rounded-card px-4 py-3 shadow-medium"
              >
                <span className="text-caption font-semibold text-whatsapp">✓ Warranty Included</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
