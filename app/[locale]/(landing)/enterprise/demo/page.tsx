import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DemoPage from "@/components/sections/enterprise/demo/DemoPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "enterpriseDemo" });
  const pathPrefix = locale === "en" ? "" : `/${locale}`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${pathPrefix}/enterprise/demo`,
      languages: {
        en: "/enterprise/demo",
        fr: "/fr/enterprise/demo",
        "x-default": "/enterprise/demo",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${pathPrefix}/enterprise/demo`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
    },
  };
}

export default function EnterpriseDemoPage() {
  return <DemoPage />;
}
