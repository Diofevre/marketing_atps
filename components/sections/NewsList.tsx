"use client";

import { useState, useEffect, useCallback } from "react";
import { newsService } from "@/lib/api";
import { transformNewsItems, type TransformedNewsItem } from "@/lib/api/transformers";
import type { NewsQueryParams, PaginationInfo } from "@/lib/types";
import NewsSidebarPanel from "@/components/news/NewsSidebarPanel";
import NewsFeaturedPost, { NewsFeaturedSkeleton } from "@/components/news/NewsFeaturedPost";
import NewsGrid from "@/components/news/NewsGrid";

export default function NewsList() {
  const [news, setNews] = useState<TransformedNewsItem[]>([]);
  const [categories, setCategories] = useState<string[]>(["All Category"]);
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });

  const fetchNews = useCallback(async (params: NewsQueryParams = {}) => {
    setLoading(true);
    setError(null);

    const queryParams: NewsQueryParams = {
      page: params.page || 1,
      limit: 12,
      sortBy: "publishedAt",
      sortOrder: "desc",
    };

    if (selectedCategory !== "All Category") {
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
  }, [selectedCategory]);

  const fetchCategories = useCallback(async () => {
    const response = await newsService.getCategories();
    if (response.data) {
      const names = (response.data.categories || []).map(
        (c: { name: string }) => c.name,
      );
      setCategories(["All Category", ...names]);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);
  useEffect(() => { fetchNews({ page: 1 }); }, [selectedCategory, fetchNews]);

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
          className="px-6 py-2 bg-[#1B0C25] text-white rounded-full hover:bg-[#1B0C25]/90 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-6 lg:gap-10 items-start">
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
