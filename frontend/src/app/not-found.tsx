import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-background pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10">
        <p className="text-caption font-semibold tracking-[0.3em] uppercase text-accent mb-4">404</p>
        <h1 className="font-display text-display-md text-text-primary mb-4">Page not found</h1>
        <p className="text-body-lg text-text-muted mb-10 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. Explore our laptops or message us on WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/products" className="btn-outline">
            Browse Laptops
          </Link>
        </div>
      </div>
    </div>
  );
}
