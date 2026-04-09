import { defineRouting } from "next-intl/routing";

/**
 * next-intl routing config for the marketing site.
 *
 * - Two supported locales: English (default) and French.
 * - `localePrefix: 'as-needed'` keeps the existing English URLs unchanged
 *   (e.g. `/contact`, `/blog/my-post`) so we don't lose the SEO authority
 *   of the legacy URL tree. French pages live under `/fr/...`.
 * - Google will see both variants via hreflang alternates in the sitemap
 *   and in each page's <head>.
 */
export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
