'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, FileText, X } from 'lucide-react';
import { AdminPage } from '@/components/admin/AdminPage';
import { EmptyState } from '@/components/admin/EmptyState';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { adminApi } from '@/lib/admin-api';
import { useToast } from '@/contexts/ToastContext';
import { slugify } from '@/lib/utils';
import type { BlogPost } from '@/types';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', cover_image: '', tags: '', published: false, author: 'Punjab Laptop Sirsa' });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const toast = useToast();

  const load = () => adminApi.getBlogPosts().then(setPosts).catch((e) => toast.error(e.message)).finally(() => setLoading(false));
  useEffect(() => { void load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ title: '', slug: '', excerpt: '', content: '', cover_image: '', tags: '', published: false, author: 'Punjab Laptop Sirsa' });
    setOpen(true);
  };

  const openEdit = (p: BlogPost) => {
    setEditing(p);
    setForm({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || '',
      content: p.content,
      cover_image: p.cover_image || '',
      tags: (p.tags || []).join(', '),
      published: p.published,
      author: p.author,
    });
    setOpen(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug || slugify(form.title),
        excerpt: form.excerpt,
        content: form.content,
        cover_image: form.cover_image || null,
        author: form.author,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        published: form.published,
      };
      if (editing) {
        await adminApi.updateBlogPost(editing.id, payload);
        toast.success('Post updated');
      } else {
        await adminApi.createBlogPost(payload);
        toast.success('Post created');
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
      title="Blog"
      subtitle="Articles and buying guides"
      actions={
        <button type="button" onClick={openNew} className="btn-primary text-body-sm py-2.5">
          <Plus className="w-4 h-4" />
          New Post
        </button>
      }
    >
      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 shimmer rounded-card" />)}</div>
      ) : posts.length === 0 ? (
        <EmptyState icon={FileText} title="No posts" action={<button type="button" onClick={openNew} className="btn-primary">Write Post</button>} />
      ) : (
        <div className="rounded-[20px] bg-white shadow-soft border border-gray-100 divide-y divide-gray-50">
          {posts.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-4 hover:bg-gray-50/50 transition-colors">
              {p.cover_image && <img src={p.cover_image} alt="" className="w-14 h-14 rounded-lg object-cover" />}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-body-sm truncate">{p.title}</p>
                <p className="text-caption text-text-muted">{p.published ? 'Published' : 'Draft'} · /{p.slug}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button type="button" onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-accent/10 text-accent"><Pencil className="w-4 h-4" /></button>
                <button type="button" onClick={() => setDeleteId(p.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 z-50" onClick={() => setOpen(false)} />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-4 lg:inset-10 bg-white rounded-[20px] shadow-2xl z-50 overflow-y-auto">
              <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-5">
                <div className="flex justify-between">
                  <h2 className="font-display font-semibold text-heading-md">{editing ? 'Edit Post' : 'New Post'}</h2>
                  <button type="button" onClick={() => setOpen(false)}><X className="w-5 h-5" /></button>
                </div>
                <input className="input-field" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })} />
                <input className="input-field" placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                <textarea className="input-field resize-none" rows={2} placeholder="Excerpt (SEO)" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
                <input className="input-field" placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
                <ImageUploader value={form.cover_image ? [form.cover_image] : []} onChange={(u) => setForm({ ...form, cover_image: u[0] || '' })} multiple={false} folder="blog" />
                <RichTextEditor label="Content" value={form.content} onChange={(c) => setForm({ ...form, content: c })} minHeight="280px" />
                <label className="flex items-center gap-2"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /><span className="text-body-sm">Published</span></label>
                <button type="button" onClick={save} disabled={saving} className="btn-primary w-full">{saving ? 'Saving...' : 'Save Post'}</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ConfirmModal open={!!deleteId} title="Delete post?" message="Permanent deletion." onCancel={() => setDeleteId(null)} loading={saving} onConfirm={async () => {
        if (!deleteId) return;
        setSaving(true);
        try { await adminApi.deleteBlogPost(deleteId); toast.success('Deleted'); setDeleteId(null); load(); } catch (e) { toast.error(e instanceof Error ? e.message : 'Failed'); } finally { setSaving(false); }
      }} />
    </AdminPage>
  );
}
