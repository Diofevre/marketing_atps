"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { scaleInVariants, viewportSettings } from "@/lib/motion";
import type { TransformedNewsItem } from "@/lib/api/transformers";
import { NewsAuthorRow } from "./NewsFeaturedPost";

interface NewsCardProps {
  item: TransformedNewsItem;
  index: number;
}

export default function NewsCard({ item, index }: NewsCardProps) {
  return (
    <Link href={`/news/${item.slug}`} className="block">
      <motion.div
        layout
        variants={scaleInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        transition={{
          duration: 0.5,
          delay: index * 0.08,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="flex flex-col gap-3 group"
      >
        <div className="aspect-video rounded-xl overflow-hidden relative">
          <Image
            src={item.image || "/assets/placeholder.png"}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-[#1b0c25]">
            {item.category || "News"}
          </span>
          <h3 className="font-bold text-[#1b0c25] leading-snug line-clamp-2">
            {item.title}
          </h3>
          <div className="flex items-center justify-between mt-1">
            <NewsAuthorRow item={item} />
            <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-700 transition-colors shrink-0" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
