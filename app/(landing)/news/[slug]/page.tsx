import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FadeInUp } from "@/lib/motion";
import RelatedNews from "@/components/sections/RelatedNews";
import NewsSidebar from "@/components/sections/NewsSidebar";
import { newsService } from "@/lib/api";
import { transformNewsItem } from "@/lib/api/transformers";
import { Container } from "@/components/ui/container";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const response = await newsService.getNewsBySlug(slug);

  if (response.error || !response.data) {
    return { title: "News not found" };
  }

  const item = response.data;

  return {
    title: item.title,
    description: item.excerpt || "",
    openGraph: {
      title: item.title,
      description: item.excerpt || "",
      images: item.coverImage ? [item.coverImage] : [],
      type: "article",
      publishedTime: item.publishedAt,
    },
  };
}

export default async function NewsDetail({ params }: PageProps) {
  const { slug } = await params;
  const response = await newsService.getNewsBySlug(slug);

  if (response.error || !response.data) {
    notFound();
  }

  const newsItem = response.data;
  const news = transformNewsItem(newsItem);

  return (
    <div>
      <div className="w-full bg-[#121212] relative min-h-[400px] flex items-end pb-12 pt-32">
        {news.image && (
          <div className="absolute inset-0 opacity-40">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#121212] via-[#121212]/50 to-transparent" />
          </div>
        )}
        <Container className="relative z-10">
          <FadeInUp>
            <div className="flex flex-col gap-4">
              <p className="text-gray-400 text-sm font-medium">{news.date}</p>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-[900px]">
                {news.title}
              </h1>
              <div className="flex items-center gap-3">
                {news.category && (
                  <span className="px-3 py-1 bg-white text-black text-xs font-bold uppercase rounded-sm">
                    {news.category}
                  </span>
                )}
                <p className="text-gray-300 font-medium">{news.excerpt}</p>
              </div>
            </div>
          </FadeInUp>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          <div className="min-w-0">
            <div className="prose prose-lg max-w-none text-[#1b0c25]/80">
              <div className="whitespace-pre-wrap leading-8">
                {news.content}
              </div>
            </div>
          </div>

          <div className="lg:block">
            <NewsSidebar
              currentNewsId={news.id}
              source={news.source}
              sourceUrl={news.sourceUrl}
              category={news.category}
              tags={news.tags}
            />
          </div>
        </div>
      </Container>

      <div className="w-full pb-20">
        <Container>
          <RelatedNews currentNewsId={news.id} category={news.category} />
        </Container>
      </div>
    </div>
  );
}
