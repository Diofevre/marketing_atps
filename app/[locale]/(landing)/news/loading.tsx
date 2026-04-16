import { getTranslations, getLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Search } from "lucide-react";

function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="aspect-video rounded-xl bg-gray-200/70" />
      <div className="h-3 w-16 bg-gray-200/70 rounded" />
      <div className="h-5 w-full bg-gray-200/70 rounded" />
      <div className="h-5 w-2/3 bg-gray-200/70 rounded" />
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gray-200/70" />
        <div className="h-3 w-20 bg-gray-200/70 rounded" />
      </div>
    </div>
  );
}

export default async function NewsLoading() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "newsPage" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <div className="pt-32 pb-20">
      <Container className="px-8 lg:px-6">
        {/* Real header — identical to the rendered page */}
        <div className="flex flex-col items-start gap-4 mb-12">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#1b0c25] rounded-sm shrink-0" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[#1b0c25]">
              {t("badge")}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1b0c25] tracking-tight">
            {t("heading")}
          </h1>
          <p className="text-base text-gray-500 max-w-xl leading-relaxed">
            {t("intro")}
          </p>
        </div>

        {/* Same layout as NewsList */}
        <div className="flex gap-8 lg:gap-12 items-start">
          {/* Real sidebar structure */}
          <aside className="w-[130px] sm:w-[180px] lg:w-[290px] shrink-0 flex flex-col gap-5 lg:gap-8 sticky top-32">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 lg:h-4 lg:w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search article..."
                disabled
                className="w-full pl-7 lg:pl-9 pr-2 lg:pr-3 py-1.5 lg:py-2.5 text-[11px] lg:text-sm border border-gray-200 rounded-lg bg-white placeholder:text-gray-400"
              />
            </div>
            <div className="flex flex-col gap-1 lg:gap-2">
              <p className="text-[9px] lg:text-xs font-semibold text-[#1b0c25] uppercase tracking-wide mb-0.5">
                Browse By Categories
              </p>
              <div className="border-l-2 border-[#1b0c25] px-2 lg:px-3 py-[3px] lg:py-2">
                <span className="text-[10px] lg:text-sm font-semibold text-[#1b0c25]">
                  {tCommon("allCategories")}
                </span>
              </div>
            </div>
          </aside>

          {/* Articles skeleton */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Featured skeleton */}
            <div className="flex flex-col lg:flex-row gap-5 items-start animate-pulse">
              <div className="w-full lg:w-[45%] aspect-video rounded-xl bg-gray-200/70 shrink-0" />
              <div className="flex-1 flex flex-col gap-3 pt-2 w-full">
                <div className="h-5 w-16 bg-gray-200/70 rounded-full" />
                <div className="h-7 w-full bg-gray-200/70 rounded" />
                <div className="h-7 w-3/4 bg-gray-200/70 rounded" />
                <div className="h-4 w-1/2 bg-gray-200/70 rounded" />
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-7 h-7 rounded-full bg-gray-200/70" />
                  <div className="h-3 w-24 bg-gray-200/70 rounded" />
                </div>
              </div>
            </div>

            {/* Grid skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
