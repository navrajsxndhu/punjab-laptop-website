'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { checkApiHealth, getApiBaseUrl } from '@/lib/api-health';

export function ApiStatusBanner() {
  const [status, setStatus] = useState<'unknown' | 'ok' | 'down'>('unknown');
  const [checking, setChecking] = useState(false);

  const runCheck = async (force = false) => {
    setChecking(true);
    const s = await checkApiHealth(force);
    setStatus(s);
    setChecking(false);
  };

  useEffect(() => {
    runCheck();
  }, []);

  if (status !== 'down') return null;

  return (
    <div
      role="alert"
      className="bg-amber-50 border-b border-amber-200/80 text-amber-950 px-4 py-2.5 text-body-sm flex flex-wrap items-center justify-center gap-2 z-[60]"
    >
      <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden />
      <span>
        Store API is temporarily unavailable. Some features may not work until the backend is online.
      </span>
      <button
        type="button"
        onClick={() => runCheck(true)}
        disabled={checking}
        className="inline-flex items-center gap-1 font-medium underline-offset-2 hover:underline disabled:opacity-50"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
        Retry
      </button>
      <span className="text-caption text-amber-800/80 w-full text-center sm:w-auto sm:text-left">
        API: {getApiBaseUrl()}
      </span>
    </div>
  );
}
