'use client';

import { motion } from 'framer-motion';

interface PageHeroProps {
  overline?: string;
  title: string;
  description?: string;
  dark?: boolean;
  children?: React.ReactNode;
}

export function PageHero({ overline, title, description, dark = false, children }: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden ${
        dark
          ? 'bg-primary text-white'
          : 'bg-gradient-to-b from-slate-50 via-white to-background border-b border-gray-100'
      }`}
    >
      {!dark && (
        <>
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-whatsapp/8 rounded-full blur-3xl" />
        </>
      )}
      {dark && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-3xl" />
      )}

      <div className="container-wide relative z-10 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl"
        >
          {overline && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className={`inline-block text-caption font-semibold tracking-[0.2em] uppercase mb-4 ${
                dark ? 'text-accent-300' : 'text-accent'
              }`}
            >
              {overline}
            </motion.span>
          )}
          <h1
            className={`font-display text-display-sm sm:text-display-md lg:text-display-lg text-balance ${
              dark ? 'text-white' : 'text-text-primary'
            }`}
          >
            {title}
          </h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className={`mt-5 text-body-lg max-w-2xl leading-relaxed ${
                dark ? 'text-white/70' : 'text-text-muted'
              }`}
            >
              {description}
            </motion.p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
