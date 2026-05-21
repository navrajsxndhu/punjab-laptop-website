'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { FAQ_ITEMS } from '@/lib/seo';

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-padding bg-white" aria-labelledby="faq-heading">
      <div className="container-narrow">
        <SectionHeader
          overline="FAQ"
          heading="Common Questions"
          description="Everything you need to know before visiting Punjab Laptop Sirsa."
        />

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.question}
                className="rounded-card border border-gray-100 bg-background overflow-hidden transition-shadow hover:shadow-soft"
              >
                <button
                  type="button"
                  id={`faq-trigger-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 text-left focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none"
                >
                  <span className="font-medium text-body-md text-text-primary pr-4">{item.question}</span>
                  <span className="shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-soft">
                    {isOpen ? <Minus className="w-4 h-4 text-accent" /> : <Plus className="w-4 h-4 text-text-muted" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <p className="px-5 lg:px-6 pb-5 lg:pb-6 text-body-md text-text-muted leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
