'use client';

import { Shield, Key, Lock, Fingerprint, EyeOff, FileKey2 } from 'lucide-react';
import { AdminPage } from '@/components/admin/AdminPage';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

export default function SecurityVaultPage() {
  const { user } = useAdminAuth();

  return (
    <AdminPage title="Security Vault" subtitle="Manage cryptographic keys, API secrets, and access policies.">
      <div className="grid gap-6 lg:grid-cols-2 max-w-6xl">
        {/* API Secrets */}
        <section className="rounded-[20px] bg-surface shadow-soft border border-white/10 p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Key className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="font-display font-semibold text-heading-sm">API Secrets</h2>
          </div>
          <p className="text-body-sm text-text-muted mb-6">
            Production API keys and database credentials. Do not share these with unauthorized personnel.
          </p>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between">
              <div>
                <p className="font-medium text-[13px] text-text-primary">Supabase Service Key</p>
                <p className="text-caption text-text-muted mt-1 font-mono">sk_prod_*********************</p>
              </div>
              <button className="btn-ghost px-3 py-1.5 text-xs text-text-muted hover:text-accent">
                <EyeOff className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between">
              <div>
                <p className="font-medium text-[13px] text-text-primary">WhatsApp Business API</p>
                <p className="text-caption text-text-muted mt-1 font-mono">wa_biz_*********************</p>
              </div>
              <button className="btn-ghost px-3 py-1.5 text-xs text-text-muted hover:text-accent">
                <EyeOff className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Access Policies */}
        <section className="rounded-[20px] bg-surface shadow-soft border border-white/10 p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Fingerprint className="w-5 h-5 text-accent" />
            </div>
            <h2 className="font-display font-semibold text-heading-sm">Access Control</h2>
          </div>
          <p className="text-body-sm text-text-muted mb-6">
            Current IP whitelisting and Two-Factor Authentication (2FA) status.
          </p>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-text-muted" />
                <div>
                  <p className="text-[14px] font-medium text-text-primary">Strict IP Whitelist</p>
                  <p className="text-caption text-text-muted">Only allow login from recognized IPs</p>
                </div>
              </div>
              <div className="w-10 h-6 bg-accent rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-text-muted" />
                <div>
                  <p className="text-[14px] font-medium text-text-primary">Require 2FA</p>
                  <p className="text-caption text-text-muted">Enforce MFA for all admin accounts</p>
                </div>
              </div>
              <div className="w-10 h-6 bg-accent rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" />
              </div>
            </div>
          </div>
        </section>

        {/* Audit Logs */}
        <section className="rounded-[20px] bg-surface shadow-soft border border-white/10 p-6 lg:p-8 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-deals/10 flex items-center justify-center">
              <FileKey2 className="w-5 h-5 text-deals" />
            </div>
            <h2 className="font-display font-semibold text-heading-sm">Recent Audit Logs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="text-text-muted border-b border-white/10">
                <tr>
                  <th className="pb-3 font-medium">Timestamp</th>
                  <th className="pb-3 font-medium">Event</th>
                  <th className="pb-3 font-medium">IP Address</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-3 text-text-muted">Just now</td>
                  <td className="py-3 font-medium text-text-primary">Admin Login ({user?.email})</td>
                  <td className="py-3 text-text-muted font-mono">192.168.1.1</td>
                  <td className="py-3"><span className="text-whatsapp font-medium bg-whatsapp/10 px-2 py-0.5 rounded-full text-[11px]">Success</span></td>
                </tr>
                <tr>
                  <td className="py-3 text-text-muted">2 hours ago</td>
                  <td className="py-3 font-medium text-text-primary">Settings Updated</td>
                  <td className="py-3 text-text-muted font-mono">192.168.1.1</td>
                  <td className="py-3"><span className="text-whatsapp font-medium bg-whatsapp/10 px-2 py-0.5 rounded-full text-[11px]">Success</span></td>
                </tr>
                <tr>
                  <td className="py-3 text-text-muted">Yesterday</td>
                  <td className="py-3 font-medium text-text-primary">Failed Login Attempt</td>
                  <td className="py-3 text-text-muted font-mono">45.22.11.9</td>
                  <td className="py-3"><span className="text-red-500 font-medium bg-red-500/10 px-2 py-0.5 rounded-full text-[11px]">Blocked</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminPage>
  );
}
