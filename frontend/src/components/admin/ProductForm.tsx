'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save } from 'lucide-react';
import { adminApi } from '@/lib/admin-api';
import { useToast } from '@/contexts/ToastContext';
import { slugify } from '@/lib/utils';
import { ImageUploader } from './ImageUploader';
import type { Brand, Category } from '@/types';

const CONDITIONS = ['new', 'like-new', 'excellent', 'good', 'refurbished'] as const;

interface ProductFormProps {
  productId?: string;
}

const empty = {
  name: '',
  slug: '',
  brand_id: '',
  category_id: '',
  processor: '',
  ram: '',
  storage: '',
  display_size: '',
  graphics: '',
  os: '',
  price: '',
  sale_price: '',
  warranty: '',
  description: '',
  condition: 'excellent' as (typeof CONDITIONS)[number],
  in_stock: true,
  featured: false,
  images: [] as string[],
};

export function ProductForm({ productId }: ProductFormProps) {
  const router = useRouter();
  const toast = useToast();
  const [form, setForm] = useState(empty);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(!!productId);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([adminApi.getBrands(), adminApi.getCategories()]).then(([b, c]) => {
      setBrands(b);
      setCategories(c);
    });
  }, []);

  useEffect(() => {
    if (!productId) return;
    adminApi
      .getProductById(productId)
      .then((p) => {
        setForm({
          name: p.name,
          slug: p.slug,
          brand_id: p.brand_id,
          category_id: p.category_id,
          processor: p.processor || '',
          ram: p.ram || '',
          storage: p.storage || '',
          display_size: p.display_size || '',
          graphics: p.graphics || '',
          os: p.os || '',
          price: String(p.price),
          sale_price: p.sale_price ? String(p.sale_price) : '',
          warranty: p.warranty || '',
          description: p.description || '',
          condition: p.condition,
          in_stock: p.in_stock,
          featured: p.featured,
          images: p.images || [],
        });
      })
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, [productId, toast]);

  const set = (key: keyof typeof empty, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        slug: form.slug || slugify(form.name),
        brand_id: form.brand_id,
        category_id: form.category_id,
        processor: form.processor || null,
        ram: form.ram || null,
        storage: form.storage || null,
        display_size: form.display_size || null,
        graphics: form.graphics || null,
        os: form.os || null,
        price: parseFloat(form.price),
        sale_price: form.sale_price ? parseFloat(form.sale_price) : null,
        warranty: form.warranty || null,
        description: form.description || null,
        condition: form.condition,
        in_stock: form.in_stock,
        featured: form.featured,
        images: form.images,
        specs: {},
      };

      if (productId) {
        await adminApi.updateProduct(productId, payload);
        toast.success('Product updated');
      } else {
        await adminApi.createProduct(payload);
        toast.success('Product created');
      }
      router.push('/admin/products');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="rounded-[20px] bg-white shadow-soft border border-gray-100 p-6 lg:p-8 space-y-5">
        <h2 className="font-display font-semibold text-heading-sm">Basic Info</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Product Name *">
            <input
              className="input-field"
              value={form.name}
              onChange={(e) => {
                set('name', e.target.value);
                if (!productId) set('slug', slugify(e.target.value));
              }}
              required
            />
          </Field>
          <Field label="Slug *">
            <input className="input-field" value={form.slug} onChange={(e) => set('slug', e.target.value)} required />
          </Field>
          <Field label="Brand *">
            <select className="input-field" value={form.brand_id} onChange={(e) => set('brand_id', e.target.value)} required>
              <option value="">Select brand</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Category *">
            <select className="input-field" value={form.category_id} onChange={(e) => set('category_id', e.target.value)} required>
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Description">
          <textarea className="input-field resize-none" rows={4} value={form.description} onChange={(e) => set('description', e.target.value)} />
        </Field>
      </div>

      <div className="rounded-[20px] bg-white shadow-soft border border-gray-100 p-6 lg:p-8 space-y-5">
        <h2 className="font-display font-semibold text-heading-sm">Specifications</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {(['processor', 'ram', 'storage', 'display_size', 'graphics', 'os', 'warranty'] as const).map((key) => (
            <Field key={key} label={key.replace('_', ' ')}>
              <input className="input-field" value={form[key]} onChange={(e) => set(key, e.target.value)} />
            </Field>
          ))}
          <Field label="Condition">
            <select className="input-field" value={form.condition} onChange={(e) => set('condition', e.target.value)}>
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <div className="rounded-[20px] bg-white shadow-soft border border-gray-100 p-6 lg:p-8 space-y-5">
        <h2 className="font-display font-semibold text-heading-sm">Pricing & Status</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Price (₹) *">
            <input type="number" className="input-field" value={form.price} onChange={(e) => set('price', e.target.value)} required min={0} />
          </Field>
          <Field label="Sale Price (₹)">
            <input type="number" className="input-field" value={form.sale_price} onChange={(e) => set('sale_price', e.target.value)} min={0} />
          </Field>
        </div>
        <div className="flex flex-wrap gap-6">
          <Toggle label="In Stock" checked={form.in_stock} onChange={(v) => set('in_stock', v)} />
          <Toggle label="Featured" checked={form.featured} onChange={(v) => set('featured', v)} />
        </div>
      </div>

      <div className="rounded-[20px] bg-white shadow-soft border border-gray-100 p-6 lg:p-8">
        <ImageUploader label="Product Images" value={form.images} onChange={(urls) => set('images', urls)} folder="products" />
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {productId ? 'Update Product' : 'Create Product'}
        </button>
        <button type="button" className="btn-ghost" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-body-sm font-medium text-text-primary block mb-2 capitalize">{label}</label>
      {children}
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-pill transition-colors ${checked ? 'bg-accent' : 'bg-gray-200'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
      </button>
      <span className="text-body-sm font-medium text-text-primary">{label}</span>
    </label>
  );
}
