'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-7 h-7 text-red-500" />
        </div>
        <h1 className="font-display text-display-sm text-text-primary mb-3">Something went wrong</h1>
        <p className="text-body-md text-text-muted mb-8">
          We hit an unexpected error. Please try again or contact us on WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button type="button" onClick={reset} className="btn-primary">
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
          <Link href="/" className="btn-outline">
            Go home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
