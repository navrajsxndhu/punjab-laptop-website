'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Laptop, Mail, Flame, FileText, Package, ArrowRight, Plus } from 'lucide-react';
import { AdminPage } from '@/components/admin/AdminPage';
import { StatCard } from '@/components/admin/StatCard';
import { adminApi } from '@/lib/admin-api';
import { useToast } from '@/contexts/ToastContext';
import type { AdminStats, ContactInquiry } from '@/types';
import { timeAgo } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function AdminDashboardPage() {
  const toast = useToast();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    Promise.all([adminApi.getStats(), adminApi.getRecentInquiries()])
      .then(([s, i]) => {
        setStats(s.data);
        setInquiries(i.data);
      })
      .catch((e) => {
        const msg = e instanceof Error ? e.message : 'Failed to load dashboard';
        setError(msg);
        toast.error(msg);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const quickActions = [
    { href: '/admin/products/new', label: 'Add Product', icon: Plus },
    { href: '/admin/offers', label: 'New Offer', icon: Flame },
    { href: '/admin/blog', label: 'Write Blog', icon: FileText },
    { href: '/admin/inquiries', label: 'View Inquiries', icon: Mail },
  ];

  return (
    <AdminPage title="Dashboard" subtitle="Overview of your store">
      {error && !loading && (
        <div className="mb-6 rounded-[20px] border border-red-200 bg-red-50 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <p className="text-body-sm text-red-700 flex-1">{error}</p>
          <button
            type="button"
            onClick={load}
            className="text-body-sm font-semibold text-accent hover:underline shrink-0"
          >
            Retry
          </button>
        </div>
      )}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-[20px] shimmer" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            <StatCard label="Total Products" value={stats?.totalProducts ?? 0} icon={Laptop} index={0} />
            <StatCard
              label="In Stock"
              value={stats?.inStockProducts ?? 0}
              icon={Package}
              index={1}
              accent="green"
              trend={`${(stats?.totalProducts ?? 0) - (stats?.inStockProducts ?? 0)} out of stock`}
            />
            <StatCard
              label="Unread Inquiries"
              value={stats?.unreadInquiries ?? 0}
              icon={Mail}
              index={2}
              accent="amber"
            />
            <StatCard
              label="Active Offers"
              value={stats?.activeOffers ?? 0}
              icon={Flame}
              index={3}
              accent="violet"
              trend={`${stats?.publishedPosts ?? 0} blog posts live`}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-[20px] bg-white shadow-soft border border-gray-100/80 p-6">
                <h2 className="font-display font-semibold text-heading-sm mb-4">Quick Actions</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {quickActions.map((a, i) => (
                    <Link key={a.href} href={a.href}>
                      <motion.div
                        className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-accent/5 border border-transparent hover:border-accent/20 transition-all"
                        whileHover={{ x: 2 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <a.icon className="w-5 h-5 text-accent" />
                        <span className="font-medium text-body-sm text-text-primary">{a.label}</span>
                        <ArrowRight className="w-4 h-4 text-gray-300 ml-auto" />
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] bg-white shadow-soft border border-gray-100/80 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-semibold text-heading-sm">Inventory</h2>
                  <Link href="/admin/products" className="text-caption text-accent font-medium">
                    Manage →
                  </Link>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-body-sm">
                    <span className="text-text-muted">In stock</span>
                    <span className="font-semibold text-whatsapp">{stats?.inStockProducts ?? 0}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      className="h-full bg-whatsapp rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: stats?.totalProducts
                          ? `${((stats.inStockProducts / stats.totalProducts) * 100).toFixed(0)}%`
                          : '0%',
                      }}
                      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  </div>
                  <p className="text-caption text-text-muted">
                    {stats?.totalBlogPosts ?? 0} total blog posts · {stats?.totalOffers ?? 0} offers
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[20px] bg-white shadow-soft border border-gray-100/80 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-heading-sm">Recent Inquiries</h2>
                <Link href="/admin/inquiries" className="text-caption text-accent font-medium">
                  All →
                </Link>
              </div>
              {inquiries.length === 0 ? (
                <p className="text-body-sm text-text-muted py-8 text-center">No inquiries yet</p>
              ) : (
                <ul className="space-y-3">
                  {inquiries.map((inq) => (
                    <li
                      key={inq.id}
                      className={`p-3 rounded-xl border ${inq.read ? 'border-gray-100 bg-gray-50/50' : 'border-accent/20 bg-accent/5'}`}
                    >
                      <div className="flex justify-between gap-2">
                        <span className="font-medium text-body-sm text-text-primary">{inq.name}</span>
                        <span className="text-caption text-text-muted shrink-0">{timeAgo(inq.created_at)}</span>
                      </div>
                      <p className="text-caption text-text-muted line-clamp-2 mt-1">{inq.message}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </AdminPage>
  );
}
