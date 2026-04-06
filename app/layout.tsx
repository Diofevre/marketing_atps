import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://myatps.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MyATPS — The Complete ATPL Exam Preparation Platform",
    template: "%s | MyATPS",
  },
  description:
    "Pass your ATPL exams on the first try with 20,000+ questions, research-based explanations, an aviation dictionary with 3D models, live quizzes, and a complete study ecosystem built by pilots, for pilots.",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "MyATPS",
    title: "MyATPS — The Complete ATPL Exam Preparation Platform",
    description:
      "20,000+ questions, research-based explanations, aviation dictionary with 3D models, live quizzes & sharing — everything to pass your ATPL on the first try.",
    images: [
      {
        url: "/images/bgHero.png",
        width: 1200,
        height: 630,
        alt: "MyATPS — ATPL Exam Preparation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyATPS — The Complete ATPL Exam Preparation Platform",
    description:
      "20,000+ questions, research-based explanations, aviation dictionary with 3D models, live quizzes — pass your ATPL on the first try.",
    images: ["/images/bgHero.png"],
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
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
              description:
                "The complete ATPL exam preparation platform with 20,000+ questions, research-based explanations, aviation dictionary, live quizzes, and study tools.",
              offers: [
                {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "EUR",
                  name: "Free",
                  description: "Discover the platform with no commitment",
                },
                {
                  "@type": "Offer",
                  price: "29",
                  priceCurrency: "EUR",
                  name: "Standard",
                  description:
                    "Complete question bank, unlimited STUDY quizzes, aviation dictionary, library access",
                },
                {
                  "@type": "Offer",
                  price: "39",
                  priceCurrency: "EUR",
                  name: "Premium",
                  description:
                    "All quiz modes, live quizzes, study assistant, advanced stats, unlimited bookmarks",
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "2000",
                bestRating: "5",
              },
              featureList: [
                "20,000+ ATPL questions",
                "Research-based explanations",
                "Aviation dictionary with audio and 3D models",
                "Live Kahoot-style quizzes",
                "Session sharing and collaboration",
                "Complete resource library",
                "Built-in study assistant",
                "Progress tracking and analytics",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "MyATPS",
              url: SITE_URL,
              logo: `${SITE_URL}/images/logo-myatps.png`,
              sameAs: [],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
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
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is MyATPS?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "MyATPS is a complete online platform designed to help student pilots prepare for their ATPL exams. It combines an advanced quiz interface with 20,000+ questions, research-based explanations, an aviation dictionary with audio and 3D models, a resource library, live quiz sharing, and powerful progress tracking.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What makes your explanations different?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our explanations are crafted from extensive research in aviation education and teaching methodology. Each explanation is structured to help you truly understand the concept, not just memorize the answer.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the difference between Standard and Premium?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Standard gives you the complete question bank, unlimited STUDY quizzes, 5 TEST quizzes per day, the aviation dictionary, the library, and basic stats. Premium unlocks everything: unlimited TEST and EXAM quizzes, live quiz sharing, the study assistant, advanced stats, unlimited bookmarks, and priority support.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I study with friends or share quizzes?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! MyATPS lets you share study sessions and launch live Kahoot-style quizzes where participants join with a simple code — no account needed.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is there a free trial available?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! The Premium plan includes a 48-hour free trial so you can explore all features before committing. You can also start with the Free plan.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${dmSans.className} antialiased bg-[#F7F6F7]`}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
