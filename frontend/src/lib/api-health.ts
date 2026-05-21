const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export type ApiHealthStatus = 'unknown' | 'ok' | 'down';

let cached: { status: ApiHealthStatus; at: number } | null = null;
const CACHE_MS = 30_000;

export async function checkApiHealth(force = false): Promise<ApiHealthStatus> {
  if (!force && cached && Date.now() - cached.at < CACHE_MS) {
    return cached.status;
  }
  try {
    const res = await fetch(`${API_URL}/api/health`, {
      method: 'GET',
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    const status: ApiHealthStatus = res.ok ? 'ok' : 'down';
    cached = { status, at: Date.now() };
    return status;
  } catch {
    cached = { status: 'down', at: Date.now() };
    return 'down';
  }
}

export function getApiBaseUrl(): string {
  return API_URL;
}
