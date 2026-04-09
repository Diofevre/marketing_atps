import type { ApiError, ApiResponse } from '@/lib/types';

function getApiBaseUrl(): string {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  }
  return '';
}

const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10000;

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

// User-Agent used for all server-side fetches. The backend sits behind
// Cloudflare with bot protection enabled, and CF returns a 403 "Just a
// moment..." challenge HTML for the default Node/undici User-Agent
// (either empty or "node"). When that happens, apiClient sees a non-JSON
// response and every SSR-rendered news/blog page renders "No news found"
// even though the DB has rows.
//
// We present ourselves as a legitimate server-to-server client so CF
// lets the request through. Setting User-Agent is a forbidden header
// in the browser fetch spec, so this is only applied when running on
// the server (typeof window === 'undefined').
const SSR_USER_AGENT =
  'Mozilla/5.0 (compatible; MyATPS-Marketing-SSR/1.0; +https://myatps.com)';

class ApiClient {
  private getBaseUrl(): string {
    return getApiBaseUrl();
  }

  private getHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    // Only set User-Agent server-side. Browsers block overriding it.
    if (typeof window === 'undefined') {
      headers['User-Agent'] = SSR_USER_AGENT;
    }
    return headers;
  }

  async get<T>(endpoint: string, params: Record<string, unknown> = {}, config: RequestConfig = {}): Promise<ApiResponse<T>> {
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
