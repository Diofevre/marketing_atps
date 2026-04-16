"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { newsService } from "@/lib/api";
import { transformNewsItems, type TransformedNewsItem } from "@/lib/api/transformers";
import type { NewsLocale, NewsQueryParams, PaginationInfo } from "@/lib/types";
import NewsSidebarPanel from "@/components/news/NewsSidebarPanel";
import NewsFeaturedPost, { NewsFeaturedSkeleton } from "@/components/news/NewsFeaturedPost";
import NewsGrid from "@/components/news/NewsGrid";

const DEFAULT_PAGINATION: PaginationInfo = {
  page: 1,
  limit: 12,
  total: 0,
  totalPages: 1,
  hasNext: false,
  hasPrev: false,
};

interface NewsListProps {
  initialNews?: TransformedNewsItem[];
  initialPagination?: PaginationInfo;
  initialCategories?: string[];
}

export default function NewsList({
  initialNews,
  initialPagination,
  initialCategories,
}: NewsListProps = {}) {
  // Read the current locale so every client-side news fetch hits the backend
  // with ?lang=<locale>. The backend swaps canonical fields with the matching
  // translation when one exists, so /fr readers get French prose even on
  // pagination / filter refetches after the initial SSR payload.
  const locale = useLocale() as NewsLocale;
  const t = useTranslations("common");
  const ALL_CAT = t("allCategories");
  const hasInitialData = initialNews !== undefined;
  const [news, setNews] = useState<TransformedNewsItem[]>(initialNews ?? []);
  const [categories, setCategories] = useState<string[]>(
    initialCategories ?? [ALL_CAT],
  );
  const [selectedCategory, setSelectedCategory] = useState(ALL_CAT);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(!hasInitialData);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>(
    initialPagination ?? DEFAULT_PAGINATION,
  );
  // Skip the auto-fetch on mount when the server already provided initial data,
  // otherwise we'd refetch and waste a roundtrip on every page load.
  const skipNextFetch = useRef(hasInitialData);

  const fetchNews = useCallback(async (params: NewsQueryParams = {}) => {
    setLoading(true);
    setError(null);

    const queryParams: NewsQueryParams = {
      page: params.page || 1,
      limit: 12,
      sortBy: "publishedAt",
      sortOrder: "desc",
      lang: locale,
    };

    if (selectedCategory !== ALL_CAT) {
      queryParams.category = selectedCategory;
    }

    const response = await newsService.getNews(queryParams);

    if (response.error) {
      setError(response.error.message);
      setNews([]);
    } else if (response.data) {
      const transformed = transformNewsItems(response.data.news || []);
      setNews(transformed);
      if (response.data.pagination) {
        setPagination(response.data.pagination);
      }
    }

    setLoading(false);
  }, [selectedCategory, locale, ALL_CAT]);

  const fetchCategories = useCallback(async () => {
    const response = await newsService.getCategories();
    if (response.data) {
      const names = (response.data.categories || []).map(
        (c: { name: string }) => c.name,
      );
      setCategories([ALL_CAT, ...names]);
    }
  }, [ALL_CAT]);

  useEffect(() => {
    // Categories aren't part of the SSR payload — fetch them client-side once.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!initialCategories) fetchCategories();
  }, [fetchCategories, initialCategories]);

  useEffect(() => {
    if (skipNextFetch.current) {
      skipNextFetch.current = false;
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNews({ page: 1 });
  }, [selectedCategory, locale, fetchNews]);

  const filteredNews = searchQuery
    ? news.filter((n) => n.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : news;

  const featuredItem = filteredNews[0];
  const gridItems = filteredNews.slice(1);

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => fetchNews()}
          className="px-6 py-2 bg-[#1b0c25] text-white rounded-full hover:bg-[#1b0c25]/90 transition-colors"
        >
          {t("retry")}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-10 items-start">
      <NewsSidebarPanel
        categories={categories}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onCategorySelect={setSelectedCategory}
        onSearchChange={setSearchQuery}
      />

      <div className="flex-1 min-w-0 flex flex-col gap-8">
        {loading && !featuredItem ? (
          <NewsFeaturedSkeleton />
        ) : featuredItem ? (
          <NewsFeaturedPost item={featuredItem} />
        ) : null}

        <NewsGrid
          items={gridItems}
          loading={loading}
          pagination={pagination}
          onPageChange={(page) => fetchNews({ page })}
        />
      </div>
    </div>
  );
}
