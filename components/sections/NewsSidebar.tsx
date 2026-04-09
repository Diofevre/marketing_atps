"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Link2 } from "lucide-react";
import { newsService } from "@/lib/api";
import { transformNewsItems, type TransformedNewsItem } from "@/lib/api/transformers";
import { SidebarSkeleton } from "@/components/ui/skeleton-card";

interface NewsSidebarProps {
  currentNewsId: string;
  source?: string;
  sourceUrl?: string;
  category?: string;
  tags?: string[];
}

export default function NewsSidebar({
  currentNewsId,
  source,
  sourceUrl,
  category,
  tags,
}: NewsSidebarProps) {
  const [moreInsights, setMoreInsights] = useState<TransformedNewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);

      const response = await newsService.getRecentNews(5);

      if (response.data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = response.data as any;
        const newsArray = Array.isArray(data) ? data : (data.news || []);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filtered = newsArray.filter((n: any) => n.id !== currentNewsId);
        setMoreInsights(transformNewsItems(filtered).slice(0, 4));
      }

      setLoading(false);
    };

    fetchNews();
  }, [currentNewsId]);

  if (loading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="w-full lg:w-[320px] flex flex-col gap-8">
      {/* Source */}
      {source && (
        <div className="flex items-center gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Source:
          </p>
          {sourceUrl ? (
            <Link
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[13px] font-bold text-[#1b0c25] hover:text-[#1b0c25]/70 transition-colors"
            >
              {source} <Link2 className="w-3 h-3" />
            </Link>
          ) : (
            <span className="text-[13px] font-bold text-[#1b0c25]">
              {source}
            </span>
          )}
        </div>
      )}

      {/* Category */}
      {category && (
        <div className="flex items-center gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Category:
          </p>
          <span className="text-[13px] font-normal text-[#1b0c25]">
            {category}
          </span>
        </div>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-3">
            Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 rounded-full text-[11px] font-medium text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* More Insights */}
      {moreInsights.length > 0 && (
        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-4">
            More insights
          </h3>
          <div className="flex flex-col gap-4">
            {moreInsights.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group flex gap-3 items-center"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] font-bold text-[#1b0c25] leading-tight group-hover:text-[#1b0c25]/70 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-gray-400 mt-1 truncate">
                    {item.date}
                  </p>
                </div>
                <div className="relative w-14 h-10 shrink-0 rounded bg-gray-100 overflow-hidden">
                  <Image
                    src={item.image || "/assets/placeholder.png"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
