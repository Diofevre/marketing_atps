"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { scaleInVariants, viewportSettings } from "@/lib/motion";
import TitleSection from "../TitleSection";
import { newsService } from "@/lib/api";
import { transformNewsItems, type TransformedNewsItem } from "@/lib/api/transformers";

interface RelatedNewsProps {
  currentNewsId: string;
  category: string;
}

export default function RelatedNews({
  currentNewsId,
  category,
}: RelatedNewsProps) {
  const [relatedNews, setRelatedNews] = useState<TransformedNewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedNews = async () => {
      setLoading(true);

      const response = await newsService.getRelatedNews(currentNewsId, 4);

      if (response.data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = response.data as any;
        const newsArray = Array.isArray(data) ? data : (data.news || []);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filtered = newsArray.filter((n: any) => n.id !== currentNewsId);
        setRelatedNews(transformNewsItems(filtered).slice(0, 3));
      } else {
        const fallbackResponse = await newsService.getRecentNews(4);
        if (fallbackResponse.data) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data = fallbackResponse.data as any;
          const newsArray = Array.isArray(data) ? data : (data.news || []);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const filtered = newsArray.filter((n: any) => n.id !== currentNewsId);
          setRelatedNews(transformNewsItems(filtered).slice(0, 3));
        }
      }

      setLoading(false);
    };

    fetchRelatedNews();
  }, [currentNewsId, category]);

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
