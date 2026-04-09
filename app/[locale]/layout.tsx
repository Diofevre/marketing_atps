import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://myatps.com";

// Generate static params so Next.js knows about every locale at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Viewport tells the browser how to render the page on mobile and provides
// the theme color shown in the OS chrome (status bar, PWA shell, etc.). Both
// the light and dark variants use the brand palette. Stays locale-agnostic.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F6F7" },
    { media: "(prefers-color-scheme: dark)", color: "#1b0c25" },
  ],
};

/**
 * Build locale-aware metadata with proper alternates (hreflang) so Google
 * understands the two language versions are equivalent pages.
 *
 * - `alternates.languages` → hreflang alternates
 * - `openGraph.locale` → proper OG locale per language
 * - Title template + default + description all come from the messages bundle
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "metadata" });

  // Build the locale-aware URL for the current page. When the locale is the
  // default (en), the URL has no prefix; for fr, it's prefixed with `/fr`.
  const pathPrefix = locale === routing.defaultLocale ? "" : `/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: [
      "ATPL",
      "ATPL exam",
      "ATPL questions",
      "ATPL preparation",
      "EASA ATPL",
      "pilot training",
      "aviation exam",
      "ATPL question bank",
      "ATPL study",
      "aviation dictionary",
      "flight school",
      "airline pilot",
      "CPL",
      "ATPL online",
      "ATPL practice",
      "ATPL mock exam",
      "aviation training platform",
    ],
    authors: [{ name: "MyATPS" }],
    creator: "MyATPS",
    publisher: "MyATPS",
    alternates: {
      canonical: `${SITE_URL}${pathPrefix}/`,
      languages: {
        en: `${SITE_URL}/`,
        fr: `${SITE_URL}/fr/`,
        "x-default": `${SITE_URL}/`,
      },
    },
    openGraph: {
      type: "website",
      locale: t("ogLocale"),
      alternateLocale: locale === "en" ? ["fr_FR"] : ["en_US"],
      url: `${SITE_URL}${pathPrefix}/`,
      siteName: "MyATPS",
      title: t("titleDefault"),
      description: t("ogDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("titleDefault"),
      description: t("twitterDescription"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enable static rendering for this locale
  setRequestLocale(locale as Locale);

  // Load translations for the JSON-LD schema strings (SoftwareApplication +
  // FAQ rich results). Localizing the schema lets Google show the right
  // language in the featured snippets.
  const tSchema = await getTranslations({ locale, namespace: "schema" });
  const tFaq = await getTranslations({ locale, namespace: "faq" });

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "MyATPS",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web",
              description: tSchema("description"),
              offers: [
                {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "EUR",
                  name: tSchema("offerFreeName"),
                  description: tSchema("offerFreeDescription"),
                },
                {
                  "@type": "Offer",
                  price: "29",
                  priceCurrency: "EUR",
                  name: tSchema("offerStandardName"),
                  description: tSchema("offerStandardDescription"),
                },
                {
                  "@type": "Offer",
                  price: "39",
                  priceCurrency: "EUR",
                  name: tSchema("offerPremiumName"),
                  description: tSchema("offerPremiumDescription"),
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "2000",
                bestRating: "5",
              },
              featureList: [
                tSchema("featureQuestions"),
                tSchema("featureExplanations"),
                tSchema("featureDictionary"),
                tSchema("featureLiveQuizzes"),
                tSchema("featureSharing"),
                tSchema("featureLibrary"),
                tSchema("featureAssistant"),
                tSchema("featureAnalytics"),
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              // EducationalOrganization is a more specific subtype of
              // Organization and signals to Google that this is a training
              // provider, which unlocks education-specific rich results.
              "@type": "EducationalOrganization",
              name: "MyATPS",
              alternateName: "My ATPS",
              url: SITE_URL,
              logo: `${SITE_URL}/assets/logo-myatps.png`,
              description: tSchema("description"),
              sameAs: [],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: tSchema("contactType"),
                url: `${SITE_URL}/contact`,
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "MyATPS",
              alternateName: "My ATPS",
              url: SITE_URL,
              publisher: {
                "@type": "EducationalOrganization",
                name: "MyATPS",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: tFaq("q1"),
                  acceptedAnswer: { "@type": "Answer", text: tFaq("a1") },
                },
                {
                  "@type": "Question",
                  name: tFaq("q2"),
                  acceptedAnswer: { "@type": "Answer", text: tFaq("a2") },
                },
                {
                  "@type": "Question",
                  name: tFaq("q3"),
                  acceptedAnswer: { "@type": "Answer", text: tFaq("a3") },
                },
                {
                  "@type": "Question",
                  name: tFaq("q4"),
                  acceptedAnswer: { "@type": "Answer", text: tFaq("a4") },
                },
                {
                  "@type": "Question",
                  name: tFaq("q5"),
                  acceptedAnswer: { "@type": "Answer", text: tFaq("a5") },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${dmSans.className} antialiased bg-[#F7F6F7]`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
