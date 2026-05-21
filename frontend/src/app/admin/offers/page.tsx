'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Flame, X } from 'lucide-react';
import { AdminPage } from '@/components/admin/AdminPage';
import { EmptyState } from '@/components/admin/EmptyState';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { adminApi } from '@/lib/admin-api';
import { useToast } from '@/contexts/ToastContext';
import type { Offer } from '@/types';

const emptyOffer = {
  title: '',
  description: '',
  discount_type: 'percentage' as 'percentage' | 'flat' | 'special',
  discount_value: '',
  valid_from: '',
  valid_until: '',
  banner_image: '',
  active: true,
};

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Offer | null>(null);
  const [form, setForm] = useState(emptyOffer);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const toast = useToast();

  const load = () => {
    adminApi.getOffers().then(setOffers).catch((e) => toast.error(e.message)).finally(() => setLoading(false));
  };

  useEffect(() => { void load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({
      ...emptyOffer,
      valid_from: new Date().toISOString().slice(0, 16),
      valid_until: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 16),
    });
    setOpen(true);
  };

  const openEdit = (o: Offer) => {
    setEditing(o);
    setForm({
      title: o.title,
      description: o.description || '',
      discount_type: o.discount_type,
      discount_value: o.discount_value != null ? String(o.discount_value) : '',
      valid_from: o.valid_from?.slice(0, 16) || '',
      valid_until: o.valid_until?.slice(0, 16) || '',
      banner_image: o.banner_image || '',
      active: o.active,
    });
    setOpen(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        discount_value: form.discount_type === 'special' ? null : parseFloat(form.discount_value || '0'),
        valid_from: new Date(form.valid_from).toISOString(),
        valid_until: new Date(form.valid_until).toISOString(),
      };
      if (editing) {
        await adminApi.updateOffer(editing.id, payload);
        toast.success('Offer updated');
      } else {
        await adminApi.createOffer(payload);
        toast.success('Offer created');
      }
      setOpen(false);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminPage
      title="Offers"
      subtitle="Manage deals and promotions"
      actions={
        <button type="button" onClick={openNew} className="btn-primary text-body-sm py-2.5">
          <Plus className="w-4 h-4" />
          Add Offer
        </button>
      }
    >
      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-40 rounded-card shimmer" />
          ))}
        </div>
      ) : offers.length === 0 ? (
        <EmptyState icon={Flame} title="No offers" action={<button type="button" onClick={openNew} className="btn-primary">Add Offer</button>} />
      ) : (
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          {offers.map((o, i) => (
            <motion.div
              key={o.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative rounded-[20px] overflow-hidden shadow-soft group min-h-[160px]"
            >
              {o.banner_image && <img src={o.banner_image} alt="" className="absolute inset-0 w-full h-full object-cover" />}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/70" />
              <div className="relative p-6 flex flex-col justify-between min-h-[160px]">
                <div>
                  <span className={`badge text-xs mb-2 ${o.active ? 'bg-whatsapp/20 text-white' : 'bg-white/20 text-white/70'}`}>
                    {o.active ? 'Active' : 'Inactive'}
                  </span>
                  <h3 className="font-display font-bold text-white text-heading-md">{o.title}</h3>
                  <p className="text-white/70 text-body-sm mt-1 line-clamp-2">{o.description}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button type="button" onClick={() => openEdit(o)} className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button type="button" onClick={() => setDeleteId(o.id)} className="p-2 rounded-lg bg-white/20 text-white hover:bg-red-500/50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 z-50" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6 lg:p-8 space-y-5">
                <div className="flex justify-between items-center">
                  <h2 className="font-display font-semibold text-heading-md">{editing ? 'Edit Offer' : 'New Offer'}</h2>
                  <button type="button" onClick={() => setOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <input className="input-field" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <textarea className="input-field resize-none" rows={3} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <select className="input-field" value={form.discount_type} onChange={(e) => setForm({ ...form, discount_type: e.target.value as typeof form.discount_type })}>
                  <option value="percentage">Percentage</option>
                  <option value="flat">Flat (₹)</option>
                  <option value="special">Special</option>
                </select>
                {form.discount_type !== 'special' && (
                  <input type="number" className="input-field" placeholder="Discount value" value={form.discount_value} onChange={(e) => setForm({ ...form, discount_value: e.target.value })} />
                )}
                <div className="grid grid-cols-2 gap-3">
                  <input type="datetime-local" className="input-field" value={form.valid_from} onChange={(e) => setForm({ ...form, valid_from: e.target.value })} />
                  <input type="datetime-local" className="input-field" value={form.valid_until} onChange={(e) => setForm({ ...form, valid_until: e.target.value })} />
                </div>
                <ImageUploader value={form.banner_image ? [form.banner_image] : []} onChange={(urls) => setForm({ ...form, banner_image: urls[0] || '' })} multiple={false} folder="offers" />
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
                  <span className="text-body-sm">Active</span>
                </label>
                <button type="button" onClick={save} disabled={saving} className="btn-primary w-full">
                  {saving ? 'Saving...' : 'Save Offer'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ConfirmModal
        open={!!deleteId}
        title="Delete offer?"
        message="This offer will be removed permanently."
        loading={saving}
        onConfirm={async () => {
          if (!deleteId) return;
          setSaving(true);
          try {
            await adminApi.deleteOffer(deleteId);
            toast.success('Deleted');
            setDeleteId(null);
            load();
          } catch (e) {
            toast.error(e instanceof Error ? e.message : 'Failed');
          } finally {
            setSaving(false);
          }
        }}
        onCancel={() => setDeleteId(null)}
      />
    </AdminPage>
  );
}
