import type { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';
import { BlogCard } from '@/components/blog/BlogCard';
import { fetchBlogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog & Guides',
  description: 'Laptop buying guides, student tips, gaming advice, and care tips from Punjab Laptop Sirsa — Sirsa\'s trusted laptop experts.',
  openGraph: {
    title: 'Punjab Laptop Sirsa Blog',
    description: 'Expert laptop guides for students, gamers, and budget buyers in Sirsa.',
  },
};

export default async function BlogPage() {
  const posts = await fetchBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        overline="Insights"
        title="Laptop Guides & Expert Tips"
        description="Buying advice, comparisons, and maintenance tips from the team that has helped thousands in Sirsa choose the right machine."
      />

      <section className="section-padding">
        <div className="container-wide">
          {posts.length === 0 ? (
            <p className="text-center text-text-muted text-body-lg py-20">No articles published yet. Check back soon.</p>
          ) : (
            <>
              {featured && (
                <div className="mb-10 lg:mb-14">
                  <BlogCard post={featured} featured />
                </div>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {rest.map((post, i) => (
                  <BlogCard key={post.id} post={post} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
