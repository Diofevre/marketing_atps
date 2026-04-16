import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Pricing from "@/components/sections/Pricing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  const pathPrefix = locale === "en" ? "" : `/${locale}`;

  return {
    title: t("title"),
    alternates: {
      canonical: `${pathPrefix}/pricing`,
      languages: {
        en: "/pricing",
        fr: "/fr/pricing",
        "x-default": "/pricing",
      },
    },
    openGraph: {
      title: t("title"),
      url: `${pathPrefix}/pricing`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
    },
  };
}

export default function PricingPage() {
  return (
    <div className="pt-20">
      <Pricing />
    </div>
  );
}
