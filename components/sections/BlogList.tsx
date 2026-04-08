"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { blogService } from "@/lib/api";
import {
  transformBlogArticles,
  type TransformedBlogPost,
} from "@/lib/api/transformers";
import type { BlogQueryParams, PaginationInfo } from "@/lib/types";
import BlogSidebarPanel from "@/components/blog/BlogSidebarPanel";
import BlogFeaturedPost, {
  FeaturedPostSkeleton,
} from "@/components/blog/BlogFeaturedPost";
import BlogGrid from "@/components/blog/BlogGrid";

const DEFAULT_PAGINATION: PaginationInfo = {
  page: 1,
  limit: 12,
  total: 0,
  totalPages: 1,
  hasNext: false,
  hasPrev: false,
};

interface BlogListProps {
  initialPosts?: TransformedBlogPost[];
  initialPagination?: PaginationInfo;
  initialCategories?: string[];
}

export default function BlogList({
  initialPosts,
  initialPagination,
  initialCategories,
}: BlogListProps = {}) {
  const hasInitialData = initialPosts !== undefined;
  const [posts, setPosts] = useState<TransformedBlogPost[]>(
    initialPosts ?? [],
  );
  const [categories, setCategories] = useState<string[]>(
    initialCategories ?? ["All Category"],
  );
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(!hasInitialData);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>(
    initialPagination ?? DEFAULT_PAGINATION,
  );
  // Skip the auto-fetch on mount when the server already provided initial data,
  // otherwise we'd refetch and waste a roundtrip on every page load.
  const skipNextFetch = useRef(hasInitialData);

  const fetchPosts = useCallback(
    async (params: BlogQueryParams = {}) => {
      setLoading(true);
      setError(null);

      const queryParams: BlogQueryParams = {
        page: params.page || 1,
        limit: 12,
        sortBy: "publishedAt",
        sortOrder: "desc",
        status: "published",
      };

      if (selectedCategory !== "All Category") {
        queryParams.category = selectedCategory;
      }

      const response = await blogService.getArticles(queryParams);

      if (response.error) {
        setError(response.error.message);
        setPosts([]);
      } else if (response.data) {
        const transformed = transformBlogArticles(response.data.articles || []);
        setPosts(transformed);
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
      }

      setLoading(false);
    },
    [selectedCategory],
  );

  const fetchCategories = useCallback(async () => {
    const response = await blogService.getCategories();
    if (response.data) {
      const names = (response.data.categories || []).map(
        (c: { name: string }) => c.name,
      );
      setCategories(["All Category", ...names]);
    }
  }, []);

  useEffect(() => {
    // Categories aren't part of the SSR payload — fetch them client-side once.
    if (!initialCategories) fetchCategories();
  }, [fetchCategories, initialCategories]);

  useEffect(() => {
    if (skipNextFetch.current) {
      skipNextFetch.current = false;
      return;
    }
    fetchPosts({ page: 1 });
  }, [selectedCategory, fetchPosts]);

  const filteredPosts = searchQuery
    ? posts.filter((p) =>
        p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : posts;

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => fetchPosts()}
          className="px-6 py-2 bg-[#1b0c25] text-white rounded-full hover:bg-[#1b0c25]/90 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-6 lg:gap-10 items-start">
      <BlogSidebarPanel
        categories={categories}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onCategorySelect={setSelectedCategory}
        onSearchChange={setSearchQuery}
      />

      <div className="flex-1 min-w-0 flex flex-col gap-8">
        {loading && !featuredPost ? (
          <FeaturedPostSkeleton />
        ) : featuredPost ? (
          <BlogFeaturedPost post={featuredPost} />
        ) : null}

        <BlogGrid
          posts={gridPosts}
          loading={loading}
          pagination={pagination}
          onPageChange={(page) => fetchPosts({ page })}
        />
      </div>
    </div>
  );
}
