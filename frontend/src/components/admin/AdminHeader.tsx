'use client';

import { Menu, LogOut, Bell } from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { motion } from 'framer-motion';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
  actions?: React.ReactNode;
}

export function AdminHeader({ title, subtitle, onMenuClick, actions }: AdminHeaderProps) {
  const { user, logout } = useAdminAuth();

  return (
    <header className="sticky top-0 z-30 glass border-b border-gray-100/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-4 lg:px-8 h-16">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h1 className="font-display font-semibold text-heading-sm text-text-primary truncate">{title}</h1>
            {subtitle && <p className="text-caption text-text-muted truncate">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {actions}
          <span className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-pill bg-gray-50 text-caption text-text-muted">
            <Bell className="w-3.5 h-3.5" />
            {user?.name || user?.email}
          </span>
          <motion.button
            type="button"
            onClick={logout}
            className="p-2.5 rounded-xl text-text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
            whileTap={{ scale: 0.95 }}
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </header>
  );
}
