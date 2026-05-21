'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminSidebar } from './AdminSidebar';
import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuthContext';
import { ToastProvider } from '@/contexts/ToastContext';

function AdminShellInner({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loading, user } = useAdminAuth();
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  if (isLogin) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64 min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex-1 flex flex-col"
            onAnimationStart={() => setSidebarOpen(false)}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* expose menu toggle via clone - pages use AdminPage wrapper */}
      <span className="hidden" data-admin-menu onClick={() => setSidebarOpen(true)} />
      <AdminMenuBridge onOpen={() => setSidebarOpen(true)} />
    </div>
  );
}

function AdminMenuBridge({ onOpen }: { onOpen: () => void }) {
  if (typeof window !== 'undefined') {
    (window as Window & { __adminOpenMenu?: () => void }).__adminOpenMenu = onOpen;
  }
  return null;
}

export function useAdminMenu() {
  return () => {
    (window as Window & { __adminOpenMenu?: () => void }).__adminOpenMenu?.();
  };
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AdminAuthProvider>
        <AdminShellInner>{children}</AdminShellInner>
      </AdminAuthProvider>
    </ToastProvider>
  );
}
