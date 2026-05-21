// ============================================================
// API Client — Frontend → Backend communication
// ============================================================

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

interface ApiErrorBody {
  error?: string;
  message?: string;
}

async function parseApiError(response: Response): Promise<string> {
  const body = (await response.json().catch(() => ({}))) as ApiErrorBody;
  return body.error || body.message || `HTTP ${response.status}`;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          url.searchParams.append(key, String(value));
        }
      });
    }
    return url.toString();
  }

  private getAuthHeaders(): Record<string, string> {
    if (typeof window === 'undefined') return {};
    const token = localStorage.getItem('admin_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async fetchWithRetry(url: string, init: RequestInit, retries = 2): Promise<Response> {
    let lastError: Error | null = null;
    for (let i = 0; i <= retries; i++) {
      try {
        const res = await fetch(url, init);
        if (res.status >= 500 && i < retries) {
          await new Promise((r) => setTimeout(r, 400 * (i + 1)));
          continue;
        }
        return res;
      } catch (e) {
        lastError = e instanceof Error ? e : new Error('Network error');
        if (i < retries) await new Promise((r) => setTimeout(r, 400 * (i + 1)));
      }
    }
    throw lastError || new Error('Network error');
  }

  async get<T>(path: string, options?: FetchOptions): Promise<T> {
    const url = this.buildUrl(path, options?.params);
    const response = await this.fetchWithRetry(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options?.headers,
      },
      next: options?.next,
    });
    if (!response.ok) throw new Error(await parseApiError(response));
    return response.json();
  }

  async post<T>(path: string, data?: unknown, options?: FetchOptions): Promise<T> {
    const url = this.buildUrl(path, options?.params);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) throw new Error(await parseApiError(response));
    return response.json();
  }

  async put<T>(path: string, data?: unknown, options?: FetchOptions): Promise<T> {
    const url = this.buildUrl(path, options?.params);
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) throw new Error(await parseApiError(response));
    return response.json();
  }

  async patch<T>(path: string, data?: unknown, options?: FetchOptions): Promise<T> {
    const url = this.buildUrl(path, options?.params);
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) throw new Error(await parseApiError(response));
    return response.json();
  }

  async delete<T>(path: string, options?: FetchOptions): Promise<T> {
    const url = this.buildUrl(path, options?.params);
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options?.headers,
      },
    });
    if (!response.ok) throw new Error(await parseApiError(response));
    return response.json();
  }

  async upload<T>(path: string, formData: FormData): Promise<T> {
    const url = this.buildUrl(path);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...this.getAuthHeaders(),
      },
      body: formData,
    });
    if (!response.ok) throw new Error(await parseApiError(response));
    return response.json();
  }
}

export const TOKEN_KEY = 'admin_token';
export const USER_KEY = 'admin_user';

export const api = new ApiClient(API_URL);
