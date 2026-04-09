import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Permanent (301) redirects for legacy URLs that were indexed by search engines
 * under previous versions of myatps.com. Each entry maps the legacy path to the
 * closest equivalent page on the current site so we preserve the link equity
 * accumulated by the domain (which has existed since 2011).
 *
 * Add new entries here as Google Search Console reports more legacy 404s under
 * "Pages > Not indexed > Not found (404)".
 *
 * Note: the www.myatps.com → myatps.com redirect is handled at the Vercel
 * edge (domain added to the project with `redirectStatusCode: 308`). Doing it
 * in this proxy would be dead code because Vercel intercepts the request
 * before the function is invoked.
 */
const LEGACY_REDIRECTS: Record<string, string> = {
  "/about-us": "/",
  "/about": "/",
  "/latest_news": "/news",
  "/latest-news": "/news",
  "/join-us": "/",
  "/appointment": "/contact",
  "/job-thank-you": "/",
  "/jobs": "/",
  // Pricing is rendered as a section on the home page, not a standalone route.
  // Keep redirecting so old indexed /pricing URLs still land on useful content.
  "/pricing": "/",
};

// next-intl middleware handles:
//   - detecting the user's preferred locale from the Accept-Language header
//     on the first visit and redirecting to the matching locale
//   - rewriting `/fr/<path>` URLs to the internal `/[locale]/<path>` segment
//   - setting the `NEXT_LOCALE` cookie so subsequent visits remember the choice
// With `localePrefix: 'as-needed'`, English URLs stay at the root (preserving
// the existing SEO authority) and French URLs get a `/fr` prefix.
const intlMiddleware = createIntlMiddleware(routing);

export function proxy(request: NextRequest): NextResponse {
  const url = request.nextUrl;

  // 1. Legacy redirects run FIRST so old indexed URLs resolve before the
  //    locale layer touches them. This keeps the 301 contract intact.
  const legacyTarget = LEGACY_REDIRECTS[url.pathname];
  if (legacyTarget) {
    const target = new URL(legacyTarget + url.search, url);
    return NextResponse.redirect(target, 301);
  }

  // 2. Everything else flows through next-intl for locale handling.
  return intlMiddleware(request);
}

export const proxyConfig = {
  // Run on all paths except Next.js internals, the API proxy, and static
  // assets. The IndexNow verification .txt file lives at the root and is
  // excluded by the file-extension rule, so it stays reachable.
  matcher: ["/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)"],
};
