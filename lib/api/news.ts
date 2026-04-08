import { apiClient } from './client';
import type {
  NewsItem,
  NewsListResponse,
  NewsCategoriesResponse,
  NewsTagsResponse,
  NewsQueryParams,
  ApiResponse,
} from '@/lib/types';
import type { NewsItemListPayload } from './transformers';

const NEWS_ENDPOINT = '/api/news';

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
    });
  },

  async getNewsBySlug(slug: string): Promise<ApiResponse<NewsItem>> {
    return apiClient.get<NewsItem>(`${NEWS_ENDPOINT}/slug/${slug}`);
  },

  async getNewsById(id: string): Promise<ApiResponse<NewsItem>> {
    return apiClient.get<NewsItem>(`${NEWS_ENDPOINT}/${id}`);
  },

  async getCategories(): Promise<ApiResponse<NewsCategoriesResponse>> {
    return apiClient.get<NewsCategoriesResponse>(`${NEWS_ENDPOINT}/categories`);
  },

  async getTags(): Promise<ApiResponse<NewsTagsResponse>> {
    return apiClient.get<NewsTagsResponse>(`${NEWS_ENDPOINT}/tags`);
  },

  async getRecentNews(limit: number = 5): Promise<ApiResponse<NewsItemListPayload>> {
    return apiClient.get<NewsItemListPayload>(`${NEWS_ENDPOINT}/recent`, { limit });
  },

  async getFeaturedNews(limit: number = 5): Promise<ApiResponse<NewsItemListPayload>> {
    return apiClient.get<NewsItemListPayload>(`${NEWS_ENDPOINT}/featured`, { limit });
  },

  async getRelatedNews(newsId: string, limit: number = 3): Promise<ApiResponse<NewsItemListPayload>> {
    return apiClient.get<NewsItemListPayload>(`${NEWS_ENDPOINT}/${newsId}/related`, { limit });
  },

  async getNewsByCategory(category: string, params: Omit<NewsQueryParams, 'category'> = {}): Promise<ApiResponse<NewsListResponse>> {
    return this.getNews({ ...params, category });
  },

  async search(query: string, limit: number = 10): Promise<ApiResponse<NewsListResponse>> {
    return apiClient.get<NewsListResponse>(NEWS_ENDPOINT, { search: query, limit });
  },
};

export type { NewsQueryParams };
