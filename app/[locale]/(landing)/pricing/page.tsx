import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ChevronRight } from "lucide-react";
import Pricing from "@/components/sections/Pricing";
import Faqs from "@/components/sections/Faqs";
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
  const tSchema = await getTranslations({ locale, namespace: "schema" });
  const pathPrefix = locale === "en" ? "" : `/${locale}`;

  // Product + subscription Offer with priceSpecification. The dedicated
  // /pricing page gives Google a canonical URL to attach the Product rich
  // result to when users search "MyATPS pricing".
  // Note: `priceValidUntil` is kept under a year out so Google continues to
  // honour the offer — we bump this whenever pricing is reviewed.
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="pt-16 lg:pt-24 pb-4">
        <Container className="max-w-3xl">
          <nav
            aria-label={t("breadcrumbPricing")}
            className="flex items-center justify-center gap-2 text-sm text-[#1b0c25]/60 mb-6"
          >
            <Link href="/" className="hover:text-[#1b0c25]">
              {t("breadcrumbHome")}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1b0c25]">{t("breadcrumbPricing")}</span>
          </nav>

          <div className="text-center">
            <span className="inline-block text-xs font-medium uppercase tracking-wider text-[#1b0c25]/60 mb-4">
              {t("heroEyebrow")}
            </span>
            <h1 className="text-4xl lg:text-6xl font-semibold text-[#1b0c25] mb-5">
              {t("heroTitle")}
            </h1>
            <p className="text-lg text-[#1b0c25]/70">{t("heroSubtitle")}</p>
          </div>
        </Container>
      </section>

      <Pricing />

      <section className="py-12 lg:py-20 bg-white">
        <Container className="max-w-3xl">
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#1b0c25] mb-6 text-center">
            {t("whyTitle")}
          </h2>
          <div className="space-y-4 text-[#1b0c25]/80 leading-relaxed">
            <p>{t("whyBody1")}</p>
            <p>{t("whyBody2")}</p>
            <p>{t("whyBody3")}</p>
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-20">
        <Container className="max-w-3xl">
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#1b0c25] mb-4 text-center">
            {t("compareTitle")}
          </h2>
          <p className="text-[#1b0c25]/70 text-center mb-8">
            {t("compareIntro")}
          </p>

          <dl className="grid gap-0 rounded-2xl overflow-hidden border border-[#1b0c25]/10 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-[#1b0c25]/10">
              <dt className="p-4 text-sm font-medium text-[#1b0c25]/70 bg-[#F7F6F7]">
                {t("compareRow1Label")}
              </dt>
              <dd className="p-4 text-[#1b0c25]">{t("compareRow1Value")}</dd>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-[#1b0c25]/10">
              <dt className="p-4 text-sm font-medium text-[#1b0c25]/70 bg-[#F7F6F7]">
                {t("compareRow2Label")}
              </dt>
              <dd className="p-4 text-[#1b0c25]">{t("compareRow2Value")}</dd>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-[#1b0c25]/10">
              <dt className="p-4 text-sm font-medium text-[#1b0c25]/70 bg-[#F7F6F7]">
                {t("compareRow3Label")}
              </dt>
              <dd className="p-4 text-[#1b0c25]">{t("compareRow3Value")}</dd>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 bg-[#1b0c25] text-white">
              <dt className="p-4 text-sm font-semibold">
                {t("compareRow4Label")}
              </dt>
              <dd className="p-4 font-medium">{t("compareRow4Value")}</dd>
            </div>
          </dl>

          <p className="mt-6 text-xs text-[#1b0c25]/50 text-center">
            {t("compareNote")}
          </p>
        </Container>
      </section>

      <Faqs />

      <section className="py-16 lg:py-24">
        <Container className="max-w-2xl text-center">
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#1b0c25] mb-4">
            {t("finalCtaTitle")}
          </h2>
          <p className="text-[#1b0c25]/70 mb-8">{t("finalCtaSubtitle")}</p>
          <Link href={`${APP_URL}/auth/signup`}>
            <Button className="h-12 px-8 bg-black hover:bg-black/90 text-white">
              {t("finalCtaButton")}
            </Button>
          </Link>
        </Container>
      </section>
    </>
  );
}
