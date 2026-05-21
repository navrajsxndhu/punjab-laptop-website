import { api } from './api';
import { MOCK_BLOG_POSTS } from './mock-data';
import type { BlogPost } from '@/types';

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await api.get<{ success: boolean; data: BlogPost[] }>('/api/blog', {
      next: { revalidate: 120 },
    });
    return res.data || [];
  } catch {
    return MOCK_BLOG_POSTS;
  }
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await api.get<{ success: boolean; data: BlogPost }>(`/api/blog/${slug}`, {
      next: { revalidate: 120 },
    });
    return res.data || null;
  } catch {
    return MOCK_BLOG_POSTS.find((p) => p.slug === slug) || null;
  }
}

export function getRelatedPosts(posts: BlogPost[], currentSlug: string, limit = 3): BlogPost[] {
  const current = posts.find((p) => p.slug === currentSlug);
  if (!current) return posts.filter((p) => p.slug !== currentSlug).slice(0, limit);

  const currentTags = new Set(current.tags || []);
  return posts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      const aScore = (a.tags || []).filter((t) => currentTags.has(t)).length;
      const bScore = (b.tags || []).filter((t) => currentTags.has(t)).length;
      return bScore - aScore;
    })
    .slice(0, limit);
}
