"use client";

import { AnimatePresence } from "framer-motion";
import type { TransformedBlogPost } from "@/lib/api/transformers";
import type { PaginationInfo } from "@/lib/types";
import BlogCard from "./BlogCard";

interface BlogGridProps {
  posts: TransformedBlogPost[];
  loading: boolean;
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 animate-pulse">
          <div className="aspect-video rounded-xl bg-gray-200/60" />
          <div className="h-3 w-16 bg-gray-200/60 rounded" />
          <div className="h-5 w-full bg-gray-200/60 rounded" />
          <div className="h-5 w-2/3 bg-gray-200/60 rounded" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-200/60" />
            <div className="h-3 w-20 bg-gray-200/60 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BlogGrid({
  posts,
  loading,
  pagination,
  onPageChange,
}: BlogGridProps) {
  if (loading && posts.length === 0) {
    return <GridSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {posts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {posts.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-gray-100 bg-white px-8 py-16 text-center shadow-none">
          <div className="flex size-14 items-center justify-center rounded-full bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-7 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-semibold text-[#1b0c25]">
              Aucun article trouvé
            </p>
            <p className="text-sm text-[#1b0c25]/50">
              Aucun article ne correspond à cette catégorie.
            </p>
          </div>
        </div>
      )}

      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={!pagination.hasPrev || loading}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => onPageChange(pagination.page + 1)}
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
