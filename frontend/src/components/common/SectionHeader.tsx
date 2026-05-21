'use client';

import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';

interface SectionHeaderProps {
  overline?: string;
  heading: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  headingClassName?: string;
  dark?: boolean;
}

export function SectionHeader({
  overline,
  heading,
  description,
  align = 'center',
  className = '',
  headingClassName = '',
  dark = false,
}: SectionHeaderProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <AnimatedSection
      className={`max-w-3xl ${alignClasses[align]} mb-12 lg:mb-16 ${className}`}
    >
      {overline && (
        <motion.span
          className={`inline-block text-caption font-semibold tracking-[0.2em] uppercase mb-3 ${
            dark ? 'text-accent-300' : 'text-accent'
          }`}
        >
          {overline}
        </motion.span>
      )}
      <h2
        className={`font-display text-display-sm sm:text-display-md lg:text-display-lg ${
          dark ? 'text-white' : 'text-text-primary'
        } text-balance ${headingClassName}`}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={`mt-4 text-body-lg ${
            dark ? 'text-gray-300' : 'text-text-muted'
          } max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </AnimatedSection>
  );
}
