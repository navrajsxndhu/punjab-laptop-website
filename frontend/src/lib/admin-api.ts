import { api } from './api';
import { normalizeProduct } from './products';
import type {
  AdminStats,
  AdminUser,
  Banner,
  BlogPost,
  Brand,
  Category,
  ContactInquiry,
  Offer,
  Product,
  Testimonial,
} from '@/types';

type ApiRes<T> = { success: boolean; data: T; message?: string };

export const adminApi = {
  login: (email: string, password: string) =>
    api.post<ApiRes<{ token: string; user: AdminUser }>>('/api/auth/login', { email, password }),

  verify: () => api.post<ApiRes<{ user: AdminUser }>>('/api/auth/verify'),

  refreshToken: () => api.post<ApiRes<{ token: string }>>('/api/auth/refresh'),

  updateCredentials: (data: Record<string, unknown>) => 
    api.put<ApiRes<null>>('/api/auth/credentials', data),

  getStats: () => api.get<ApiRes<AdminStats>>('/api/admin/stats'),

  getRecentInquiries: () => api.get<ApiRes<ContactInquiry[]>>('/api/admin/inquiries/recent'),

  getInquiries: () => api.get<ApiRes<ContactInquiry[]>>('/api/admin/inquiries').then((r) => r.data),

  markInquiryRead: (id: string) => api.patch<ApiRes<ContactInquiry>>(`/api/admin/inquiries/${id}/read`),

  deleteInquiry: (id: string) => api.delete<ApiRes<null>>(`/api/admin/inquiries/${id}`),

  uploadImage: (file: File, folder?: string) => {
    const fd = new FormData();
    fd.append('file', file);
    if (folder) fd.append('folder', folder);
    return api.upload<ApiRes<{ url: string; public_id: string }>>('/api/upload', fd);
  },

  getProducts: () =>
    api
      .get<{ success: boolean; data: Product[] }>('/api/products', { params: { limit: 200 } })
      .then((r) => (r.data || []).map((p) => normalizeProduct(p as Parameters<typeof normalizeProduct>[0]))),

  getProductById: async (id: string) => {
    const r = await api.get<ApiRes<Product>>(`/api/products/by-id/${id}`);
    return normalizeProduct(r.data as Parameters<typeof normalizeProduct>[0]);
  },

  createProduct: (data: Record<string, unknown>) => api.post<ApiRes<Product>>('/api/products', data),

  updateProduct: (id: string, data: Record<string, unknown>) =>
    api.put<ApiRes<Product>>(`/api/products/${id}`, data),

  deleteProduct: (id: string) => api.delete<ApiRes<null>>(`/api/products/${id}`),

  getBrands: () => api.get<ApiRes<Brand[]>>('/api/brands').then((r) => r.data),

  getCategories: () => api.get<ApiRes<Category[]>>('/api/categories').then((r) => r.data),

  getOffers: () => api.get<ApiRes<Offer[]>>('/api/offers/manage').then((r) => r.data),

  createOffer: (data: Record<string, unknown>) => api.post<ApiRes<Offer>>('/api/offers', data),

  updateOffer: (id: string, data: Record<string, unknown>) => api.put<ApiRes<Offer>>(`/api/offers/${id}`, data),

  deleteOffer: (id: string) => api.delete<ApiRes<null>>(`/api/offers/${id}`),

  getBlogPosts: () => api.get<ApiRes<BlogPost[]>>('/api/blog/manage').then((r) => r.data),

  getBlogPostById: (id: string) => api.get<ApiRes<BlogPost>>(`/api/blog/manage/post/${id}`).then((r) => r.data),

  createBlogPost: (data: Record<string, unknown>) => api.post<ApiRes<BlogPost>>('/api/blog', data),

  updateBlogPost: (id: string, data: Record<string, unknown>) => api.put<ApiRes<BlogPost>>(`/api/blog/${id}`, data),

  deleteBlogPost: (id: string) => api.delete<ApiRes<null>>(`/api/blog/${id}`),

  getBanners: () => api.get<ApiRes<Banner[]>>('/api/banners/manage').then((r) => r.data),

  createBanner: (data: Record<string, unknown>) => api.post<ApiRes<Banner>>('/api/banners', data),

  updateBanner: (id: string, data: Record<string, unknown>) => api.put<ApiRes<Banner>>(`/api/banners/${id}`, data),

  deleteBanner: (id: string) => api.delete<ApiRes<null>>(`/api/banners/${id}`),

  getTestimonials: () => api.get<ApiRes<Testimonial[]>>('/api/testimonials').then((r) => r.data),

  createTestimonial: (data: Record<string, unknown>) =>
    api.post<ApiRes<Testimonial>>('/api/testimonials', data),

  updateTestimonial: (id: string, data: Record<string, unknown>) =>
    api.put<ApiRes<Testimonial>>(`/api/testimonials/${id}`, data),

  deleteTestimonial: (id: string) => api.delete<ApiRes<null>>(`/api/testimonials/${id}`),
};
