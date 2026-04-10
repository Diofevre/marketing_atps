import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import EnterpriseHero from "@/components/sections/enterprise/EnterpriseHero";
import ProcteoShowcase from "@/components/sections/enterprise/ProcteoShowcase";
import EnterpriseFeatures from "@/components/sections/enterprise/EnterpriseFeatures";
import EnterprisePlans from "@/components/sections/enterprise/EnterprisePlans";
import EnterpriseTestimonials from "@/components/sections/enterprise/EnterpriseTestimonials";
import EnterpriseCompliance from "@/components/sections/enterprise/EnterpriseCompliance";
import EnterpriseCTA from "@/components/sections/enterprise/EnterpriseCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "enterprise" });
  const pathPrefix = locale === "en" ? "" : `/${locale}`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${pathPrefix}/enterprise`,
      languages: {
        en: "/enterprise",
        fr: "/fr/enterprise",
        "x-default": "/enterprise",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${pathPrefix}/enterprise`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
    },
  };
}

export default function EnterprisePage() {
  return (
    <>
      <EnterpriseHero />
      <EnterpriseFeatures />
      <ProcteoShowcase />
      <EnterpriseCompliance />
      <EnterprisePlans />
      <EnterpriseTestimonials />
      <EnterpriseCTA />
    </>
  );
}
