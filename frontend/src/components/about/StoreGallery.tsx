'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/common/SectionHeader';
import { StaggerContainer, StaggerItem } from '@/components/common/AnimatedSection';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
    alt: 'Premium laptop display area',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600',
    alt: 'Customer consultation',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600',
    alt: 'Laptop collection showcase',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800',
    alt: 'Gaming laptops section',
    span: 'lg:col-span-2',
  },
];

export function StoreGallery() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <SectionHeader
          overline="Visit Us"
          heading="Experience Our Store"
          description="Walk in for a hands-on demo at Shop No. 52, New M.C. Market — near Chawla Restaurant, Sirsa."
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-[200px] lg:auto-rows-[220px]">
          {galleryImages.map((img, i) => (
            <StaggerItem key={i} className={img.span}>
              <motion.div
                className={`relative h-full min-h-[200px] rounded-card overflow-hidden shadow-soft group ${img.span}`}
                whileHover={{ scale: 1.01 }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-apple group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <span className="absolute bottom-4 left-4 text-white text-body-sm font-medium">
                  {img.alt}
                </span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
