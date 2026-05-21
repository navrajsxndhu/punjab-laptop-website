'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Laptop,
  Flame,
  FileText,
  Image,
  Mail,
  Settings,
  Star,
  Shield,
  Server,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BUSINESS } from '@/lib/constants';

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/products', label: 'Products', icon: Laptop },
  { href: '/admin/offers', label: 'Offers', icon: Flame },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/banners', label: 'Banners', icon: Image },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin/inquiries', label: 'Inquiries', icon: Mail },
  { href: '/admin/vault', label: 'Security Vault', icon: Shield },
  // { href: '/admin/config', label: 'System Config', icon: Server },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

interface AdminSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const content = (
    <div className="flex flex-col h-full">
      <div className="px-5 py-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2.5" onClick={onClose}>
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
            <Laptop className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-display font-bold text-white text-[14px] block leading-tight">Admin</span>
            <span className="text-[10px] text-white/50 uppercase tracking-wider">{BUSINESS.name}</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname?.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} onClick={onClose}>
              <motion.span
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors',
                    active
                      ? 'bg-accent/10 text-accent'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className={cn('w-[18px] h-[18px]', active && 'text-accent')} />
                {item.label}
              </motion.span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          target="_blank"
          className="text-caption text-white/50 hover:text-white transition-colors"
        >
          View live site →
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-background border-r border-white/10 fixed left-0 top-0 bottom-0 z-40">
        {content}
      </aside>

      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-background border-r border-white/10 z-50 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            {content}
          </motion.aside>
        </>
      )}
    </>
  );
}
