'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { AdminPage } from '@/components/admin/AdminPage';
import { EmptyState } from '@/components/admin/EmptyState';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { adminApi } from '@/lib/admin-api';
import { useToast } from '@/contexts/ToastContext';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Laptop } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const load = () => {
    setLoading(true);
    adminApi
      .getProducts()
      .then(setProducts)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { void load(); }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await adminApi.deleteProduct(deleteId);
      toast.success('Product deleted');
      setDeleteId(null);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminPage
      title="Products"
      subtitle={`${products.length} laptops in catalog`}
      actions={
        <Link href="/admin/products/new" className="btn-primary text-body-sm py-2.5">
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      }
    >
      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          className="input-field pl-11 bg-white/5 border-white/10 text-text-primary"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 rounded-card shimmer" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Laptop}
          title="No products"
          description="Add your first laptop to the catalog."
          action={
            <Link href="/admin/products/new" className="btn-primary">
              <Plus className="w-4 h-4" />
              Add Product
            </Link>
          }
        />
      ) : (
        <div className="rounded-[20px] bg-surface/50 backdrop-blur-md shadow-soft border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-caption text-text-muted uppercase tracking-wide">
                  <th className="px-5 py-4 font-medium">Product</th>
                  <th className="px-5 py-4 font-medium hidden md:table-cell">Price</th>
                  <th className="px-5 py-4 font-medium hidden sm:table-cell">Stock</th>
                  <th className="px-5 py-4 font-medium hidden lg:table-cell">Featured</th>
                  <th className="px-5 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {p.images?.[0] ? (
                          <img src={p.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover bg-white/5" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-white/5" />
                        )}
                        <div>
                          <p className="font-medium text-body-sm text-text-primary">{p.name}</p>
                          <p className="text-caption text-text-muted">{p.brand?.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell text-body-sm font-medium">
                      {formatPrice(p.sale_price || p.price)}
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className={`badge ${p.in_stock ? 'badge-green' : 'badge-red'}`}>
                        {p.in_stock ? 'In Stock' : 'Out'}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      {p.featured && <span className="badge-accent">Featured</span>}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/products/${p.id}`}
                          className="p-2 rounded-lg hover:bg-accent/10 text-accent transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteId(p.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!deleteId}
        title="Delete product?"
        message="This cannot be undone."
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </AdminPage>
  );
}
