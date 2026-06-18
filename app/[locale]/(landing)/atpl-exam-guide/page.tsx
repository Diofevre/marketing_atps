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
  const t = await getTranslations({ locale, namespace: "examGuide" });
  const pathPrefix = locale === "en" ? "" : `/${locale}`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${pathPrefix}/atpl-exam-guide`,
      languages: {
        en: "/atpl-exam-guide",
        fr: "/fr/atpl-exam-guide",
        "x-default": "/atpl-exam-guide",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${pathPrefix}/atpl-exam-guide`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
    },
  };
}

export default async function AtplExamGuide({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (locale === "fr" ? "fr" : "en") as Locale;
  const t = await getTranslations({ locale, namespace: "examGuide" });
  const pathPrefix = locale === "en" ? "" : `/${locale}`;

  const faqKeys = ["q1", "q2", "q3", "q4"] as const;

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
        name: t("breadcrumbGuide"),
        item: `${SITE_URL}${pathPrefix}/atpl-exam-guide`,
      },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("title"),
    description: t("metaDescription"),
    author: { "@type": "Organization", name: "MyATPS" },
    publisher: {
      "@type": "EducationalOrganization",
      name: "MyATPS",
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}${pathPrefix}/atpl-exam-guide`,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqKeys.map((k) => ({
      "@type": "Question",
      name: t(`${k}Q`),
      acceptedAnswer: { "@type": "Answer", text: t(`${k}A`) },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <section className="pt-16 lg:pt-24 pb-4">
        <Container className="max-w-3xl">
          <nav
            aria-label={t("breadcrumbGuide")}
            className="flex items-center gap-2 text-sm text-[#1b0c25]/60 mb-6"
          >
            <Link href="/" className="hover:text-[#1b0c25]">
              {t("breadcrumbHome")}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1b0c25]">{t("breadcrumbGuide")}</span>
          </nav>

          <span className="inline-block text-xs font-medium uppercase tracking-wider text-[#1b0c25]/60 mb-4">
            {t("eyebrow")}
          </span>
          <h1 className="text-4xl lg:text-5xl font-semibold text-[#1b0c25] mb-5">
            {t("title")}
          </h1>
          <p className="text-lg text-[#1b0c25]/75 leading-relaxed">
            {t("subtitle")}
          </p>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container className="max-w-3xl space-y-4 text-[#1b0c25]/80 leading-relaxed">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#1b0c25] mb-2">
            {t("introHeading")}
          </h2>
          <p>{t("intro1")}</p>
          <p>{t("intro2")}</p>
        </Container>
      </section>

      <section className="py-10 lg:py-14 bg-white">
        <Container className="max-w-3xl">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#1b0c25] mb-3">
            {t("subjectsHeading")}
          </h2>
          <p className="text-[#1b0c25]/80 leading-relaxed mb-6">
            {t("subjectsIntro")}
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {ATPL_SUBJECTS.map((s) => (
              <Link
                key={s.slug}
                href={`/atpl-questions/${s.slug}`}
                className="group flex items-center justify-between rounded-xl border border-[#1b0c25]/10 bg-white px-4 py-3 transition-colors hover:border-[#c34f96]/40"
              >
                <span className="text-[#1b0c25]">
                  <span className="text-[#1b0c25]/45 text-xs mr-2">
                    {s.code}
                  </span>
                  {s[loc].name}
                </span>
                <ArrowRight className="w-4 h-4 text-[#1b0c25]/30 transition-transform group-hover:translate-x-0.5 group-hover:text-[#c34f96]" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container className="max-w-3xl space-y-4 text-[#1b0c25]/80 leading-relaxed">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#1b0c25] mb-2">
            {t("structureHeading")}
          </h2>
          <p>{t("structure1")}</p>
          <p>{t("structure2")}</p>
        </Container>
      </section>

      <section className="py-10 lg:py-14 bg-white">
        <Container className="max-w-3xl space-y-4 text-[#1b0c25]/80 leading-relaxed">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#1b0c25] mb-2">
            {t("prepHeading")}
          </h2>
          <p>{t("prep1")}</p>
          <p>{t("prep2")}</p>
          <p>{t("prep3")}</p>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container className="max-w-3xl space-y-4 text-[#1b0c25]/80 leading-relaxed">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#1b0c25] mb-2">
            {t("freeHeading")}
          </h2>
          <p>{t("free1")}</p>
          <p>{t("free2")}</p>
        </Container>
      </section>

      <section className="py-10 lg:py-14 bg-white">
        <Container className="max-w-3xl">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#1b0c25] mb-6">
            {t("faqHeading")}
          </h2>
          <div className="space-y-5">
            {faqKeys.map((k) => (
              <div
                key={k}
                className="rounded-2xl border border-[#1b0c25]/10 bg-white p-5"
              >
                <h3 className="font-semibold text-[#1b0c25] mb-2">
                  {t(`${k}Q`)}
                </h3>
                <p className="text-[#1b0c25]/75 leading-relaxed">{t(`${k}A`)}</p>
              </div>
            ))}
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
