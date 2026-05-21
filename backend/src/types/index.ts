import { Request } from 'express';

// ── Database Models ──────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  created_at: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand_id: string;
  category_id: string;
  processor: string | null;
  ram: string | null;
  storage: string | null;
  display_size: string | null;
  graphics: string | null;
  price: number;
  sale_price: number | null;
  images: string[];
  specs: Record<string, unknown> | null;
  in_stock: boolean;
  featured: boolean;
  warranty: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string | null;
  discount_type: string;
  discount_value: number;
  valid_from: string;
  valid_until: string;
  banner_image: string | null;
  products: string[];
  active: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  avatar_url: string | null;
  verified: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  author: string;
  tags: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  link: string | null;
  active: boolean;
  sort_order: number;
  created_at: string;
}

// ── API Types ────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AuthPayload {
  id: string;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  admin?: AuthPayload;
}

export interface ProductQueryParams {
  brand?: string;
  category?: string;
  processor?: string;
  ram?: string;
  storage?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  sort?: string;
  page?: string;
  limit?: string;
  featured?: string;
  in_stock?: string;
  condition?: string;
}

export interface AdminStats {
  totalProducts: number;
  totalInquiries: number;
  unreadInquiries: number;
  totalOffers: number;
  activeOffers: number;
  totalPosts: number;
  publishedPosts: number;
  totalBrands: number;
  totalCategories: number;
}
