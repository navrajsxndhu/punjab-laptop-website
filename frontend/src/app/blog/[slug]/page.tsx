import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogArticle } from '@/components/blog/BlogArticle';
import { fetchBlogPosts, fetchBlogBySlug, getRelatedPosts } from '@/lib/blog';
import { SEO } from '@/lib/constants';

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
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjablaptopsirsa.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image,
    datePublished: post.published_at,
    author: {
      '@type': 'Organization',
      name: post.author || SEO.openGraph.siteName,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO.openGraph.siteName,
      url: siteUrl,
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticle post={post} relatedPosts={relatedPosts} />
    </>
  );
}
