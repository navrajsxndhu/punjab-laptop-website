import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-display text-display-md text-text-primary mb-4">404</h1>
      <p className="text-body-lg text-text-muted mb-8 max-w-md">
        This page doesn&apos;t exist. Browse our laptops or contact us on WhatsApp.
      </p>
      <div className="flex gap-4">
        <Link href="/" className="btn-primary">
          Go Home
        </Link>
        <Link href="/products" className="btn-outline">
          View Products
        </Link>
      </div>
    </div>
  );
}
