'use client';

import { ExternalLink, LogOut, Shield } from 'lucide-react';
import Link from 'next/link';
import { AdminPage } from '@/components/admin/AdminPage';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { BUSINESS } from '@/lib/constants';

export default function AdminSettingsPage() {
  const { user, logout } = useAdminAuth();

  return (
    <AdminPage title="Settings" subtitle="Account and store preferences">
      <div className="max-w-2xl space-y-6">
        <section className="rounded-[20px] bg-surface/50 backdrop-blur-md shadow-soft border border-white/10 p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <h2 className="font-display font-semibold text-heading-sm">Account</h2>
          </div>
          <dl className="space-y-4 text-body-sm">
            <div className="flex justify-between py-2 border-b border-gray-50">
              <dt className="text-text-muted">Name</dt>
              <dd className="font-medium text-text-primary">{user?.name}</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <dt className="text-text-muted">Email</dt>
              <dd className="font-medium text-text-primary">{user?.email}</dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-text-muted">Role</dt>
              <dd className="font-medium text-text-primary capitalize">{user?.role}</dd>
            </div>
          </dl>
          <button type="button" onClick={logout} className="btn-outline mt-6 text-red-400 border-red-500/20 hover:bg-red-500/10 hover:border-red-500/30">
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </section>

        <section className="rounded-[20px] bg-surface/50 backdrop-blur-md shadow-soft border border-white/10 p-6 lg:p-8">
          <h2 className="font-display font-semibold text-heading-sm mb-4">Store</h2>
          <p className="text-body-sm text-text-muted mb-4">{BUSINESS.address}</p>
          <p className="text-body-sm text-text-muted">WhatsApp: +91 {BUSINESS.phone}</p>
          <Link href="/" target="_blank" className="inline-flex items-center gap-2 mt-6 text-accent font-medium text-body-sm hover:underline">
            View public website
            <ExternalLink className="w-4 h-4" />
          </Link>
        </section>

        <section className="rounded-[20px] glass border border-white/10 p-6 text-caption text-text-muted">
          <p>API: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}</p>
          <p className="mt-2">Change default admin password in Supabase before production deployment.</p>
        </section>
      </div>
    </AdminPage>
  );
}
