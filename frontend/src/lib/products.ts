import { api } from './api';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_BRANDS, MOCK_TESTIMONIALS, MOCK_OFFERS } from './mock-data';
import type { Product, Category, Brand, Testimonial, Offer } from '@/types';

type SupabaseJoin<T> = T & {
  brands?: { name: string; slug: string; logo_url?: string } | null;
  categories?: { name: string; slug: string; icon?: string } | null;
};

interface ProductsApiResponse {
  success: boolean;
  data: SupabaseJoin<Product>[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface SingleProductApiResponse {
  success: boolean;
  data: SupabaseJoin<Product>;
}

export function normalizeProduct(raw: SupabaseJoin<Product>): Product {
  const { brands, categories, ...rest } = raw;
  return {
    ...rest,
    brand: brands
      ? {
          id: rest.brand_id,
          name: brands.name,
          slug: brands.slug,
          logo_url: brands.logo_url || '',
          created_at: '',
        }
      : undefined,
    category: categories
      ? {
          id: rest.category_id,
          name: categories.name,
          slug: categories.slug,
          icon: categories.icon || '',
          description: '',
          sort_order: 0,
          created_at: '',
        }
      : undefined,
  };
}

export async function fetchProducts(params?: Record<string, string | number | boolean | undefined>): Promise<{
  products: Product[];
  meta: ProductsApiResponse['meta'];
}> {
  try {
    const res = await api.get<ProductsApiResponse>('/api/products', {
      params,
      next: { revalidate: 60 },
    });
    return {
      products: (res.data || []).map(normalizeProduct),
      meta: res.meta,
    };
  } catch {
    let products = [...MOCK_PRODUCTS];
    if (params?.featured === true || params?.featured === 'true') {
      products = products.filter((p) => p.featured);
    }
    if (params?.brand) {
      products = products.filter((p) => p.brand?.slug === params.brand);
    }
    if (params?.category) {
      products = products.filter((p) => p.category?.slug === params.category);
    }
    return {
      products,
      meta: { page: 1, limit: 12, total: products.length, totalPages: 1 },
    };
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await api.get<SingleProductApiResponse>(`/api/products/${slug}`, {
      next: { revalidate: 60 },
    });
    return normalizeProduct(res.data);
  } catch {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await api.get<{ success: boolean; data: Category[] }>('/api/categories', {
      next: { revalidate: 300 },
    });
    return res.data || [];
  } catch {
    return MOCK_CATEGORIES;
  }
}

export async function fetchBrands(): Promise<Brand[]> {
  try {
    const res = await api.get<{ success: boolean; data: Brand[] }>('/api/brands', {
      next: { revalidate: 300 },
    });
    return res.data || [];
  } catch {
    return MOCK_BRANDS;
  }
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await api.get<{ success: boolean; data: Testimonial[] }>('/api/testimonials', {
      next: { revalidate: 300 },
    });
    return res.data || [];
  } catch {
    return MOCK_TESTIMONIALS;
  }
}

export async function fetchOffers(): Promise<Offer[]> {
  try {
    const res = await api.get<{ success: boolean; data: Offer[] }>('/api/offers', {
      next: { revalidate: 120 },
    });
    return res.data || [];
  } catch {
    return MOCK_OFFERS;
  }
}
