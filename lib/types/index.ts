export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
}

export interface BlogSection {
  id: string;
  title: string;
  content: string;
  order: number;
  image?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  sections: BlogSection[] | null;
  category: string | null;
  tags: string[];
  authorId: string | null;
  author?: Author | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[];
  status: string;
  publishedAt: string | null;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogListResponse {
  articles: BlogArticle[];
  pagination: PaginationInfo;
}

export interface BlogCategoriesResponse {
  categories: { name: string; count: number }[];
}

export interface BlogTagsResponse {
  tags: { name: string; count: number }[];
}

export interface BlogQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  status?: 'draft' | 'published' | 'archived';
  search?: string;
  sortBy?: 'createdAt' | 'publishedAt' | 'viewCount' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  source: string | null;
  sourceUrl: string | null;
  category: string | null;
  tags: string[];
  featured: boolean;
  publishedAt: string;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NewsListResponse {
  news: NewsItem[];
  pagination: PaginationInfo;
}

export interface NewsCategoriesResponse {
  categories: { name: string; count: number }[];
}

export interface NewsTagsResponse {
  tags: { name: string; count: number }[];
}

// Supported news locales. Mirrors NEWS_LOCALES in the backend myatps
// repo (lib/validation/news.schema.ts). Keep both lists in sync: if a
// new locale is added backend-side without updating this union, the
// marketing TS client will silently reject the new lang value.
export type NewsLocale = 'en' | 'fr';

export interface NewsQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  featured?: boolean;
  search?: string;
  sortBy?: 'createdAt' | 'publishedAt' | 'title';
  sortOrder?: 'asc' | 'desc';
  // When set, the backend swaps the canonical title/content/excerpt/
  // atplRelevance fields with the translation for this locale if one
  // exists. When omitted or unsupported, the backend returns each
  // item in its own defaultLocale. See backend PR #4 + #6 for the
  // full spec. Unsupported values are handled gracefully and do NOT
  // return 400.
  lang?: NewsLocale;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export type ApiResponse<T> =
  | { data: T; error: null }
  | { data: null; error: ApiError };
