import NewsList from "@/components/sections/NewsList";
import { Container } from "@/components/ui/container";
import { FadeInUp, StaggerContainer } from "@/lib/motion";
import { newsService } from "@/lib/api";
import { transformNewsItems } from "@/lib/api/transformers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News — Latest Updates from MyATPS",
  description:
    "Stay up to date with the latest MyATPS platform updates, new features, aviation industry news, and EASA exam regulation changes.",
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "MyATPS News — Platform Updates & Aviation News",
    description:
      "The latest updates from MyATPS: new features, aviation news, and EASA exam changes.",
  },
};

// Render on every request so Googlebot always receives an HTML payload with
// actual article links, regardless of whether the API was reachable at build.
// Vercel still edge-caches the response via default Cache-Control headers.
export const dynamic = "force-dynamic";

export default async function NewsPage() {
  // SSR-fetch the first page so search engines see article links in the HTML
  // payload. Filters and pagination remain client-side inside <NewsList />.
  const [listRes, categoriesRes] = await Promise.all([
    newsService.getNews({
      page: 1,
      limit: 12,
      sortBy: "publishedAt",
      sortOrder: "desc",
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
                Our News
              </span>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1b0c25] tracking-tight">
              News & Insights
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="text-base text-gray-500 max-w-xl leading-relaxed">
              Stay informed with the latest trends in EdTech, security, and
              online learning.
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
