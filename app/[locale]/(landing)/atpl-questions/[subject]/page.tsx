import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ChevronRight, Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { APP_URL, SITE_URL } from "@/lib/constants";
import { routing } from "@/i18n/routing";
import { ATPL_SUBJECTS, getSubject, type Locale } from "@/lib/atpl-subjects";

// Pre-render every locale × subject combination at build time.
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    ATPL_SUBJECTS.map((s) => ({ locale, subject: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; subject: string }>;
}): Promise<Metadata> {
  const { locale, subject } = await params;
  const s = getSubject(subject);
  if (!s) return {};

  const loc = (locale === "fr" ? "fr" : "en") as Locale;
  const t = await getTranslations({ locale, namespace: "atplQuestions" });
  const pathPrefix = locale === "en" ? "" : `/${locale}`;
  const name = s[loc].name;

  return {
    title: t("subjectMetaTitle", { name, code: s.code }),
    description: s[loc].tagline,
    alternates: {
      canonical: `${pathPrefix}/atpl-questions/${s.slug}`,
      languages: {
        en: `/atpl-questions/${s.slug}`,
        fr: `/fr/atpl-questions/${s.slug}`,
        "x-default": `/atpl-questions/${s.slug}`,
      },
    },
    openGraph: {
      title: t("subjectMetaTitle", { name, code: s.code }),
      description: s[loc].tagline,
      url: `${pathPrefix}/atpl-questions/${s.slug}`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
    },
  };
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ locale: string; subject: string }>;
}) {
  const { locale, subject } = await params;
  const s = getSubject(subject);
  if (!s) notFound();

  const loc = (locale === "fr" ? "fr" : "en") as Locale;
  const t = await getTranslations({ locale, namespace: "atplQuestions" });
  const pathPrefix = locale === "en" ? "" : `/${locale}`;
  const copy = s[loc];

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
      {
        "@type": "ListItem",
        position: 3,
        name: copy.name,
        item: `${SITE_URL}${pathPrefix}/atpl-questions/${s.slug}`,
      },
    ],
  };

  // Course markup: signals to Google this is structured educational content
  // for the named subject, provided by MyATPS (an EducationalOrganization).
  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: t("subjectCourseName", { name: copy.name }),
    description: copy.overview,
    provider: {
      "@type": "EducationalOrganization",
      name: "MyATPS",
      url: SITE_URL,
    },
    url: `${SITE_URL}${pathPrefix}/atpl-questions/${s.slug}`,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const related = ATPL_SUBJECTS.filter((x) => x.slug !== s.slug).slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* Hero */}
      <section className="pt-16 lg:pt-24 pb-4">
        <Container className="max-w-3xl">
          <nav
            aria-label={copy.name}
            className="flex items-center gap-2 text-sm text-[#1b0c25]/60 mb-6"
          >
            <Link href="/" className="hover:text-[#1b0c25]">
              {t("breadcrumbHome")}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/atpl-questions" className="hover:text-[#1b0c25]">
              {t("breadcrumbHub")}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1b0c25]">{copy.name}</span>
          </nav>

          <span className="inline-block text-xs font-medium uppercase tracking-wider text-[#1b0c25]/60 mb-4">
            {t("subjectEyebrow", { code: s.code })}
          </span>
          <h1 className="text-4xl lg:text-5xl font-semibold text-[#1b0c25] mb-5">
            {t("subjectH1", { name: copy.name })}
          </h1>
          <p className="text-lg text-[#1b0c25]/75 leading-relaxed">
            {copy.tagline}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href={`${APP_URL}/auth/signup`}>
              <Button className="h-11 px-6 bg-black hover:bg-black/90 text-white">
                {t("subjectCta", { name: copy.name })}
              </Button>
            </Link>
            <span className="text-sm font-medium text-[#c34f96]">
              {t("approxQuestions", { count: s.approxQuestions })}
            </span>
          </div>
        </Container>
      </section>

      {/* Overview */}
      <section className="py-10 lg:py-14">
        <Container className="max-w-3xl">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#1b0c25] mb-4">
            {t("overviewHeading", { name: copy.name })}
          </h2>
          <p className="text-[#1b0c25]/80 leading-relaxed">{copy.overview}</p>
        </Container>
      </section>

      {/* Topics */}
      <section className="py-10 lg:py-14 bg-white">
        <Container className="max-w-3xl">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#1b0c25] mb-6">
            {t("topicsHeading")}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {copy.topics.map((topic) => (
              <li key={topic} className="flex items-start gap-2.5">
                <Check className="mt-0.5 w-4 h-4 shrink-0 text-[#c34f96]" />
                <span className="text-[#1b0c25]/80">{topic}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Study tip */}
      <section className="py-10 lg:py-14">
        <Container className="max-w-3xl">
          <div className="rounded-2xl border border-[#1b0c25]/10 bg-[#F7F6F7] p-6 lg:p-8">
            <h2 className="text-xl font-semibold text-[#1b0c25] mb-3">
              {t("challengeHeading")}
            </h2>
            <p className="text-[#1b0c25]/80 leading-relaxed">{copy.challenge}</p>
          </div>
        </Container>
      </section>

      {/* How MyATPS helps */}
      <section className="py-10 lg:py-14 bg-white">
        <Container className="max-w-3xl">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#1b0c25] mb-4">
            {t("howHeading", { name: copy.name })}
          </h2>
          <p className="text-[#1b0c25]/80 leading-relaxed">
            {t("howBody", { name: copy.name })}
          </p>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-10 lg:py-14">
        <Container className="max-w-3xl">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#1b0c25] mb-6">
            {t("faqHeading")}
          </h2>
          <div className="space-y-5">
            {copy.faq.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-[#1b0c25]/10 bg-white p-5"
              >
                <h3 className="font-semibold text-[#1b0c25] mb-2">{f.q}</h3>
                <p className="text-[#1b0c25]/75 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Related subjects (internal linking) */}
      <section className="py-10 lg:py-14 bg-white">
        <Container className="max-w-5xl">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#1b0c25] mb-6">
            {t("relatedHeading")}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/atpl-questions/${r.slug}`}
                className="group flex items-center justify-between rounded-xl border border-[#1b0c25]/10 bg-white px-4 py-3 transition-colors hover:border-[#c34f96]/40"
              >
                <span className="text-[#1b0c25] font-medium">
                  {r[loc].name}
                </span>
                <ArrowRight className="w-4 h-4 text-[#1b0c25]/30 transition-transform group-hover:translate-x-0.5 group-hover:text-[#c34f96]" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24">
        <Container className="max-w-2xl text-center">
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#1b0c25] mb-4">
            {t("subjectFinalCtaTitle", { name: copy.name })}
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
