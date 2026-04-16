// Backend app (API calls from SSR + rewrites).
// Falls back to the actual backend domain, NOT the marketing site.
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://app.myatps.com";

// Marketing site (canonical URLs, sitemap, OG tags).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://myatps.com";
