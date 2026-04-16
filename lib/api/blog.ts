import { apiClient } from './client';
import type {
  BlogArticle,
  BlogListResponse,
  BlogCategoriesResponse,
  BlogTagsResponse,
  BlogQueryParams,
  ApiResponse,
} from '@/lib/types';
import type { BlogArticleListPayload } from './transformers';

const BLOG_ENDPOINT = '/api/blog';

export const blogService = {
  async getArticles(params: BlogQueryParams = {}): Promise<ApiResponse<BlogListResponse>> {
    return apiClient.get<BlogListResponse>(BLOG_ENDPOINT, {
      page: params.page || 1,
      limit: params.limit || 10,
      category: params.category,
      tag: params.tag,
      status: params.status || 'published',
      search: params.search,
      sortBy: params.sortBy || 'publishedAt',
      sortOrder: params.sortOrder || 'desc',
    });
  },

  async getArticleBySlug(slug: string): Promise<ApiResponse<BlogArticle>> {
    return apiClient.get<BlogArticle>(`${BLOG_ENDPOINT}/slug/${slug}`);
  },

  async getArticleById(id: string): Promise<ApiResponse<BlogArticle>> {
    return apiClient.get<BlogArticle>(`${BLOG_ENDPOINT}/${id}`);
  },

  async getCategories(): Promise<ApiResponse<BlogCategoriesResponse>> {
    return apiClient.get<BlogCategoriesResponse>(`${BLOG_ENDPOINT}/categories`);
  },

  async getTags(): Promise<ApiResponse<BlogTagsResponse>> {
    return apiClient.get<BlogTagsResponse>(`${BLOG_ENDPOINT}/tags`);
  },

  async getRecentArticles(limit: number = 5): Promise<ApiResponse<BlogArticleListPayload>> {
    return apiClient.get<BlogArticleListPayload>(`${BLOG_ENDPOINT}/recent`, { limit });
  },

  async getPopularArticles(limit: number = 5): Promise<ApiResponse<BlogArticleListPayload>> {
    return apiClient.get<BlogArticleListPayload>(`${BLOG_ENDPOINT}/popular`, { limit });
  },

  async getRelatedArticles(articleId: string, limit: number = 3): Promise<ApiResponse<BlogArticleListPayload>> {
    return apiClient.get<BlogArticleListPayload>(`${BLOG_ENDPOINT}/${articleId}/related`, { limit });
  },

  async incrementViewCount(articleId: string): Promise<ApiResponse<{ viewCount: number }>> {
    return apiClient.post<{ viewCount: number }>(`${BLOG_ENDPOINT}/${articleId}/view`, {});
  },

  async search(query: string, limit: number = 10): Promise<ApiResponse<BlogListResponse>> {
    return apiClient.get<BlogListResponse>(BLOG_ENDPOINT, { search: query, limit, status: 'published' });
  },
};

export type { BlogQueryParams };
