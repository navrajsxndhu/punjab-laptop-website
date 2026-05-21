export function SectionSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="container-wide py-16 space-y-4" aria-hidden>
      <div className="h-8 w-48 shimmer rounded-lg" />
      <div className="h-4 w-96 max-w-full shimmer rounded-lg" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="aspect-[4/3] shimmer rounded-card" />
        ))}
      </div>
    </div>
  );
}
