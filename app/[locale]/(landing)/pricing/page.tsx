import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Check, X, ShieldCheck, CreditCard, Zap } from "lucide-react";
import Pricing from "@/components/sections/Pricing";
import PricingHero from "@/components/sections/PricingHero";
import Faqs from "@/components/sections/Faqs";
import TitleSection from "@/components/TitleSection";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { APP_URL } from "@/lib/constants";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://myatps.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricingPage" });
  const pathPrefix = locale === "en" ? "" : `/${locale}`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${pathPrefix}/pricing`,
      languages: {
        en: "/pricing",
        fr: "/fr/pricing",
        "x-default": "/pricing",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${pathPrefix}/pricing`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
    },
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricingPage" });
  const tPricing = await getTranslations({ locale, namespace: "pricing" });
  const tSchema = await getTranslations({ locale, namespace: "schema" });
  const pathPrefix = locale === "en" ? "" : `/${locale}`;

  // priceValidUntil is kept under a year out so Google continues to honour
  // the offer — bump this whenever pricing is reviewed.
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "MyATPS Premium",
    description: tSchema("offerPremiumDescription"),
    brand: { "@type": "Brand", name: "MyATPS" },
    url: `${SITE_URL}${pathPrefix}/pricing`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "2000",
      bestRating: "5",
    },
    offers: {
      "@type": "Offer",
      price: "10",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}${pathPrefix}/pricing`,
      priceValidUntil: "2026-12-31",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "10",
        priceCurrency: "EUR",
        billingDuration: "P1M",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: 1,
          unitCode: "MON",
        },
      },
    },
  };

  // Kept for SEO even though the visible breadcrumb is removed — Google
  // still indexes the JSON-LD trail.
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("breadcrumbHome"),
        item: `${SITE_URL}${pathPrefix}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("breadcrumbPricing"),
        item: `${SITE_URL}${pathPrefix}/pricing`,
      },
    ],
  };

  const whyPrinciples = [t("whyBody1"), t("whyBody2"), t("whyBody3")];

  const marketRows = [
    { label: t("compareRow1Label"), value: t("compareRow1Value") },
    { label: t("compareRow2Label"), value: t("compareRow2Value") },
    { label: t("compareRow3Label"), value: t("compareRow3Value") },
  ];

  return (
    <div className="pt-20 lg:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PricingHero />

      <Pricing />

      {/* ============================================================
          WHY €10/MONTH — items-start, oversized title, numbered cards
          ============================================================ */}
      <section className="relative px-4 py-24 lg:py-36">
        <Container className="max-w-6xl">
          {/* Items-start header block — accent square + title */}
          <div className="flex flex-col items-start gap-5 lg:gap-6 mb-14 lg:mb-20 max-w-3xl">
            <span className="flex h-3 w-3 rounded-sm bg-[#1b0c25]" />
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium text-[#1b0c25] tracking-tight leading-tight lg:leading-[46px]">
              {t("whyTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            {whyPrinciples.map((body, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-6 p-8 lg:p-10 bg-white rounded-2xl border border-[#1b0c25]/8"
              >
                <div className="flex flex-col items-start gap-3">
                  <span className="text-4xl lg:text-5xl font-semibold text-[#1b0c25] tracking-tight leading-none">
                    0{index + 1}
                  </span>
                  <span
                    aria-hidden="true"
                    className="block h-px w-10 bg-gradient-to-r from-[#c34f96] to-transparent"
                  />
                </div>

                <p className="text-[#1b0c25]/75 leading-relaxed text-[15px] lg:text-[15px] lg:leading-[26px]">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================================
          MARKET COMPARISON — 2-column layout: title left, table right
          ============================================================ */}
      <section className="px-4 py-24 lg:py-36">
        <Container className="flex flex-col lg:flex-row items-start gap-10 lg:gap-[60px]">
          {/* Left column — sticky title block */}
          <div className="w-full lg:w-[366px] shrink-0">
            <div className="flex flex-col items-start gap-5 lg:gap-6 lg:sticky lg:top-[100px]">
              <span className="flex h-3 w-3 rounded-sm bg-[#1b0c25]" />
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium text-[#1b0c25] tracking-tight leading-tight lg:leading-[46px]">
                {t("compareTitle")}
              </h2>
              <p className="text-[#1b0c25]/65 leading-relaxed text-base lg:text-lg">
                {t("compareIntro")}
              </p>
              <p className="text-xs text-[#1b0c25]/50 leading-relaxed mt-2">
                {t("compareNote")}
              </p>
            </div>
          </div>

          {/* Right column — comparison table */}
          <div className="relative flex-1 w-full">
            <dl className="overflow-hidden rounded-3xl border border-[#1b0c25]/10 bg-white shadow-[0_8px_40px_-12px_rgba(27,12,37,0.08)]">
              {marketRows.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] border-b border-[#1b0c25]/8"
                >
                  <dt className="flex items-start gap-2.5 p-6 lg:p-7 text-sm font-medium text-[#1b0c25]/60 bg-[#fafafa]">
                    <X className="w-4 h-4 mt-0.5 shrink-0 text-[#1b0c25]/25" />
                    {row.label}
                  </dt>
                  <dd className="p-6 lg:p-7 text-[#1b0c25] text-[15px] lg:text-base">
                    {row.value}
                  </dd>
                </div>
              ))}

              {/* MyATPS highlighted row — VS chip floating on top */}
              <div className="relative grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] bg-gradient-to-r from-[#1b0c25] via-[#2d1640] to-[#1b0c25] text-white">
                <span
                  aria-hidden="true"
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#1b0c25] border border-[#1b0c25]/10 shadow-[0_4px_12px_rgba(27,12,37,0.15)]"
                >
                  VS
                </span>

                <dt className="flex items-start gap-2.5 p-6 lg:p-7 text-sm font-semibold pt-8 sm:pt-7">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#c34f96] to-[#ff49d4] shadow-[0_0_12px_rgba(195,79,150,0.5)]">
                    <Check
                      className="w-2.5 h-2.5 text-white"
                      strokeWidth={3}
                    />
                  </span>
                  {t("compareRow4Label")}
                </dt>
                <dd className="p-6 lg:p-7 font-medium text-[15px] lg:text-base">
                  {t("compareRow4Value")}
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      <Faqs />

      {/* ============================================================
          FINAL CTA — items-start, oversized headline, gradient card
          ============================================================ */}
      <section className="px-4 py-24 lg:py-36">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1b0c25] via-[#2d1640] to-[#1b0c25] p-10 lg:p-20 shadow-[0_40px_80px_-20px_rgba(27,12,37,0.5)]">
            {/* Glow blobs */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute -top-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-[#c34f96]/30 blur-3xl" />
              <div className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-[#80a9fc]/20 blur-3xl" />
            </div>

            {/* Items-start CTA layout — title left, button row right (or below on mobile) */}
            <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-16">
              <div className="flex flex-col items-start gap-5 lg:gap-6 max-w-2xl">
                <TitleSection title={tPricing("freeName")} variant="light" />
                <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium text-white tracking-tight leading-tight lg:leading-[46px]">
                  {t("finalCtaTitle")}
                </h2>
                <p className="text-white/65 text-base lg:text-lg leading-relaxed">
                  {t("finalCtaSubtitle")}
                </p>
              </div>

              <div className="flex flex-col items-start gap-5 shrink-0">
                <Link href={`${APP_URL}/auth/signup`}>
                  <Button className="group h-12 px-8 bg-white hover:bg-white/90 text-[#1b0c25] rounded-[8px] text-[15px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.4)]">
                    <span className="flex flex-col items-center h-[26px] overflow-hidden">
                      <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                        {t("finalCtaButton")}
                      </span>
                      <span className="block h-[26px] leading-[26px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                        {t("finalCtaButton")}
                      </span>
                    </span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Trust micro-badges — full-width row at the bottom of the card */}
            <div className="relative mt-12 lg:mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs text-white/55">
              <span className="inline-flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                {tPricing("freePriceNote")}
              </span>
              <span className="hidden sm:inline-block w-px h-3 bg-white/15" />
              <span className="inline-flex items-center gap-2">
                <Zap className="w-4 h-4" />
                {tPricing("premiumPriceNote")}
              </span>
              <span className="hidden sm:inline-block w-px h-3 bg-white/15" />
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                {tPricing("marketBadge")}
              </span>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
