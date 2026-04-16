import BlogList from "@/components/sections/BlogList";
import { Container } from "@/components/ui/container";
import { FadeInUp, StaggerContainer } from "@/lib/motion";
import { blogService } from "@/lib/api";
import { transformBlogArticles } from "@/lib/api/transformers";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogPage" });
  const pathPrefix = locale === "en" ? "" : `/${locale}`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${pathPrefix}/blog`,
      languages: {
        en: "/blog",
        fr: "/fr/blog",
        "x-default": "/blog",
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${pathPrefix}/blog`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
    },
  };
}

// Render on every request so Googlebot always receives an HTML payload with
// actual article links, regardless of whether the API was reachable at build.
// Vercel still edge-caches the response via default Cache-Control headers.
export const dynamic = "force-dynamic";

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogPage" });
  // SSR-fetch the first page so search engines see article links in the HTML
  // payload. Filters and pagination remain client-side inside <BlogList />.
  const [listRes, categoriesRes] = await Promise.all([
    blogService.getArticles({
      page: 1,
      limit: 12,
      status: "published",
      sortBy: "publishedAt",
      sortOrder: "desc",
    }),
    blogService.getCategories(),
  ]);

  const initialPosts = listRes.data
    ? transformBlogArticles(listRes.data.articles)
    : [];
  const initialPagination = listRes.data?.pagination;
  const initialCategories = categoriesRes.data
    ? ["All Category", ...categoriesRes.data.categories.map((c) => c.name)]
    : undefined;

  if (listRes.error && listRes.error.code !== "NO_API_URL") {
    console.error("[blog/page] blogService.getArticles failed:", listRes.error);
  }
  if (categoriesRes.error && categoriesRes.error.code !== "NO_API_URL") {
    console.error(
      "[blog/page] blogService.getCategories failed:",
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

        <BlogList
          initialPosts={initialPosts}
          initialPagination={initialPagination}
          initialCategories={initialCategories}
        />
      </Container>
    </div>
  );
}
