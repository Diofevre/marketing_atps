"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { scaleInVariants, viewportSettings } from "@/lib/motion";
import { blogService } from "@/lib/api";
import {
  transformBlogArticles,
  type TransformedBlogPost,
} from "@/lib/api/transformers";
import { BlogListSkeleton } from "@/components/ui/skeleton-card";
import TitleSection from "@/components/TitleSection";
import type { BlogQueryParams, PaginationInfo } from "@/lib/types";

export default function BlogList() {
  const [posts, setPosts] = useState<TransformedBlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(["All posts"]);
  const [selectedCategory, setSelectedCategory] = useState("All posts");
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

      if (selectedCategory !== "All posts") {
        queryParams.category = selectedCategory;
      }

      const response = await blogService.getArticles(queryParams);

      if (response.error) {
        setError(response.error.message);
        setPosts([]);
      } else if (response.data) {
        const articlesData = response.data.articles || [];
        const transformed = transformBlogArticles(articlesData);
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
      const cats = response.data.categories || [];
      const categoryNames = [
        "All posts",
        ...cats.map((c: { name: string }) => c.name),
      ];
      setCategories(categoryNames);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchPosts({ page: 1 });
  }, [selectedCategory, fetchPosts]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  if (loading && posts.length === 0) {
    return <BlogListSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => fetchPosts()}
          className="px-6 py-2 bg-[#1B0C25] text-white rounded-full hover:bg-[#1B0C25]/90 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-12">
      {/* Filters - Pill Design */}
      <div className="flex flex-wrap gap-3 justify-start mb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`px-6 py-2 cursor-pointer rounded-xl text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-[#1B0C25] text-white shadow-md"
                : "bg-white text-[#1B0C25] border border-gray-200 hover:border-[#1B0C25]/30 hover:bg-gray-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
        <AnimatePresence mode="popLayout">
          {posts.map((blog, index) => (
            <Link href={`/blog/${blog.slug}`} key={blog.id} className="block">
              <motion.div
                layout
                variants={scaleInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="rounded-[16px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col items-center py-2 gap-6 max-lg:gap-4">
                  <div className="w-[calc(100%-16px)] aspect-video rounded-xl overflow-hidden relative">
                    <Image
                      src={blog.imageBlog || "/assets/placeholder.png"}
                      alt={blog.description}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="w-full flex flex-col gap-4 px-2 pb-4 max-lg:gap-3">
                    <div className="flex items-center justify-between">
                      <TitleSection title={blog.title} className="rounded-lg" />
                      <p className="text-sm text-gray-500">{blog.date}</p>
                    </div>

                    <div>
                      <p className="font-medium text-lg leading-[26px] text-[#1b0c25] line-clamp-2">
                        {blog.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </AnimatePresence>
      </div>

      {posts.length === 0 && !loading && (
        <div className="text-center py-20 text-gray-500">
          No posts found for this category.
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => fetchPosts({ page: pagination.page - 1 })}
            disabled={!pagination.hasPrev || loading}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => fetchPosts({ page: pagination.page + 1 })}
            disabled={!pagination.hasNext || loading}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
