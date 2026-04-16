import type { BlogArticle, BlogSection, NewsItem } from '@/lib/types';
import { format } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';

/**
 * Some list endpoints (recent/related/popular/featured) historically return
 * either a bare array or a wrapped object depending on the backend version.
 * These helpers normalize both shapes into a plain array so call sites never
 * have to resort to `as any` casts.
 */
export type BlogArticleListPayload =
  | BlogArticle[]
  | { articles: BlogArticle[] };

export type NewsItemListPayload =
  | NewsItem[]
  | { news: NewsItem[] };

export function unwrapBlogArticles(
  payload: BlogArticleListPayload | null | undefined,
): BlogArticle[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  return payload.articles ?? [];
}

export function unwrapNewsItems(
  payload: NewsItemListPayload | null | undefined,
): NewsItem[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  return payload.news ?? [];
}

const DATE_LOCALES = { en: enUS, fr } as const;

export function formatDisplayDate(
  dateString: string | null,
  locale: 'en' | 'fr' = 'en',
): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return format(date, 'PPP', { locale: DATE_LOCALES[locale] });
  } catch {
    return dateString;
  }
}

export interface TransformedBlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  imageBlog: string;
  detailImage?: string;
  tags?: string[];
  author?: { name: string; avatar?: string };
  content?: string;
  sections?: BlogSection[];
  category?: string;
  slug: string;
}

export function transformBlogArticle(article: BlogArticle): TransformedBlogPost {
  return {
    id: article.id,
    title: article.category || 'Article',
    description: article.title,
    date: formatDisplayDate(article.publishedAt),
    imageBlog: article.coverImage || '/assets/placeholder.png',
    detailImage: article.coverImage || '/assets/placeholder.png',
    tags: article.tags,
    author: article.author
      ? {
          name: `${article.author.firstName} ${article.author.lastName}`.trim(),
          avatar: article.author.profilePicture || undefined,
        }
      : undefined,
    content: article.content,
    sections: article.sections || undefined,
    category: article.category || undefined,
    slug: article.slug,
  };
}

export function transformBlogArticles(articles: BlogArticle[] | undefined | null): TransformedBlogPost[] {
  if (!articles || !Array.isArray(articles)) return [];
  return articles.map(transformBlogArticle);
}

export interface TransformedNewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  content: string;
  author?: { name: string; avatar?: string };
  tags?: string[];
  source?: string;
  sourceUrl?: string;
  slug: string;
}

export function transformNewsItem(item: NewsItem): TransformedNewsItem {
  return {
    id: item.id,
    title: item.title,
    category: item.category || 'News',
    date: formatDisplayDate(item.publishedAt),
    excerpt: item.excerpt || '',
    image: item.coverImage || '/assets/placeholder.png',
    content: item.content,
    tags: item.tags,
    source: item.source || undefined,
    sourceUrl: item.sourceUrl || undefined,
    slug: item.slug,
  };
}

export function transformNewsItems(items: NewsItem[] | undefined | null): TransformedNewsItem[] {
  if (!items || !Array.isArray(items)) return [];
  return items.map(transformNewsItem);
}
