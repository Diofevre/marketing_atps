import { apiClient } from './client';
import type {
  NewsItem,
  NewsListResponse,
  NewsCategoriesResponse,
  NewsTagsResponse,
  NewsLocale,
  NewsQueryParams,
  ApiResponse,
} from '@/lib/types';
import type { NewsItemListPayload } from './transformers';

const NEWS_ENDPOINT = '/api/news';

/**
 * Every news-returning endpoint accepts an optional `lang` locale so the
 * backend swaps in the matching translation (when one exists) before
 * serializing the row. The helpers below all funnel through a single
 * `buildQuery` so the lang param is wired the same way everywhere and
 * the undefined case never sends `?lang=undefined` on the wire.
 */
function buildQuery(
  extra: Record<string, unknown> = {},
  lang?: NewsLocale,
): Record<string, unknown> {
  return lang ? { ...extra, lang } : extra;
}

export const newsService = {
  async getNews(params: NewsQueryParams = {}): Promise<ApiResponse<NewsListResponse>> {
    return apiClient.get<NewsListResponse>(NEWS_ENDPOINT, {
      page: params.page || 1,
      limit: params.limit || 10,
      category: params.category,
      tag: params.tag,
      featured: params.featured,
      search: params.search,
      sortBy: params.sortBy || 'publishedAt',
      sortOrder: params.sortOrder || 'desc',
      ...(params.lang ? { lang: params.lang } : {}),
    });
  },

  async getNewsBySlug(slug: string, lang?: NewsLocale): Promise<ApiResponse<NewsItem>> {
    return apiClient.get<NewsItem>(
      `${NEWS_ENDPOINT}/slug/${slug}`,
      buildQuery({}, lang),
    );
  },

  async getNewsById(id: string, lang?: NewsLocale): Promise<ApiResponse<NewsItem>> {
    return apiClient.get<NewsItem>(
      `${NEWS_ENDPOINT}/${id}`,
      buildQuery({}, lang),
    );
  },

  async getCategories(): Promise<ApiResponse<NewsCategoriesResponse>> {
    return apiClient.get<NewsCategoriesResponse>(`${NEWS_ENDPOINT}/categories`);
  },

  async getTags(): Promise<ApiResponse<NewsTagsResponse>> {
    return apiClient.get<NewsTagsResponse>(`${NEWS_ENDPOINT}/tags`);
  },

  async getRecentNews(limit: number = 5, lang?: NewsLocale): Promise<ApiResponse<NewsItemListPayload>> {
    return apiClient.get<NewsItemListPayload>(
      `${NEWS_ENDPOINT}/recent`,
      buildQuery({ limit }, lang),
    );
  },

  async getFeaturedNews(limit: number = 5, lang?: NewsLocale): Promise<ApiResponse<NewsItemListPayload>> {
    return apiClient.get<NewsItemListPayload>(
      `${NEWS_ENDPOINT}/featured`,
      buildQuery({ limit }, lang),
    );
  },

  async getRelatedNews(newsId: string, limit: number = 3, lang?: NewsLocale): Promise<ApiResponse<NewsItemListPayload>> {
    return apiClient.get<NewsItemListPayload>(
      `${NEWS_ENDPOINT}/${newsId}/related`,
      buildQuery({ limit }, lang),
    );
  },

  async getNewsByCategory(category: string, params: Omit<NewsQueryParams, 'category'> = {}): Promise<ApiResponse<NewsListResponse>> {
    return this.getNews({ ...params, category });
  },

  async search(query: string, limit: number = 10, lang?: NewsLocale): Promise<ApiResponse<NewsListResponse>> {
    return apiClient.get<NewsListResponse>(
      NEWS_ENDPOINT,
      buildQuery({ search: query, limit }, lang),
    );
  },
};

export type { NewsQueryParams };
