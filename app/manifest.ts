import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://myatps.com";

/**
 * Web App Manifest for MyATPS. Next.js serves this at `/manifest.webmanifest`
 * and automatically references it from the document head. This gives us:
 *  - a proper mobile "Add to Home Screen" experience
 *  - theme color applied to the browser chrome on mobile
 *  - icons for iOS / Android install prompts
 *  - a weak SEO signal that the site is production-grade PWA-ready
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MyATPS — ATPL Exam Preparation",
    short_name: "MyATPS",
    description:
      "The complete ATPL exam preparation platform with 20,000+ questions, research-based explanations, aviation dictionary, live quizzes, and study tools.",
    start_url: SITE_URL,
    display: "standalone",
    background_color: "#F7F6F7",
    theme_color: "#1b0c25",
    categories: ["education", "productivity", "reference"],
    icons: [
      // Branded yellow logo — same asset used by the favicon, Apple touch
      // icon, OpenGraph card, and JSON-LD Organization logo so every
      // surface (browser tab, home screen, social preview, knowledge
      // graph) shows the exact same brand mark.
      {
        src: "/assets/logo-yellow.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/logo-yellow.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/logo-yellow.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
