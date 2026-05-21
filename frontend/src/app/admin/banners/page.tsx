'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { AdminPage } from '@/components/admin/AdminPage';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { adminApi } from '@/lib/admin-api';
import { useToast } from '@/contexts/ToastContext';
import type { Banner } from '@/types';

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [form, setForm] = useState({ title: '', subtitle: '', image_url: '', link: '/products', active: true, sort_order: 0 });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const load = () => adminApi.getBanners().then(setBanners).catch((e) => toast.error(e.message));
  useEffect(() => { void load(); }, []);

  const save = async () => {
    setSaving(true);
    try {
      if (editing) await adminApi.updateBanner(editing.id, form);
      else await adminApi.createBanner(form);
      toast.success('Banner saved');
      setOpen(false);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminPage title="Banners" subtitle="Homepage hero slides" actions={<button type="button" onClick={() => { setEditing(null); setForm({ title: '', subtitle: '', image_url: '', link: '/products', active: true, sort_order: banners.length }); setOpen(true); }} className="btn-primary text-body-sm py-2.5"><Plus className="w-4 h-4" />Add Banner</button>}>
      <div className="grid md:grid-cols-2 gap-4">
        {banners.map((b, i) => (
          <motion.div key={b.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-[20px] overflow-hidden shadow-soft bg-white border border-gray-100">
            <div className="aspect-[21/9] bg-gray-100 relative">
              {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="p-4 flex justify-between items-start gap-3">
              <div>
                <p className="font-semibold text-body-sm">{b.title || 'Untitled'}</p>
                <p className="text-caption text-text-muted line-clamp-1">{b.subtitle}</p>
                <span className={`badge text-xs mt-2 ${b.active ? 'badge-green' : ''}`}>{b.active ? 'Active' : 'Hidden'}</span>
              </div>
              <div className="flex gap-1">
                <button type="button" onClick={() => { setEditing(b); setForm({ title: b.title || '', subtitle: b.subtitle || '', image_url: b.image_url, link: b.link || '', active: b.active, sort_order: b.sort_order }); setOpen(true); }} className="p-2 hover:bg-accent/10 rounded-lg text-accent"><Pencil className="w-4 h-4" /></button>
                <button type="button" onClick={() => setDeleteId(b.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 z-50" onClick={() => setOpen(false)} />
            <motion.div initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }} className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 p-6 overflow-y-auto space-y-4">
              <div className="flex justify-between"><h2 className="font-display font-semibold">{editing ? 'Edit' : 'New'} Banner</h2><button type="button" onClick={() => setOpen(false)}><X /></button></div>
              <input className="input-field" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <input className="input-field" placeholder="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
              <input className="input-field" placeholder="Link (/products)" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
              <input type="number" className="input-field" placeholder="Sort order" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value, 10) || 0 })} />
              <ImageUploader value={form.image_url ? [form.image_url] : []} onChange={(u) => setForm({ ...form, image_url: u[0] || '' })} multiple={false} folder="banners" />
              <label className="flex gap-2 text-body-sm"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Active</label>
              <button type="button" onClick={save} disabled={saving || !form.image_url} className="btn-primary w-full">Save</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ConfirmModal open={!!deleteId} title="Delete banner?" message="" onCancel={() => setDeleteId(null)} loading={saving} onConfirm={async () => { if (!deleteId) return; setSaving(true); try { await adminApi.deleteBanner(deleteId); toast.success('Deleted'); setDeleteId(null); load(); } catch (e) { toast.error(e instanceof Error ? e.message : 'Failed'); } finally { setSaving(false); } }} />
    </AdminPage>
  );
}
