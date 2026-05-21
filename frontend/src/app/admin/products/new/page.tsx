'use client';

import { AdminPage } from '@/components/admin/AdminPage';
import { ProductForm } from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <AdminPage title="Add Product" subtitle="Create a new laptop listing">
      <ProductForm />
    </AdminPage>
  );
}
