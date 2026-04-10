import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProcteoHero from "@/components/sections/enterprise/ProcteoHero";
import ProcteoLayers from "@/components/sections/enterprise/ProcteoLayers";
import ProcteoCapabilities from "@/components/sections/enterprise/ProcteoCapabilities";
import ProcteoConfig from "@/components/sections/enterprise/ProcteoConfig";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "enterpriseProcteo" });
  const pathPrefix = locale === "en" ? "" : `/${locale}`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${pathPrefix}/enterprise/procteo`,
      languages: {
        en: "/enterprise/procteo",
        fr: "/fr/enterprise/procteo",
        "x-default": "/enterprise/procteo",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${pathPrefix}/enterprise/procteo`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
    },
  };
}

export default function ProcteoPage() {
  return (
    <>
      <ProcteoHero />
      <ProcteoLayers />
      <ProcteoCapabilities />
      <ProcteoConfig />
    </>
  );
}
