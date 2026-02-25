"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { scaleInVariants, viewportSettings } from "@/lib/motion";
import TitleSection from "../TitleSection";
import type { TransformedBlogPost } from "@/lib/api/transformers";

interface RelatedPostsProps {
  posts: TransformedBlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-[40px] mt-[80px]">
      <div className="flex items-center gap-4">
        <TitleSection title="Related Articles" />
        <div className="h-px grow bg-black/10"></div>
      </div>

      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
        {posts.map((blog, index) => (
          <Link href={`/blog/${blog.slug}`} key={blog.id} className="block">
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
                    src={blog.imageBlog || "/assets/placeholder.png"}
                    alt={blog.description || blog.title}
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
      </div>
    </div>
  );
}
