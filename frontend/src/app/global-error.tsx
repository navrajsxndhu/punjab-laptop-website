'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[#F8FAFC] font-sans p-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Critical error</h1>
          <p className="text-slate-600 mb-6">Please refresh the page.</p>
          <button
            type="button"
            onClick={reset}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium"
          >
            Refresh
          </button>
        </div>
      </body>
    </html>
  );
}
