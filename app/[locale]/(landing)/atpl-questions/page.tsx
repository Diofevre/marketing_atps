import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { APP_URL, SITE_URL } from "@/lib/constants";
import { ATPL_SUBJECTS, type Locale } from "@/lib/atpl-subjects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "atplQuestions" });
  const pathPrefix = locale === "en" ? "" : `/${locale}`;

  return {
    title: t("hubMetaTitle"),
    description: t("hubMetaDescription"),
    alternates: {
      canonical: `${pathPrefix}/atpl-questions`,
      languages: {
        en: "/atpl-questions",
        fr: "/fr/atpl-questions",
        "x-default": "/atpl-questions",
      },
    },
    openGraph: {
      title: t("hubMetaTitle"),
      description: t("hubMetaDescription"),
      url: `${pathPrefix}/atpl-questions`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
    },
  };
}

export default async function AtplQuestionsHub({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (locale === "fr" ? "fr" : "en") as Locale;
  const t = await getTranslations({ locale, namespace: "atplQuestions" });
  const pathPrefix = locale === "en" ? "" : `/${locale}`;

  // ItemList JSON-LD so Google understands this hub links to the 14 subject
  // pages, and BreadcrumbList for the navigation trail.
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("hubTitle"),
    itemListElement: ATPL_SUBJECTS.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s[loc].name,
      url: `${SITE_URL}${pathPrefix}/atpl-questions/${s.slug}`,
    })),
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
        name: t("breadcrumbHub"),
        item: `${SITE_URL}${pathPrefix}/atpl-questions`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="pt-16 lg:pt-24 pb-4">
        <Container className="max-w-3xl">
          <nav
            aria-label={t("breadcrumbHub")}
            className="flex items-center justify-center gap-2 text-sm text-[#1b0c25]/60 mb-6"
          >
            <Link href="/" className="hover:text-[#1b0c25]">
              {t("breadcrumbHome")}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1b0c25]">{t("breadcrumbHub")}</span>
          </nav>

          <div className="text-center">
            <span className="inline-block text-xs font-medium uppercase tracking-wider text-[#1b0c25]/60 mb-4">
              {t("hubEyebrow")}
            </span>
            <h1 className="text-4xl lg:text-6xl font-semibold text-[#1b0c25] mb-5">
              {t("hubTitle")}
            </h1>
            <p className="text-lg text-[#1b0c25]/70">{t("hubSubtitle")}</p>
          </div>
        </Container>
      </section>

      <section className="py-10 lg:py-16">
        <Container className="max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ATPL_SUBJECTS.map((s) => (
              <Link
                key={s.slug}
                href={`/atpl-questions/${s.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-[#1b0c25]/10 bg-white p-5 transition-colors hover:border-[#c34f96]/40"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-[#1b0c25]/50">
                    {t("subjectCode", { code: s.code })}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#1b0c25]/30 transition-transform group-hover:translate-x-0.5 group-hover:text-[#c34f96]" />
                </div>
                <h2 className="text-lg font-semibold text-[#1b0c25]">
                  {s[loc].name}
                </h2>
                <p className="text-sm text-[#1b0c25]/65 leading-relaxed grow">
                  {s[loc].tagline}
                </p>
                <span className="text-xs font-medium text-[#c34f96] mt-1">
                  {t("approxQuestions", { count: s.approxQuestions })}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-20 bg-white">
        <Container className="max-w-3xl">
          <div className="space-y-4 text-[#1b0c25]/80 leading-relaxed">
            <p>{t("hubBody1")}</p>
            <p>{t("hubBody2")}</p>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="max-w-2xl text-center">
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#1b0c25] mb-4">
            {t("ctaTitle")}
          </h2>
          <p className="text-[#1b0c25]/70 mb-8">{t("ctaSubtitle")}</p>
          <Link href={`${APP_URL}/auth/signup`}>
            <Button className="h-12 px-8 bg-black hover:bg-black/90 text-white">
              {t("ctaButton")}
            </Button>
          </Link>
        </Container>
      </section>
    </>
  );
}
