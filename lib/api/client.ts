import type { ApiError, ApiResponse } from '@/lib/types';

// Backend blog/news API base URL.
// - In the browser: empty → hit same-origin /api/* which Next.js rewrites (see next.config.ts).
// - On the server (SSR): use NEXT_PUBLIC_APP_URL (backend origin configured on Vercel).
function getApiBaseUrl(): string {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_APP_URL || '';
  }
  return '';
}

const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 8000;

interface RequestConfig extends RequestInit {
  timeout?: number;
}

function buildQueryString(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

async function fetchWithTimeout(url: string, config: RequestConfig = {}): Promise<Response> {
  const { timeout = API_TIMEOUT, ...fetchConfig } = config;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { ...fetchConfig, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

function createApiError(message: string, status: number, code?: string): ApiError {
  return { message, status, code };
}

class ApiClient {
  private getBaseUrl(): string {
    return getApiBaseUrl();
  }

  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  async get<T>(endpoint: string, params: Record<string, unknown> = {}, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    // Refuse to fire blog/news requests at all when the API base URL is not configured.
    // - Server-side: prevents a Next.js rewrite proxy loop into this same origin.
    // - Client-side: prevents hitting /api/blog on the marketing server (no such route → 404).
    // NEXT_PUBLIC_* is inlined at build time so the check works in both environments.
    const isBlogOrNewsEndpoint = endpoint.startsWith('/api/blog') || endpoint.startsWith('/api/news');
    if (isBlogOrNewsEndpoint && !process.env.NEXT_PUBLIC_APP_URL) {
      return {
        data: null,
        error: createApiError('NEXT_PUBLIC_APP_URL not set — blog/news API disabled', 503, 'NO_API_URL'),
      };
    }

    const url = `${this.getBaseUrl()}${endpoint}${buildQueryString(params)}`;

    try {
      const response = await fetchWithTimeout(url, {
        method: 'GET',
        headers: this.getHeaders(),
        ...config,
      });

      const contentType = response.headers.get('content-type') || '';
      
      if (!contentType.includes('application/json')) {
        return {
          data: null,
          error: createApiError(`API returned non-JSON response (${response.status}). URL: ${url}`, response.status, 'INVALID_RESPONSE'),
        };
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          data: null,
          error: createApiError(errorData.message || errorData.error || `Erreur HTTP: ${response.status}`, response.status, errorData.code),
        };
      }

      const json = await response.json();
      const data = json.data !== undefined ? json.data : json;
      return { data, error: null };
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return { data: null, error: createApiError('La requête a expiré', 408, 'TIMEOUT') };
        }
        return { data: null, error: createApiError(error.message, 500, 'NETWORK_ERROR') };
      }
      return { data: null, error: createApiError('Une erreur inconnue est survenue', 500, 'UNKNOWN_ERROR') };
    }
  }

  async post<T>(endpoint: string, body: unknown, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    const url = `${this.getBaseUrl()}${endpoint}`;

    try {
      const response = await fetchWithTimeout(url, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
        ...config,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          data: null,
          error: createApiError(errorData.message || `Erreur HTTP: ${response.status}`, response.status, errorData.code),
        };
      }

      const json = await response.json();
      const data = json.data !== undefined ? json.data : json;
      return { data, error: null };
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return { data: null, error: createApiError('La requête a expiré', 408, 'TIMEOUT') };
        }
        return { data: null, error: createApiError(error.message, 500, 'NETWORK_ERROR') };
      }
      return { data: null, error: createApiError('Une erreur inconnue est survenue', 500, 'UNKNOWN_ERROR') };
    }
  }
}

export const apiClient = new ApiClient();
export { getApiBaseUrl, buildQueryString };
