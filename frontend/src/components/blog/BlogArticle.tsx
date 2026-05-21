'use client';

import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Clock, User } from 'lucide-react';
import type { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import { sanitizeHtml } from '@/lib/sanitize';
import { useMemo } from 'react';
import { BlogCard } from './BlogCard';

interface BlogArticleProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export function BlogArticle({ post, relatedPosts }: BlogArticleProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const safeContent = useMemo(() => sanitizeHtml(post.content), [post.content]);

  return (
    <>
      <motion.div
        className="fixed top-[72px] left-0 right-0 h-0.5 bg-accent origin-left z-40"
        style={{ scaleX }}
      />

      <article>
        {post.cover_image && (
          <div className="relative h-[40vh] min-h-[280px] max-h-[480px] overflow-hidden bg-primary">
            <img src={post.cover_image} alt="" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
          </div>
        )}

        <div className="container-narrow -mt-20 relative z-10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-card shadow-large p-8 lg:p-12 mb-10"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-body-sm text-text-muted hover:text-accent mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {(post.tags || []).map((tag) => (
                <span key={tag} className="badge-accent capitalize">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display text-display-sm lg:text-display-md text-text-primary text-balance">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-6 text-body-sm text-text-muted">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-accent" />
                {post.author}
              </span>
              {post.published_at && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {formatDate(post.published_at)}
                </span>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="article-prose px-2 lg:px-4"
            dangerouslySetInnerHTML={{ __html: safeContent }}
          />
        </div>

        {relatedPosts.length > 0 && (
          <section className="section-padding-sm bg-background border-t border-gray-100">
            <div className="container-wide">
              <h2 className="font-display text-heading-lg text-text-primary mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {relatedPosts.map((p, i) => (
                  <BlogCard key={p.id} post={p} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
