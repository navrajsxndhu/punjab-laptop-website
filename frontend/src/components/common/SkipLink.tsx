export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-button focus:bg-accent focus:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
    >
      Skip to main content
    </a>
  );
}
