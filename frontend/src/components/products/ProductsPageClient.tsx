'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '@/components/common/ProductCard';
import { PRICE_RANGES, PROCESSOR_OPTIONS, RAM_OPTIONS } from '@/lib/constants';
import type { Product, Category, Brand } from '@/types';
import { cn } from '@/lib/utils';

interface ProductsPageClientProps {
  initialProducts: Product[];
  meta?: { page: number; limit: number; total: number; totalPages: number };
  categories: Category[];
  brands: Brand[];
  initialFilters: Record<string, string | undefined>;
}

export function ProductsPageClient({
  initialProducts,
  meta,
  categories,
  brands,
  initialFilters,
}: ProductsPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialFilters.search || '');
  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = (key: string, value: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('search', search || undefined);
  };

  const activeFilters = useMemo(() => {
    const keys = ['brand', 'category', 'processor', 'ram', 'minPrice', 'maxPrice', 'sort', 'search'];
    return keys.filter((k) => initialFilters[k]);
  }, [initialFilters]);

  return (
    <div className="container-wide py-10 lg:py-14">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Sidebar filters — desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <FilterPanel
            categories={categories}
            brands={brands}
            initialFilters={initialFilters}
            onFilter={updateFilter}
          />
        </aside>

        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search laptops..."
                className="input-field pl-11"
              />
            </form>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden btn-outline text-body-sm py-2.5"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
              <select
                value={initialFilters.sort || 'newest'}
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="input-field py-2.5 min-w-[160px]"
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name_asc">Name: A–Z</option>
              </select>
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {activeFilters.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => updateFilter(key, undefined)}
                  className="inline-flex items-center gap-1.5 badge bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                >
                  {key}: {initialFilters[key]}
                  <X className="w-3 h-3" />
                </button>
              ))}
              <button
                type="button"
                onClick={() => router.push('/products')}
                className="text-caption text-text-muted hover:text-accent"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Mobile filters drawer */}
          {showFilters && (
            <div className="lg:hidden mb-8 p-6 rounded-card bg-white shadow-soft border border-gray-100">
              <FilterPanel
                categories={categories}
                brands={brands}
                initialFilters={initialFilters}
                onFilter={(key, val) => {
                  updateFilter(key, val);
                  setShowFilters(false);
                }}
              />
            </div>
          )}

          {/* Grid */}
          {initialProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {initialProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-heading-md text-text-primary mb-2">No laptops found</p>
              <p className="text-text-muted mb-6">Try adjusting your filters or search term.</p>
              <button type="button" onClick={() => router.push('/products')} className="btn-primary">
                View All Products
              </button>
            </div>
          )}

          {meta && meta.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => updateFilter('page', String(page))}
                  className={cn(
                    'w-10 h-10 rounded-button text-body-sm font-medium transition-colors',
                    meta.page === page
                      ? 'bg-accent text-white'
                      : 'bg-white text-text-muted hover:bg-gray-50 border border-gray-200'
                  )}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterPanel({
  categories,
  brands,
  initialFilters,
  onFilter,
}: {
  categories: Category[];
  brands: Brand[];
  initialFilters: Record<string, string | undefined>;
  onFilter: (key: string, value: string | undefined) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-display font-semibold text-body-sm text-text-primary mb-3">Brand</h3>
        <div className="space-y-1">
          {brands.map((b) => (
            <button
              key={b.slug}
              type="button"
              onClick={() => onFilter('brand', initialFilters.brand === b.slug ? undefined : b.slug)}
              className={cn(
                'block w-full text-left px-3 py-2 rounded-lg text-body-sm transition-colors',
                initialFilters.brand === b.slug
                  ? 'bg-accent/10 text-accent font-medium'
                  : 'text-text-muted hover:bg-gray-50'
              )}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display font-semibold text-body-sm text-text-primary mb-3">Category</h3>
        <div className="space-y-1">
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => onFilter('category', initialFilters.category === c.slug ? undefined : c.slug)}
              className={cn(
                'block w-full text-left px-3 py-2 rounded-lg text-body-sm transition-colors',
                initialFilters.category === c.slug
                  ? 'bg-accent/10 text-accent font-medium'
                  : 'text-text-muted hover:bg-gray-50'
              )}
            >
              {c.icon} {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display font-semibold text-body-sm text-text-primary mb-3">Price</h3>
        <div className="space-y-1">
          {PRICE_RANGES.map((range) => {
            const key = `${range.min}-${range.max}`;
            const isActive =
              initialFilters.minPrice === String(range.min) &&
              initialFilters.maxPrice === String(range.max);
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  if (isActive) {
                    onFilter('minPrice', undefined);
                    onFilter('maxPrice', undefined);
                  } else {
                    onFilter('minPrice', String(range.min));
                    onFilter('maxPrice', String(range.max));
                  }
                }}
                className={cn(
                  'block w-full text-left px-3 py-2 rounded-lg text-body-sm transition-colors',
                  isActive ? 'bg-accent/10 text-accent font-medium' : 'text-text-muted hover:bg-gray-50'
                )}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="font-display font-semibold text-body-sm text-text-primary mb-3">Processor</h3>
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {PROCESSOR_OPTIONS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onFilter('processor', initialFilters.processor === p ? undefined : p)}
              className={cn(
                'block w-full text-left px-3 py-2 rounded-lg text-caption transition-colors',
                initialFilters.processor === p
                  ? 'bg-accent/10 text-accent font-medium'
                  : 'text-text-muted hover:bg-gray-50'
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display font-semibold text-body-sm text-text-primary mb-3">RAM</h3>
        <div className="flex flex-wrap gap-2">
          {RAM_OPTIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onFilter('ram', initialFilters.ram === r ? undefined : r)}
              className={cn(
                'px-3 py-1.5 rounded-pill text-caption font-medium border transition-colors',
                initialFilters.ram === r
                  ? 'bg-accent text-white border-accent'
                  : 'border-gray-200 text-text-muted hover:border-accent/30'
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
