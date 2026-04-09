import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import About from "@/components/sections/About";
import Bento from "@/components/sections/Bento";
import BlogSection from "@/components/sections/Blog";
import Faqs from "@/components/sections/Faqs";
import Hero from "@/components/sections/Hero";
import KeyBenefits from "@/components/sections/KeyBenefits";
import Pricing from "@/components/sections/Pricing";
import ProductOverview from "@/components/sections/ProductOverview";
import Testimonials from "@/components/sections/Testimonials";
import Work from "@/components/sections/Work";
import { blogService } from "@/lib/api";
import {
  transformBlogArticles,
  unwrapBlogArticles,
} from "@/lib/api/transformers";

/**
 * The home page inherits its title/description/OG from the root layout
 * (see app/[locale]/layout.tsx), which already pulls from the
 * `metadata` namespace. We only override `alternates` here because the
 * root layout's canonical ends with a trailing slash — on the home page
 * we want the canonical to match the actual rendered URL exactly, and
 * we need to re-declare `languages` because Next.js replaces the whole
 * `alternates` block when a page sets it, instead of merging.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "homePage" });
  const pathPrefix = locale === "en" ? "" : `/${locale}`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${pathPrefix}/`,
      languages: {
        en: "/",
        fr: "/fr/",
        "x-default": "/",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${pathPrefix}/`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
    },
  };
}

// Render on every request so the home page HTML always contains the 3 most
// recent blog article links for Googlebot, regardless of whether the API was
// reachable at build. Vercel still edge-caches the response.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // SSR-fetch the 3 most recent blog articles so the home page HTML contains
  // crawlable `/blog/<slug>` links for search engines.
  const recentRes = await blogService.getRecentArticles(3);
  if (recentRes.error) {
    console.error(
      "[home] blogService.getRecentArticles failed:",
      recentRes.error,
    );
  }
  const initialPosts = recentRes.data
    ? transformBlogArticles(unwrapBlogArticles(recentRes.data))
    : [];

  return (
    <>
      <Navigation />
      <Hero />
      <Bento />
      <ProductOverview />
      <About />
      <KeyBenefits />
      <Testimonials />
      <Work />
      <Pricing />
      <Faqs />
      <BlogSection initialPosts={initialPosts} />
      <Footer />
    </>
  );
}
