'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Star, X } from 'lucide-react';
import { AdminPage } from '@/components/admin/AdminPage';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { adminApi } from '@/lib/admin-api';
import { useToast } from '@/contexts/ToastContext';
import type { Testimonial } from '@/types';

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ name: '', text: '', rating: 5, location: '', avatar_url: '', verified: true });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const load = () => adminApi.getTestimonials().then(setItems).catch((e) => toast.error(e.message));
  useEffect(() => { void load(); }, []);

  const save = async () => {
    setSaving(true);
    try {
      if (editing) await adminApi.updateTestimonial(editing.id, form);
      else await adminApi.createTestimonial(form);
      toast.success('Saved');
      setOpen(false);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminPage title="Testimonials" subtitle="Customer reviews" actions={<button type="button" onClick={() => { setEditing(null); setForm({ name: '', text: '', rating: 5, location: 'Sirsa', avatar_url: '', verified: true }); setOpen(true); }} className="btn-primary text-body-sm py-2.5"><Plus className="w-4 h-4" />Add</button>}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="p-5 rounded-[20px] bg-white shadow-soft border border-gray-100">
            <div className="flex gap-1 mb-2">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-deals text-deals" />)}</div>
            <p className="text-body-sm text-text-muted line-clamp-3">&ldquo;{t.text}&rdquo;</p>
            <p className="font-medium text-body-sm mt-3">{t.name}</p>
            {t.verified && <span className="badge-green text-xs mt-1">Verified</span>}
            <div className="flex gap-2 mt-4">
              <button type="button" onClick={() => { setEditing(t); setForm({ name: t.name, text: t.text, rating: t.rating, location: t.location || '', avatar_url: t.avatar_url || '', verified: t.verified }); setOpen(true); }} className="p-2 hover:bg-accent/10 rounded-lg text-accent"><Pencil className="w-4 h-4" /></button>
              <button type="button" onClick={() => setDeleteId(t.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 z-50" onClick={() => setOpen(false)} />
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-[20px] shadow-2xl z-50 p-6 space-y-4">
              <div className="flex justify-between"><h2 className="font-display font-semibold">{editing ? 'Edit' : 'New'} Testimonial</h2><button type="button" onClick={() => setOpen(false)}><X /></button></div>
              <input className="input-field" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <textarea className="input-field resize-none" rows={4} placeholder="Review text" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
              <input className="input-field" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              <select className="input-field" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value, 10) })}>{[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} stars</option>)}</select>
              <ImageUploader value={form.avatar_url ? [form.avatar_url] : []} onChange={(u) => setForm({ ...form, avatar_url: u[0] || '' })} multiple={false} folder="avatars" />
              <label className="flex gap-2 text-body-sm"><input type="checkbox" checked={form.verified} onChange={(e) => setForm({ ...form, verified: e.target.checked })} /> Verified badge</label>
              <button type="button" onClick={save} disabled={saving} className="btn-primary w-full">Save</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ConfirmModal open={!!deleteId} title="Delete?" message="" onCancel={() => setDeleteId(null)} loading={saving} onConfirm={async () => { if (!deleteId) return; setSaving(true); try { await adminApi.deleteTestimonial(deleteId); toast.success('Deleted'); setDeleteId(null); load(); } catch (e) { toast.error(e instanceof Error ? e.message : 'Failed'); } finally { setSaving(false); } }} />
    </AdminPage>
  );
}
