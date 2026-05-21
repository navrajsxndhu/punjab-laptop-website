import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogArticle } from '@/components/blog/BlogArticle';
import { fetchBlogPosts, fetchBlogBySlug, getRelatedPosts } from '@/lib/blog';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema, canonical } from '@/lib/seo';

export const revalidate = 300;

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await fetchBlogBySlug(params.slug);
  if (!post) return { title: 'Article Not Found' };

  return {
    title: post.title,
    description: post.excerpt || post.title,
    keywords: [...(post.tags || []), 'laptop Sirsa', 'Punjab Laptop Sirsa'],
    alternates: { canonical: canonical(`/blog/${post.slug}`) },
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      url: canonical(`/blog/${post.slug}`),
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author],
      images: post.cover_image ? [{ url: post.cover_image, alt: post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, allPosts] = await Promise.all([
    fetchBlogBySlug(params.slug),
    fetchBlogPosts(),
  ]);

  if (!post) notFound();

  const relatedPosts = getRelatedPosts(allPosts, params.slug);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image,
    datePublished: post.published_at,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'Punjab Laptop Sirsa' },
    mainEntityOfPage: canonical(`/blog/${post.slug}`),
  };

  return (
    <>
      <JsonLd
        data={[
          jsonLd,
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <BlogArticle post={post} relatedPosts={relatedPosts} />
    </>
  );
}
