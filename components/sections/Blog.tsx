"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import TitleSection from "../TitleSection";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { motion } from "framer-motion";
import {
  fadeInUpVariants,
  fadeInUpDelayedVariants,
  scaleInVariants,
  viewportSettings,
} from "@/lib/motion";
import { blogService } from "@/lib/api";
import { transformBlogArticles, type TransformedBlogPost } from "@/lib/api/transformers";

export default function BlogSection() {
  const [posts, setPosts] = useState<TransformedBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      const response = await blogService.getRecentArticles(3);
      if (response.data) {
        const data = response.data as any;
        const articles = Array.isArray(data) ? data : (data.articles || []);
        setPosts(transformBlogArticles(articles));
      }
      setLoading(false);
    };

    fetchRecentPosts();
  }, []);

  return (
    <section className="py-16 max-lg:py-12 max-md:py-8">
      <Container className="flex flex-col mb-[40px]">
        <div className="flex flex-col gap-[40px] max-lg:gap-6 max-md:gap-4">
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="flex items-end justify-between max-lg:flex-col max-lg:items-start max-lg:gap-4"
          >
            <div className="flex flex-col items-start gap-[12px] max-lg:w-full">
              <TitleSection
                title="Blog"
                className="shadow-[0_33px_13px_0_rgba(0,0,0,0.01),0_19px_11px_0_rgba(0,0,0,0.04),0_8px_8px_0_rgba(0,0,0,0.06),0_2px_5px_0_rgba(0,0,0,0.07)]"
              />
              <div className="w-[620px] max-lg:w-full">
                <p className="text-[58px] leading-[60px] font-medium max-lg:text-4xl max-lg:leading-tight">
                  Explore Our Blog And Stay Updated
                </p>
              </div>
            </div>

            <motion.div variants={fadeInUpDelayedVariants}>
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="group w-[120px] h-[45px] text-[15px] leading-[26px] font-medium rounded-[8px] max-lg:w-[120px] max-lg:h-10 bg-white hover:bg-white"
                >
                  <span className="flex flex-col items-center h-[26px] overflow-hidden">
                    <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                      Explore All
                    </span>
                    <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                      Explore All
                    </span>
                  </span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[437px] rounded-[16px] bg-gray-100 animate-pulse max-lg:h-[350px]"
                  />
                ))
              : posts.map((blog, index) => (
                  <Link
                    href={`/blog/${blog.slug}`}
                    key={blog.id}
                    className="block"
                  >
                    <motion.div
                      variants={scaleInVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewportSettings}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.15,
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

                        <div className="w-full flex flex-col gap-4 px-2 max-lg:gap-3">
                          <div className="flex items-center justify-between">
                            <TitleSection
                              title={blog.title}
                              className="rounded-lg"
                            />
                            <p className="text-sm text-gray-500">{blog.date}</p>
                          </div>

                          <div className="max-lg:px-3">
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
      </Container>
    </section>
  );
}
