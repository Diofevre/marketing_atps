import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { TransformedNewsItem } from "@/lib/api/transformers";

interface NewsFeaturedPostProps {
  item: TransformedNewsItem;
}

export function NewsAuthorRow({ item }: { item: TransformedNewsItem }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 text-xs rounded-full bg-gray-200 overflow-hidden relative shrink-0 flex items-center justify-center text-gray-500">
        {item.author?.avatar ? (
          <Image src={item.author.avatar} alt={item.author.name || ""} fill className="object-cover" />
        ) : (
          item.author?.name?.charAt(0) || "A"
        )}
      </div>
      <span className="text-xs text-gray-700 font-medium">
        {item.author?.name || "Anonymous"}
      </span>
      <span className="text-xs text-gray-400">5min read</span>
    </div>
  );
}

export function NewsFeaturedSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start animate-pulse">
      <div className="w-full lg:w-[45%] aspect-video rounded-xl bg-gray-200/60 shrink-0" />
      <div className="flex-1 flex flex-col gap-3 pt-2 w-full">
        <div className="h-5 w-16 bg-gray-200/60 rounded-full" />
        <div className="h-7 w-full bg-gray-200/60 rounded" />
        <div className="h-7 w-3/4 bg-gray-200/60 rounded" />
        <div className="h-4 w-1/2 bg-gray-200/60 rounded" />
        <div className="flex items-center gap-2 mt-1">
          <div className="w-7 h-7 rounded-full bg-gray-200/60" />
          <div className="h-3 w-24 bg-gray-200/60 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function NewsFeaturedPost({ item }: NewsFeaturedPostProps) {
  return (
    <Link href={`/news/${item.slug}`} className="block group">
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        <div className="w-full lg:w-[45%] aspect-video rounded-xl overflow-hidden relative shrink-0">
          <Image
            src={item.image || "/assets/placeholder.png"}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 flex flex-col gap-3 lg:pt-2">
          <span className="inline-flex w-fit text-xs font-medium px-2.5 py-1 rounded-full bg-[#1b0c25]/8 text-[#1b0c25] border border-[#1b0c25]/15">
            Featured
          </span>
          <h2 className="text-lg lg:text-2xl font-bold text-[#1b0c25] leading-tight line-clamp-3">
            {item.title}
          </h2>
          <p className="text-sm text-gray-500 line-clamp-2">
            {item.excerpt || "Stay informed with the latest trends and updates."}
          </p>
          <NewsAuthorRow item={item} />
        </div>
      </div>
    </Link>
  );
}
