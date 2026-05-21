'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  Cpu,
  HardDrive,
  MemoryStick,
  Monitor,
  MessageCircle,
  ShoppingBag,
  X,
} from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice, calculateDiscount, cn } from '@/lib/utils';
import { getWhatsAppUrl, CONDITION_LABELS } from '@/lib/constants';

interface ProductDetailViewProps {
  product: Product;
  siteUrl: string;
}

export function ProductDetailView({ product, siteUrl }: ProductDetailViewProps) {
  const [activeImage, setActiveImage] = useState(0);
  const discount = calculateDiscount(product.price, product.sale_price);
  const displayPrice = product.sale_price || product.price;
  const productUrl = `${siteUrl}/products/${product.slug}`;

  const buyMessage = getWhatsAppUrl(
    product.name,
    product.processor,
    product.ram,
    displayPrice,
    productUrl
  );

  const inquiryMessage = getWhatsAppUrl(
    product.name,
    [product.processor, product.ram, product.storage].filter(Boolean).join(' | '),
    undefined,
    displayPrice,
    productUrl
  );

  const specs = [
    { icon: Cpu, label: 'Processor', value: product.processor },
    { icon: MemoryStick, label: 'RAM', value: product.ram },
    { icon: HardDrive, label: 'Storage', value: product.storage },
    { icon: Monitor, label: 'Display', value: product.display_size },
  ].filter((s) => s.value);

  return (
    <div className="min-h-screen bg-background">
      <div className="container-wide py-8 lg:py-12">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-body-sm text-text-muted hover:text-accent mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-[4/3] rounded-card bg-white shadow-soft overflow-hidden mb-4">
              {product.images?.[activeImage] ? (
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-6"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  No image
                </div>
              )}
              {discount > 0 && (
                <span className="absolute top-4 left-4 badge bg-deals text-white font-bold">
                  {discount}% OFF
                </span>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      'shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all',
                      activeImage === i ? 'border-accent shadow-glow-blue' : 'border-gray-100'
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {product.brand && (
              <span className="text-caption font-semibold tracking-wider uppercase text-accent">
                {product.brand.name}
              </span>
            )}
            <h1 className="font-display text-display-sm text-text-primary mt-2 mb-4">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="badge border bg-gray-50 text-text-primary">
                {CONDITION_LABELS[product.condition] || product.condition}
              </span>
              {product.in_stock ? (
                <span className="flex items-center gap-1 text-whatsapp text-body-sm font-medium">
                  <Check className="w-4 h-4" /> In Stock
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-500 text-body-sm font-medium">
                  <X className="w-4 h-4" /> Out of Stock
                </span>
              )}
              {product.warranty && (
                <span className="text-body-sm text-text-muted">🛡️ {product.warranty}</span>
              )}
            </div>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-display text-display-sm text-text-primary">
                {formatPrice(displayPrice)}
              </span>
              {product.sale_price && product.sale_price < product.price && (
                <span className="text-heading-md text-text-muted line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a href={buyMessage} target="_blank" rel="noopener noreferrer" className="btn-whatsapp flex-1">
                <ShoppingBag className="w-4 h-4" />
                Buy via WhatsApp
              </a>
              <a href={inquiryMessage} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1">
                <MessageCircle className="w-4 h-4" />
                Inquiry via WhatsApp
              </a>
            </div>

            {specs.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-8">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="p-4 rounded-card bg-white shadow-soft">
                    <Icon className="w-4 h-4 text-accent mb-2" />
                    <span className="text-caption text-text-muted block">{label}</span>
                    <span className="text-body-sm font-medium text-text-primary">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {product.description && (
              <div className="prose prose-slate max-w-none">
                <h2 className="font-display text-heading-sm text-text-primary mb-3">Description</h2>
                <p className="text-body-md text-text-muted leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
