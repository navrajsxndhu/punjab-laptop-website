export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4" role="status" aria-live="polite">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-accent/20" />
        <div className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
      <p className="text-body-sm text-text-muted">Loading...</p>
    </div>
  );
}
