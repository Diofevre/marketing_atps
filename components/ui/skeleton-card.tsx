"use client";

import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SkeletonCardProps {
  className?: string;
}

export function BlogCardSkeleton({ className }: SkeletonCardProps) {
  return (
    <div className={cn("rounded-[16px]", className)}>
      <div className="flex flex-col items-center gap-6">
        <div className="w-full aspect-video rounded-xl bg-gray-200/60 animate-pulse" />
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="h-6 w-20 bg-gray-200/60 rounded-full animate-pulse" />
            <div className="h-4 w-24 bg-gray-200/60 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-6 w-full bg-gray-200/60 rounded animate-pulse" />
            <div className="h-6 w-3/4 bg-gray-200/60 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function NewsCardSkeleton({ className }: SkeletonCardProps) {
  return (
    <div className={cn("rounded-[16px]", className)}>
      <div className="flex flex-col items-center gap-6">
        <div className="w-full aspect-video rounded-xl bg-gray-200/60 animate-pulse" />
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="h-6 w-20 bg-gray-200/60 rounded-full animate-pulse" />
            <div className="h-4 w-24 bg-gray-200/60 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-6 w-full bg-gray-200/60 rounded animate-pulse" />
            <div className="h-6 w-3/4 bg-gray-200/60 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CategoryFilterSkeleton() {
  return (
    <div className="flex flex-wrap gap-3 justify-start">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-10 w-24 bg-gray-200/60 rounded-full animate-pulse"
        />
      ))}
    </div>
  );
}

export function BlogListSkeleton() {
  return (
    <div className="w-full flex flex-col gap-12">
      <CategoryFilterSkeleton />
      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function NewsListSkeleton() {
  return (
    <div className="w-full flex flex-col gap-12">
      <CategoryFilterSkeleton />
      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function BlogDetailSkeleton() {
  return (
    <div className="pb-20">
      <div className="max-w-[1240px] mx-auto px-4 pt-[140px] pb-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          <div className="min-w-0">
            <div className="flex flex-col items-start gap-6 mb-10">
              <div className="h-6 w-40 bg-gray-200/60 rounded-full animate-pulse" />
              <div className="space-y-3 w-full">
                <div className="h-10 w-full bg-gray-200/60 rounded animate-pulse" />
                <div className="h-10 w-3/4 bg-gray-200/60 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200/60 animate-pulse" />
                <div className="space-y-1">
                  <div className="h-4 w-24 bg-gray-200/60 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-gray-200/60 rounded animate-pulse" />
                </div>
              </div>
            </div>
            <div className="w-full aspect-video rounded-2xl bg-gray-200/60 animate-pulse mb-12" />
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200/60 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200/60 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200/60 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200/60 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-200/60 rounded animate-pulse" />
            </div>
          </div>
          <SidebarSkeleton />
        </div>
      </div>
    </div>
  );
}

export function NewsDetailSkeleton() {
  return (
    <div>
      <div className="w-full bg-[#121212] relative min-h-[400px] flex items-end pb-12 pt-32">
        <Container className="relative z-10">
          <div className="flex flex-col gap-4">
            <div className="h-4 w-32 bg-gray-600/60 rounded animate-pulse" />
            <div className="space-y-3">
              <div className="h-12 w-full max-w-[700px] bg-gray-600/60 rounded animate-pulse" />
              <div className="h-12 w-3/4 max-w-[500px] bg-gray-600/60 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-20 bg-gray-600/60 rounded animate-pulse" />
              <div className="h-4 w-48 bg-gray-600/60 rounded animate-pulse" />
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          <div className="min-w-0 space-y-4">
            <div className="h-4 w-full bg-gray-200/60 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200/60 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200/60 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200/60 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-200/60 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200/60 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-200/60 rounded animate-pulse" />
          </div>
          <SidebarSkeleton />
        </div>
      </Container>

      <div className="w-full pb-20">
        <Container>
          <RelatedNewsSkeleton />
        </Container>
      </div>
    </div>
  );
}

export function RelatedNewsSkeleton() {
  return (
    <div className="w-full flex flex-col gap-[40px] mt-[80px]">
      <div className="flex items-center gap-4">
        <div className="h-8 w-48 bg-gray-200/60 rounded animate-pulse" />
        <div className="h-px grow bg-gray-200/60"></div>
      </div>
      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-[16px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <div className="flex flex-col items-center py-2 gap-6">
              <div className="w-[calc(100%-16px)] aspect-video rounded-xl bg-gray-200/60 animate-pulse" />
              <div className="w-full flex flex-col gap-4 px-2 pb-4">
                <div className="flex items-center justify-between px-4">
                  <div className="h-6 w-20 bg-gray-200/60 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200/60 rounded animate-pulse" />
                </div>
                <div className="px-4 space-y-2">
                  <div className="h-6 w-full bg-gray-200/60 rounded animate-pulse" />
                  <div className="h-6 w-2/3 bg-gray-200/60 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <aside className="w-full lg:w-[320px] flex flex-col gap-8">
      <div>
        <div className="h-3 w-16 bg-gray-200/60 rounded animate-pulse mb-3" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200/60 animate-pulse" />
          <div className="space-y-1">
            <div className="h-4 w-24 bg-gray-200/60 rounded animate-pulse" />
            <div className="h-3 w-16 bg-gray-200/60 rounded animate-pulse" />
          </div>
        </div>
      </div>
      <div>
        <div className="h-3 w-12 bg-gray-200/60 rounded animate-pulse mb-3" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-6 w-16 bg-gray-200/60 rounded-full animate-pulse"
            />
          ))}
        </div>
      </div>
      <div>
        <div className="h-3 w-24 bg-gray-200/60 rounded animate-pulse mb-4" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3 items-center">
              <div className="flex-1 space-y-1">
                <div className="h-4 w-full bg-gray-200/60 rounded animate-pulse" />
                <div className="h-3 w-20 bg-gray-200/60 rounded animate-pulse" />
              </div>
              <div className="w-14 h-10 bg-gray-200/60 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
