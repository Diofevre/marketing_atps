"use client";

import { useState, useEffect, useCallback } from "react";
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

export default function BlogList() {
  const [posts, setPosts] = useState<TransformedBlogPost[]>([]);
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPosts({ page: 1 });
  }, [selectedCategory, fetchPosts]);

  const filteredPosts = searchQuery
    ? posts.filter((p) =>
        p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : posts;

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

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
        {error ? (
          <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-red-50 bg-white px-8 py-16 text-center shadow-none">
            <div className="flex size-14 items-center justify-center rounded-full bg-red-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-7 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base font-semibold text-[#1b0c25]">
                Impossible de charger les articles
              </p>
              <p className="text-sm text-[#1b0c25]/50">{error}</p>
            </div>
            <button
              onClick={() => fetchPosts()}
              className="rounded-xl cursor-pointer bg-[#1b0c25] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
            >
              Réessayer
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
