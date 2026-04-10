import { Container } from "@/components/ui/container";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://myatps.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });
  const pathPrefix = locale === "en" ? "" : `/${locale}`;
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${pathPrefix}/privacy`,
      languages: {
        en: "/privacy",
        fr: "/fr/privacy",
        "x-default": "/privacy",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${SITE_URL}${pathPrefix}/privacy`,
      siteName: "MyATPS",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      type: "website",
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });
  return (
    <div className="py-32 lg:py-40">
      <Container className="max-w-3xl">
        <h1 className="text-4xl lg:text-5xl font-semibold text-[#1b0c25] mb-4">
          {t("title")}
        </h1>
        <p className="text-[#1b0c25]/60 mb-12">{t("lastUpdated")}</p>

        <div className="flex flex-col gap-10 text-[#1b0c25] text-[16px] leading-[28px]">
          <section>
            <h2 className="text-2xl font-semibold mb-3">{t("s1Title")}</h2>
            <p>{t("s1Body")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">{t("s2Title")}</h2>
            <p className="mb-3">{t("s2Intro")}</p>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>
                <strong>{t("s2Item1Label")}</strong> {t("s2Item1Text")}
              </li>
              <li>
                <strong>{t("s2Item2Label")}</strong> {t("s2Item2Text")}
              </li>
              <li>
                <strong>{t("s2Item3Label")}</strong> {t("s2Item3Text")}
              </li>
              <li>
                <strong>{t("s2Item4Label")}</strong> {t("s2Item4Text")}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">{t("s3Title")}</h2>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>{t("s3Item1")}</li>
              <li>{t("s3Item2")}</li>
              <li>{t("s3Item3")}</li>
              <li>{t("s3Item4")}</li>
              <li>{t("s3Item5")}</li>
              <li>{t("s3Item6")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">{t("s4Title")}</h2>
            <p>{t("s4Body")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">{t("s5Title")}</h2>
            <p>{t("s5Body")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">{t("s6Title")}</h2>
            <p className="mb-3">{t("s6Intro")}</p>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>{t("s6Item1")}</li>
              <li>{t("s6Item2")}</li>
              <li>{t("s6Item3")}</li>
              <li>{t("s6Item4")}</li>
              <li>{t("s6Item5")}</li>
            </ul>
            <p className="mt-3">
              {t("s6Contact")}{" "}
              <a
                href="mailto:contact@myatps.com"
                className="underline font-medium"
              >
                contact@myatps.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">{t("s7Title")}</h2>
            <p>{t("s7Body")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">{t("s8Title")}</h2>
            <p>{t("s8Body")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">{t("s9Title")}</h2>
            <p>
              {t("s9Body")}{" "}
              <a
                href="mailto:contact@myatps.com"
                className="underline font-medium"
              >
                contact@myatps.com
              </a>{" "}
              {t("s9OrVia")}{" "}
              <Link href="/contact" className="underline font-medium">
                {t("s9ContactPage")}
              </Link>
              .
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
