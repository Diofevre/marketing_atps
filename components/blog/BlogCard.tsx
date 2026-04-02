"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { scaleInVariants, viewportSettings } from "@/lib/motion";
import type { TransformedBlogPost } from "@/lib/api/transformers";
import { AuthorRow } from "./BlogFeaturedPost";

interface BlogCardProps {
  post: TransformedBlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
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
            src={post.imageBlog || "/assets/placeholder.png"}
            alt={post.description}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-[#1B0C25]">
            {post.title || post.category || "Category"}
          </span>
          <h3 className="font-bold text-[#1b0c25] leading-snug line-clamp-2">
            {post.description}
          </h3>
          <div className="flex items-center justify-between mt-1">
            <AuthorRow post={post} size="sm" />
            <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-700 transition-colors shrink-0" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
