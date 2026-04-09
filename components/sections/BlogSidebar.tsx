"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, X } from "lucide-react";
import { blogService } from "@/lib/api";
import { transformBlogArticles, type TransformedBlogPost } from "@/lib/api/transformers";
import { SidebarSkeleton } from "@/components/ui/skeleton-card";

interface BlogSidebarProps {
  currentPostId: string;
  author:
    | {
        name: string;
        avatar?: string;
      }
    | null
    | undefined;
  tags?: string[];
  title: string;
}

export default function BlogSidebar({
  currentPostId,
  author,
  tags,
  title,
}: BlogSidebarProps) {
  const [moreArticles, setMoreArticles] = useState<TransformedBlogPost[]>([]);
  const [popularArticles, setPopularArticles] = useState<TransformedBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);

      const [recentResponse, popularResponse] = await Promise.all([
        blogService.getRecentArticles(4),
        blogService.getPopularArticles(4),
      ]);

      if (recentResponse.data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = recentResponse.data as any;
        const articlesArray = Array.isArray(data) ? data : (data.articles || []);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filtered = articlesArray.filter((a: any) => a.id !== currentPostId);
        setMoreArticles(transformBlogArticles(filtered).slice(0, 3));
      }

      if (popularResponse.data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = popularResponse.data as any;
        const articlesArray = Array.isArray(data) ? data : (data.articles || []);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filtered = articlesArray.filter((a: any) => a.id !== currentPostId);
        setPopularArticles(transformBlogArticles(filtered).slice(0, 3));
      }

      setLoading(false);
    };

    fetchArticles();
  }, [currentPostId]);

  const handleShare = (platform: "twitter" | "facebook" | "linkedin") => {
    const text = `Check out: ${title}`;
    const url = window.location.href;

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    window.open(urls[platform], "_blank");
  };

  if (loading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="w-full lg:w-[320px] flex flex-col gap-8">
      {/* Posted By */}
      <div>
        <p className="text-[11px] leading-3.25 font-semibold uppercase tracking-wide text-black/50 mb-3">
          Posted by
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-black/60 text-sm overflow-hidden relative">
            {author?.avatar ? (
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover"
              />
            ) : (
              author?.name?.charAt(0) || "A"
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[#1b0c25] text-sm font-bold truncate">
              {author?.name || "Anonymous"}
            </p>
            <p className="text-black/55 text-xs truncate">Author</p>
          </div>
        </div>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div>
          <p className="text-[11px] leading-3.25 font-semibold uppercase tracking-wide text-black/50 mb-3">
            Tags
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-[11px] font-medium text-black/70"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* More Articles */}
      {moreArticles.length > 0 && (
        <div>
          <p className="text-[11px] leading-3.25 font-semibold uppercase tracking-wide text-black/50 mb-4">
            More articles
          </p>
          <div className="flex flex-col gap-4">
            {moreArticles.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex gap-3 items-center"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[#1b0c25] text-[13px] leading-relaxed font-bold line-clamp-2 group-hover:text-[#1b0c25]/70 transition-colors">
                    {post.description}
                  </p>
                  <p className="text-black/55 text-xs mt-1 truncate">
                    {post.author?.name || "Anonymous"}
                  </p>
                </div>
                <div className="relative w-14 h-10 shrink-0 rounded-sm bg-gray-100 overflow-hidden">
                  <Image
                    src={post.imageBlog || "/assets/placeholder.png"}
                    alt={post.description}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Popular Articles */}
      {popularArticles.length > 0 && (
        <div>
          <p className="text-[11px] leading-3.25 font-semibold uppercase tracking-wide text-black/50 mb-4">
            Popular articles
          </p>
          <div className="flex flex-col gap-4">
            {popularArticles.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex gap-3 items-center"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[#1b0c25] text-[13px] leading-relaxed font-bold line-clamp-2 group-hover:text-[#1b0c25]/70 transition-colors">
                    {post.description}
                  </p>
                  <p className="text-black/55 text-xs mt-1 truncate">
                    {post.author?.name || "Anonymous"}
                  </p>
                </div>
                <div className="relative w-14 h-10 shrink-0 rounded-sm bg-gray-100 overflow-hidden">
                  <Image
                    src={post.imageBlog || "/assets/placeholder.png"}
                    alt={post.description}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Share */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <p className="text-black/60 text-xs">Share:</p>
        <div className="flex items-center gap-4 text-black/70">
          <button
            type="button"
            aria-label="Share on X"
            className="hover:text-black transition-colors"
            onClick={() => handleShare("twitter")}
          >
            <X className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Share on Facebook"
            className="hover:text-black transition-colors"
            onClick={() => handleShare("facebook")}
          >
            <Facebook className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Share on LinkedIn"
            className="hover:text-black transition-colors"
            onClick={() => handleShare("linkedin")}
          >
            <Linkedin className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
