'use client';

import { useEffect, useState } from 'react';
import { Search, Check, Trash2, Mail } from 'lucide-react';
import { AdminPage } from '@/components/admin/AdminPage';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { EmptyState } from '@/components/admin/EmptyState';
import { adminApi } from '@/lib/admin-api';
import { useToast } from '@/contexts/ToastContext';
import type { ContactInquiry } from '@/types';
import { formatDate, cn } from '@/lib/utils';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const toast = useToast();

  const load = () => {
    setLoading(true);
    adminApi.getInquiries().then(setInquiries).catch((e) => toast.error(e.message)).finally(() => setLoading(false));
  };

  useEffect(() => { void load(); }, []);

  const filtered = inquiries.filter((i) => {
    const matchSearch =
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.email?.toLowerCase().includes(search.toLowerCase()) ||
      i.message.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'unread' ? !i.read : i.read);
    return matchSearch && matchFilter;
  });

  const markRead = async (id: string) => {
    try {
      await adminApi.markInquiryRead(id);
      load();
      toast.success('Marked as resolved');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed');
    }
  };

  return (
    <AdminPage title="Inquiries" subtitle="Contact form submissions">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input className="input-field pl-11" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {(['all', 'unread', 'read'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-2 rounded-pill text-body-sm font-medium capitalize transition-colors',
                filter === f ? 'bg-accent text-white' : 'bg-white/5 text-text-muted border border-white/10 hover:bg-white/10'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-24 shimmer rounded-card" />)}</div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Mail} title="No inquiries" description="New messages will appear here." />
      ) : (
        <div className="space-y-4">
          {filtered.map((inq) => (
            <div
              key={inq.id}
              className={cn(
                'rounded-[20px] p-5 lg:p-6 border transition-all',
                inq.read ? 'bg-white border-white/10 shadow-soft' : 'bg-accent/5 border-accent/20 shadow-soft'
              )}
            >
              <div className="flex flex-wrap justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-text-primary">{inq.name}</p>
                  <p className="text-body-sm text-text-muted">{inq.email}{inq.phone ? ` · ${inq.phone}` : ''}</p>
                </div>
                <span className="text-caption text-text-muted">{formatDate(inq.created_at)}</span>
              </div>
              <p className="text-body-md text-text-primary leading-relaxed">{inq.message}</p>
              <div className="flex gap-2 mt-4">
                {!inq.read && (
                  <button type="button" onClick={() => markRead(inq.id)} className="btn-outline text-body-sm py-2">
                    <Check className="w-4 h-4" />
                    Mark resolved
                  </button>
                )}
                <button type="button" onClick={() => setDeleteId(inq.id)} className="btn-ghost text-body-sm py-2 text-red-500 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={!!deleteId}
        title="Delete inquiry?"
        message="This message will be permanently removed."
        loading={busy}
        onCancel={() => setDeleteId(null)}
        onConfirm={async () => {
          if (!deleteId) return;
          setBusy(true);
          try {
            await adminApi.deleteInquiry(deleteId);
            toast.success('Deleted');
            setDeleteId(null);
            load();
          } catch (e) {
            toast.error(e instanceof Error ? e.message : 'Failed');
          } finally {
            setBusy(false);
          }
        }}
      />
    </AdminPage>
  );
}
