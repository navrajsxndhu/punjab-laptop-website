'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice, calculateDiscount, cn } from '@/lib/utils';
import { getWhatsAppUrl, CONDITION_LABELS } from '@/lib/constants';
import { MessageCircle, Cpu, MemoryStick, HardDrive, Check, X } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount = calculateDiscount(product.price, product.sale_price);
  const displayPrice = product.sale_price || product.price;
  const whatsAppUrl = getWhatsAppUrl(
    product.name,
    product.processor,
    product.ram,
    displayPrice,
    typeof window !== 'undefined' ? `${window.location.origin}/products/${product.slug}` : undefined
  );

  const conditionColors: Record<string, string> = {
    new: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'like-new': 'bg-blue-50 text-blue-700 border-blue-200',
    excellent: 'bg-violet-50 text-violet-700 border-violet-200',
    good: 'bg-amber-50 text-amber-700 border-amber-200',
    refurbished: 'bg-orange-50 text-orange-700 border-orange-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group"
    >
      <div className="relative bg-white rounded-card overflow-hidden shadow-soft transition-all duration-400 ease-apple hover:shadow-card-hover hover:-translate-y-1.5">
        {/* Gradient border glow on hover */}
        <div className="absolute inset-0 rounded-card bg-gradient-to-br from-accent/20 via-transparent to-whatsapp/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm scale-[1.02]" />

        {/* Image Section */}
        <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain p-4 transition-transform duration-600 ease-apple group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Glassmorphism overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount > 0 && (
              <span className="badge bg-deals text-white text-xs font-bold shadow-md">
                {discount}% OFF
              </span>
            )}
            {product.featured && (
              <span className="badge bg-accent text-white text-xs font-bold shadow-md">
                Featured
              </span>
            )}
          </div>

          {/* Condition Badge */}
          <div className="absolute top-3 right-3">
            <span className={cn(
              'badge text-xs font-semibold border',
              conditionColors[product.condition] || conditionColors.good
            )}>
              {CONDITION_LABELS[product.condition] || product.condition}
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="p-5">
          {/* Brand */}
          {product.brand && (
            <span className="text-caption font-semibold tracking-wider uppercase text-accent mb-1 block">
              {product.brand.name}
            </span>
          )}

          {/* Name */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-display text-heading-sm text-text-primary line-clamp-2 mb-3 group-hover:text-accent transition-colors duration-300">
              {product.name}
            </h3>
          </Link>

          {/* Specs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.processor && (
              <span className="inline-flex items-center gap-1 text-caption text-text-muted bg-gray-50 px-2 py-1 rounded-md">
                <Cpu className="w-3 h-3" />
                {product.processor}
              </span>
            )}
            {product.ram && (
              <span className="inline-flex items-center gap-1 text-caption text-text-muted bg-gray-50 px-2 py-1 rounded-md">
                <MemoryStick className="w-3 h-3" />
                {product.ram}
              </span>
            )}
            {product.storage && (
              <span className="inline-flex items-center gap-1 text-caption text-text-muted bg-gray-50 px-2 py-1 rounded-md">
                <HardDrive className="w-3 h-3" />
                {product.storage}
              </span>
            )}
          </div>

          {/* Price + Stock */}
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-heading-md font-bold text-text-primary">
                  {formatPrice(displayPrice)}
                </span>
                {product.sale_price && product.sale_price < product.price && (
                  <span className="text-body-sm text-text-muted line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              {product.in_stock ? (
                <>
                  <Check className="w-4 h-4 text-whatsapp" />
                  <span className="text-caption font-medium text-whatsapp">In Stock</span>
                </>
              ) : (
                <>
                  <X className="w-4 h-4 text-red-500" />
                  <span className="text-caption font-medium text-red-500">Out of Stock</span>
                </>
              )}
            </div>
          </div>

          {/* WhatsApp Button */}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full text-body-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Inquire on WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}
