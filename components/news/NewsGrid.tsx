"use client";

import { AnimatePresence } from "framer-motion";
import type { TransformedNewsItem } from "@/lib/api/transformers";
import type { PaginationInfo } from "@/lib/types";
import NewsCard from "./NewsCard";

interface NewsGridProps {
  items: TransformedNewsItem[];
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

export default function NewsGrid({
  items,
  loading,
  pagination,
  onPageChange,
}: NewsGridProps) {
  if (loading && items.length === 0) {
    return <GridSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <NewsCard key={item.id} item={item} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {items.length === 0 && !loading && (
        <div className="text-center py-20 text-gray-500">
          No news found for this category.
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
