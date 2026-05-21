'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  index?: number;
  accent?: 'blue' | 'green' | 'amber' | 'violet';
}

const accents = {
  blue: 'bg-accent/10 text-accent',
  green: 'bg-whatsapp/10 text-whatsapp',
  amber: 'bg-deals/10 text-deals-dark',
  violet: 'bg-violet-100 text-violet-600',
};

export function StatCard({ label, value, icon: Icon, trend, index = 0, accent = 'blue' }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative p-6 rounded-[20px] bg-white shadow-soft border border-gray-100/80 hover:shadow-card-hover transition-shadow duration-400"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-caption font-medium text-text-muted uppercase tracking-wide">{label}</p>
          <p className="font-display text-display-sm text-text-primary mt-2">{value}</p>
          {trend && <p className="text-caption text-text-muted mt-1">{trend}</p>}
        </div>
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', accents[accent])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}
