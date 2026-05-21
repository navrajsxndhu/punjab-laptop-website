'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

interface GoogleMapProps {
  className?: string;
  title?: string;
}

export function GoogleMap({ className = '', title = 'Find Us' }: GoogleMapProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`rounded-card overflow-hidden shadow-soft border border-gray-100 bg-white ${className}`}
    >
      <div className="p-5 lg:p-6 border-b border-gray-100 flex items-start gap-3">
        <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <div>
          <h3 className="font-display font-semibold text-heading-sm text-text-primary">{title}</h3>
          <p className="text-body-sm text-text-muted mt-1">{BUSINESS.address}</p>
          <p className="text-caption text-text-muted mt-0.5">{BUSINESS.landmark}</p>
        </div>
      </div>
      <div className="relative aspect-[16/9] lg:aspect-[21/9] bg-gray-100">
        <iframe
          src={BUSINESS.googleMapsEmbed}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Punjab Laptop Sirsa location"
        />
      </div>
    </motion.div>
  );
}
