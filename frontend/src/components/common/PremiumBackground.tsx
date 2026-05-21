'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface PremiumBackgroundProps {
  variant?: 'light' | 'dark' | 'hero';
  className?: string;
}

/** GPU-safe glow: large soft gradients, minimal blur on small screens */
export function PremiumBackground({ variant = 'light', className = '' }: PremiumBackgroundProps) {
  const reduce = useReducedMotion();

  const base =
    variant === 'dark'
      ? 'bg-gradient-to-b from-primary via-primary-900 to-primary'
      : variant === 'hero'
        ? 'bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,#E0E8FF_0%,#F8FAFC_45%,#FFFFFF_100%)]'
        : 'bg-gradient-to-b from-slate-50/90 via-background to-white';

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      <div className={base} />
      {!reduce && (
        <>
          <motion.div
            className="absolute -top-24 -left-16 w-[min(480px,90vw)] h-[min(480px,90vw)] rounded-full bg-accent/20 md:bg-accent/15 md:blur-2xl blur-xl will-change-transform"
            animate={{ x: [0, 20, 0], y: [0, 14, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/4 -right-16 w-[min(380px,75vw)] h-[min(380px,75vw)] rounded-full bg-whatsapp/15 md:blur-2xl blur-xl will-change-transform"
            animate={{ x: [0, -16, 0], y: [0, 20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          />
          <motion.div
            className="absolute bottom-10 left-1/4 w-[min(320px,65vw)] h-[min(320px,65vw)] rounded-full bg-deals/12 md:blur-2xl blur-lg will-change-transform"
            animate={{ opacity: [0.4, 0.75, 0.4] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.08),transparent_50%)]" />
      {variant === 'hero' && (
        <div className="absolute inset-0 opacity-[0.35] bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      )}
    </div>
  );
}
