import NewsList from "@/components/sections/NewsList";
import { Container } from "@/components/ui/container";
import { FadeInUp, StaggerContainer } from "@/lib/motion";
import { newsService } from "@/lib/api";
import { transformNewsItems } from "@/lib/api/transformers";
import type { Metadata } from "next";
import type { NewsLocale } from "@/lib/types";
import { getTranslations } from "next-intl/server";

interface NewsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "newsPage" });
  const pathPrefix = locale === "en" ? "" : `/${locale}`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${pathPrefix}/news`,
      languages: {
        en: "/news",
        fr: "/fr/news",
        "x-default": "/news",
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${pathPrefix}/news`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
    },
  };
}

// Render on every request so Googlebot always receives an HTML payload with
// actual article links, regardless of whether the API was reachable at build.
// Vercel still edge-caches the response via default Cache-Control headers.
export const dynamic = "force-dynamic";

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "newsPage" });
  // SSR-fetch the first page so search engines see article links in the HTML
  // payload. Filters and pagination remain client-side inside <NewsList />.
  // Pass `lang={locale}` so the backend swaps in the matching translation
  // when one exists — readers on /fr/news get French prose, readers on
  // /news get English. The backend falls back to the canonical columns
  // for legacy rows that don't yet have a translation for the locale.
  const [listRes, categoriesRes] = await Promise.all([
    newsService.getNews({
      page: 1,
      limit: 12,
      sortBy: "publishedAt",
      sortOrder: "desc",
      lang: locale as NewsLocale,
    }),
    newsService.getCategories(),
  ]);

  const initialNews = listRes.data
    ? transformNewsItems(listRes.data.news)
    : [];
  const initialPagination = listRes.data?.pagination;
  const initialCategories = categoriesRes.data
    ? ["All Category", ...categoriesRes.data.categories.map((c) => c.name)]
    : undefined;

  if (listRes.error) {
    console.error("[news/page] newsService.getNews failed:", listRes.error);
  }
  if (categoriesRes.error) {
    console.error(
      "[news/page] newsService.getCategories failed:",
      categoriesRes.error,
    );
  }

  return (
    <div className="pt-32 pb-20">
      <Container className="px-8 lg:px-6">
        <StaggerContainer className="flex flex-col items-start gap-4 mb-12">
          <FadeInUp>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#1b0c25] rounded-sm shrink-0" />
              <span className="text-sm font-semibold uppercase tracking-wider text-[#1b0c25]">
                {t("badge")}
              </span>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1b0c25] tracking-tight">
              {t("heading")}
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="text-base text-gray-500 max-w-xl leading-relaxed">
              {t("intro")}
            </p>
          </FadeInUp>
        </StaggerContainer>

        <NewsList
          initialNews={initialNews}
          initialPagination={initialPagination}
          initialCategories={initialCategories}
        />
      </Container>
    </div>
  );
}
