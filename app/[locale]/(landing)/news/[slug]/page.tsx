import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { FadeInUp } from "@/lib/motion";
import RelatedNews from "@/components/sections/RelatedNews";
import NewsSidebar from "@/components/sections/NewsSidebar";
import { newsService } from "@/lib/api";
import { transformNewsItem } from "@/lib/api/transformers";
import { Container } from "@/components/ui/container";
import type { Metadata } from "next";
import type { NewsLocale } from "@/lib/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://myatps.com";

interface PageProps {
  // Next.js 16 app-router dynamic params are async. Both `locale` (from the
  // `[locale]` segment in the URL tree) and `slug` (from the `[slug]`
  // segment here) arrive together.
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const response = await newsService.getNewsBySlug(slug, locale as NewsLocale);

  if (response.error || !response.data) {
    return {
      title: "News not found",
      robots: { index: false, follow: false },
    };
  }

  const item = response.data;
  // Locale-aware URL so canonical matches the rendered page exactly.
  const pathPrefix = locale === "en" ? "" : `/${locale}`;
  const itemUrl = `${pathPrefix}/news/${item.slug}`;

  return {
    title: item.title,
    description: item.excerpt || "",
    alternates: {
      canonical: itemUrl,
      // Each news article exists under BOTH locale URLs now that the
      // backend RSS pipeline emits bilingual content — the slug itself
      // is shared between en/fr. The backend's `applyLocale` read path
      // falls back to the canonical language for legacy rows that
      // don't yet have a translation for the requested locale, so
      // pointing Googlebot at both URLs is always safe: it will find
      // real content at each address.
      languages: {
        en: `/news/${item.slug}`,
        fr: `/fr/news/${item.slug}`,
        "x-default": `/news/${item.slug}`,
      },
    },
    openGraph: {
      title: item.title,
      description: item.excerpt || "",
      url: itemUrl,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      images: item.coverImage ? [item.coverImage] : [],
      type: "article",
      publishedTime: item.publishedAt,
    },
  };
}

export default async function NewsDetail({ params }: PageProps) {
  const { locale, slug } = await params;
  const response = await newsService.getNewsBySlug(slug, locale as NewsLocale);

  if (response.error || !response.data) {
    notFound();
  }

  const newsItem = response.data;
  const news = transformNewsItem(newsItem);

  // JSON-LD NewsArticle schema for rich snippets in Google News and search
  // results. Also emit a BreadcrumbList so Google can render the hierarchy
  // (Home > News > Article).
  const newsJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: newsItem.title,
    description: newsItem.excerpt || "",
    image: newsItem.coverImage ? [newsItem.coverImage] : undefined,
    datePublished: newsItem.publishedAt,
    dateModified: newsItem.updatedAt || newsItem.publishedAt,
    author: { "@type": "Organization", name: newsItem.source || "MyATPS" },
    publisher: {
      "@type": "Organization",
      name: "MyATPS",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/logo-myatps.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/news/${newsItem.slug}`,
    },
    keywords: newsItem.tags?.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "News",
        item: `${SITE_URL}/news`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: newsItem.title,
        item: `${SITE_URL}/news/${newsItem.slug}`,
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
