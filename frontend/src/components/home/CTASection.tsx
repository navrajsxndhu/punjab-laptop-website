'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export function CTASection() {
  return (
    <section className="section-surface-alt">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-primary via-primary-900 to-primary border border-white/10 shadow-large p-10 lg:p-16 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-display-sm text-white mb-4">
              Visit Our Store in Sirsa
            </h2>
            <p className="text-body-lg text-white/70 mb-8">
              Walk in for a hands-on demo, expert advice, and the best prices in Haryana.
              We&apos;re open {BUSINESS.businessHours.weekdays}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                WhatsApp Us Now
              </a>
              <Link href="/contact" className="btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                Get Directions
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-body-sm text-white/60">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                {BUSINESS.landmark}
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-whatsapp" />
                +91 {BUSINESS.phone}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
