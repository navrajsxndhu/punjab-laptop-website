'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import type { BlogPost } from '@/types';
import { formatDate, truncateText } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  featured?: boolean;
}

export function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className={featured ? 'lg:col-span-2' : ''}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div
          className={`card-premium p-0 relative h-full overflow-hidden transition-all duration-400 ease-apple hover:-translate-y-1 ${
            featured ? 'grid lg:grid-cols-2' : 'flex flex-col'
          }`}
        >
          <div className={`relative overflow-hidden bg-gray-100 ${featured ? 'min-h-[240px] lg:min-h-full' : 'aspect-[16/10]'}`}>
            {post.cover_image ? (
              <img
                src={post.cover_image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-600 ease-apple group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent/10 to-whatsapp/10" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          </div>

          <div className={`p-6 lg:p-8 flex flex-col ${featured ? 'justify-center' : ''}`}>
            {post.tags?.[0] && (
              <span className="badge-accent w-fit mb-3 capitalize">{post.tags[0]}</span>
            )}
            <h3
              className={`font-display font-semibold text-text-primary group-hover:text-accent transition-colors duration-300 text-balance ${
                featured ? 'text-heading-lg lg:text-display-sm' : 'text-heading-md'
              }`}
            >
              {post.title}
            </h3>
            <p className="mt-3 text-body-md text-text-muted line-clamp-2 flex-1">
              {post.excerpt || truncateText(post.content.replace(/<[^>]+>/g, ''), 120)}
            </p>
            <div className="flex items-center justify-between mt-5 pt-5 border-t border-gray-100">
              <span className="flex items-center gap-1.5 text-caption text-text-muted">
                <Clock className="w-3.5 h-3.5" />
                {post.published_at ? formatDate(post.published_at) : 'Recent'}
              </span>
              <span className="inline-flex items-center gap-1 text-body-sm font-medium text-accent">
                Read
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
