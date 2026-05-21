'use client';

import { Server, Database, Cloud, Zap, RefreshCw, HardDrive } from 'lucide-react';
import { AdminPage } from '@/components/admin/AdminPage';

export default function SystemConfigPage() {
  return (
    <AdminPage title="System Config" subtitle="Core platform configurations, database health, and caching limits.">
      <div className="grid gap-6 lg:grid-cols-2 max-w-6xl">
        {/* Environment Status */}
        <section className="rounded-[20px] bg-surface shadow-soft border border-white/10 p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Server className="w-5 h-5 text-accent" />
              </div>
              <h2 className="font-display font-semibold text-heading-sm">Environment</h2>
            </div>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-whatsapp opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-whatsapp"></span>
            </span>
          </div>
          
          <div className="space-y-4 text-body-sm">
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-text-muted">Runtime</span>
              <span className="font-mono font-medium text-text-primary">Node.js v20.x</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-text-muted">Framework</span>
              <span className="font-mono font-medium text-text-primary">Next.js 14.2 (App Router)</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-text-muted">Deployment Region</span>
              <span className="font-mono font-medium text-text-primary">iad1 (US East)</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-text-muted">Memory Usage</span>
              <span className="font-mono font-medium text-text-primary">245 MB / 1024 MB</span>
            </div>
          </div>
        </section>

        {/* Database Health */}
        <section className="rounded-[20px] bg-surface shadow-soft border border-white/10 p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-whatsapp/10 flex items-center justify-center">
                <Database className="w-5 h-5 text-whatsapp" />
              </div>
              <h2 className="font-display font-semibold text-heading-sm">Database Sync</h2>
            </div>
            <button className="btn-ghost p-2 text-text-muted hover:text-accent">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <p className="text-caption text-text-muted mb-1">Response Time</p>
              <p className="text-xl font-display font-bold text-text-primary">24ms</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <p className="text-caption text-text-muted mb-1">Active Pools</p>
              <p className="text-xl font-display font-bold text-text-primary">4 / 15</p>
            </div>
          </div>

          <div className="w-full bg-white/5 rounded-full h-1.5 mb-2">
            <div className="bg-whatsapp h-1.5 rounded-full" style={{ width: '12%' }}></div>
          </div>
          <p className="text-caption text-text-muted">Storage: 60 MB of 500 MB limit used</p>
        </section>

        {/* Cache & CDN */}
        <section className="rounded-[20px] bg-surface shadow-soft border border-white/10 p-6 lg:p-8 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Cloud className="w-5 h-5 text-purple-500" />
              </div>
              <h2 className="font-display font-semibold text-heading-sm">Edge Network & Caching</h2>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-white/10 bg-white/5 rounded-[16px] p-5 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
                <Zap className="w-16 h-16 text-purple-500" />
              </div>
              <p className="text-[14px] font-medium text-text-primary mb-1">Static Regeneration</p>
              <p className="text-caption text-text-muted mb-4">ISR Revalidation interval</p>
              <p className="text-2xl font-display font-bold text-purple-500">3600s</p>
            </div>

            <div className="border border-white/10 bg-white/5 rounded-[16px] p-5 relative overflow-hidden group hover:border-accent/50 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
                <HardDrive className="w-16 h-16 text-accent" />
              </div>
              <p className="text-[14px] font-medium text-text-primary mb-1">Image Optimization</p>
              <p className="text-caption text-text-muted mb-4">Vercel Image Cache TTL</p>
              <p className="text-2xl font-display font-bold text-accent">31d</p>
            </div>

            <div className="border border-white/10 bg-white/5 rounded-[16px] p-5 relative overflow-hidden flex flex-col justify-between">
              <div>
                <p className="text-[14px] font-medium text-text-primary mb-1">Purge Cache</p>
                <p className="text-caption text-text-muted">Force CDN cache invalidation</p>
              </div>
              <button className="w-full mt-4 py-2 px-4 rounded-xl bg-red-500/10 border border-red-500/20 text-[13px] font-medium text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                Purge All
              </button>
            </div>
          </div>
        </section>
      </div>
    </AdminPage>
  );
}
