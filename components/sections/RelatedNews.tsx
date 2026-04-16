"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { scaleInVariants, viewportSettings } from "@/lib/motion";
import TitleSection from "../TitleSection";
import { newsService } from "@/lib/api";
import {
  transformNewsItems,
  unwrapNewsItems,
  type TransformedNewsItem,
} from "@/lib/api/transformers";
import type { NewsLocale } from "@/lib/types";

interface RelatedNewsProps {
  currentNewsId: string;
  category: string;
}

export default function RelatedNews({
  currentNewsId,
  category,
}: RelatedNewsProps) {
  const locale = useLocale() as NewsLocale;
  const [relatedNews, setRelatedNews] = useState<TransformedNewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedNews = async () => {
      setLoading(true);

      // Pass the current locale so related/fallback lists render in the
      // same language as the article the user is currently reading.
      const response = await newsService.getRelatedNews(currentNewsId, 4, locale);

      if (response.data) {
        const newsArray = unwrapNewsItems(response.data);
        const filtered = newsArray.filter((n) => n.id !== currentNewsId);
        setRelatedNews(transformNewsItems(filtered).slice(0, 3));
      } else {
        const fallbackResponse = await newsService.getRecentNews(4, locale);
        if (fallbackResponse.data) {
          const newsArray = unwrapNewsItems(fallbackResponse.data);
          const filtered = newsArray.filter((n) => n.id !== currentNewsId);
          setRelatedNews(transformNewsItems(filtered).slice(0, 3));
        }
      }

      setLoading(false);
    };

    fetchRelatedNews();
  }, [currentNewsId, category, locale]);

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-[40px] mt-[80px]">
        <div className="flex items-center gap-4">
          <TitleSection title="Related News" />
          <div className="h-px grow bg-black/10"></div>
        </div>
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[16px] bg-gray-100 animate-pulse aspect-video"
            />
          ))}
        </div>
      </div>
    );
  }

  if (relatedNews.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-[40px] mt-[80px]">
      <div className="flex items-center gap-4">
        <TitleSection title="Related News" />
        <div className="h-px grow bg-black/10"></div>
      </div>

      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
        {relatedNews.map((news, index) => (
          <Link href={`/news/${news.slug}`} key={news.id} className="block">
            <motion.div
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
                    src={news.image || "/assets/placeholder.png"}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="w-full flex flex-col gap-4 px-2 pb-4 max-lg:gap-3">
                  <div className="flex items-center justify-between">
                    <TitleSection
                      title={news.category || "News"}
                      className="rounded-lg"
                    />
                    <p className="text-sm text-gray-500">{news.date}</p>
                  </div>

                  <div>
                    <p className="font-medium text-lg leading-[26px] text-[#1b0c25] line-clamp-2">
                      {news.title}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
