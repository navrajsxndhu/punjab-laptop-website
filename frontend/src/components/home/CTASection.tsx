'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-slate-50 to-white border border-gray-100 shadow-soft p-10 lg:p-16 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-display-sm text-text-primary mb-4">
              Visit Our Store in Sirsa
            </h2>
            <p className="text-body-lg text-text-muted mb-8">
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
              <Link href="/contact" className="btn-outline">
                Get Directions
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-body-sm text-text-muted">
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
