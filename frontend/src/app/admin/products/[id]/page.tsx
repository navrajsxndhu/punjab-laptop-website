'use client';

import { AdminPage } from '@/components/admin/AdminPage';
import { ProductForm } from '@/components/admin/ProductForm';

export default function EditProductPage({ params }: { params: { id: string } }) {
  return (
    <AdminPage title="Edit Product" subtitle="Update laptop details">
      <ProductForm productId={params.id} />
    </AdminPage>
  );
}
