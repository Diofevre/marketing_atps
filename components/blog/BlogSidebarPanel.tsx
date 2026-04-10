"use client";

import { Search } from "lucide-react";

interface BlogSidebarPanelProps {
  categories: string[];
  selectedCategory: string;
  searchQuery: string;
  onCategorySelect: (cat: string) => void;
  onSearchChange: (q: string) => void;
}

export default function BlogSidebarPanel({
  categories,
  selectedCategory,
  searchQuery,
  onCategorySelect,
  onSearchChange,
}: BlogSidebarPanelProps) {
  return (
    <aside className="w-[130px] sm:w-[180px] lg:w-[290px] shrink-0 flex flex-col gap-5 lg:gap-8 sticky top-32">
      {/* Search */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="blog-search" className="sr-only">Search</label>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 lg:h-4 lg:w-4 text-gray-400" />
          <input
            id="blog-search"
            type="text"
            placeholder="Search article..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-7 lg:pl-9 pr-2 lg:pr-3 py-1.5 lg:py-2.5 text-[11px] lg:text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-1 lg:gap-2">
        <p className="text-[9px] lg:text-xs font-semibold text-[#1b0c25] uppercase tracking-wide mb-0.5">
          Browse By Categories
        </p>
        <ul className="flex flex-col">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => onCategorySelect(cat)}
                className={`w-full text-left px-2 lg:px-3 py-[3px] lg:py-2 text-[10px] lg:text-sm transition-colors border-l-2 ${
                  selectedCategory === cat
                    ? "border-[#1b0c25] text-[#1b0c25] font-semibold"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
