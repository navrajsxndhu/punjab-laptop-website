// ============================================================
// Punjab Laptop Sirsa — Shared TypeScript Types
// ============================================================

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand_id: string;
  category_id: string;
  processor: string;
  ram: string;
  storage: string;
  display_size: string;
  graphics: string;
  os: string;
  price: number;
  sale_price: number | null;
  images: string[];
  specs: Record<string, string>;
  description: string;
  in_stock: boolean;
  featured: boolean;
  warranty: string;
  condition: 'new' | 'like-new' | 'excellent' | 'good' | 'refurbished';
  created_at: string;
  updated_at: string;
  // Joined fields
  brand?: Brand;
  category?: Category;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  sort_order: number;
  created_at: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  created_at: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount_type: 'percentage' | 'flat' | 'special';
  discount_value: number | null;
  valid_from: string;
  valid_until: string;
  banner_image: string;
  product_ids: string[];
  active: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  avatar_url: string | null;
  location: string;
  verified: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  author: string;
  tags: string[];
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  link: string;
  active: boolean;
  sort_order: number;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'superadmin';
  created_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  success: boolean;
}

export interface ProductFilters {
  brand?: string;
  category?: string;
  processor?: string;
  ram?: string;
  storage?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
  page?: number;
  limit?: number;
  in_stock?: boolean;
  featured?: boolean;
  condition?: string;
}

export interface AdminStats {
  totalProducts: number;
  inStockProducts: number;
  totalInquiries: number;
  unreadInquiries: number;
  totalOffers: number;
  activeOffers: number;
  totalBlogPosts: number;
  publishedPosts: number;
}
