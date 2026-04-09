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

/**
 * File-based metadata endpoints handled by Next.js at the app-root level,
 * NOT inside any `[locale]` segment. next-intl must never rewrite these
 * because doing so would make Next.js look for (non-existent) per-locale
 * variants like `/en/icon.png` and return a 404 page with hreflang junk.
 *
 * This list tracks the output paths of:
 *   - app/icon.png        → /icon.png
 *   - app/apple-icon.png  → /apple-icon.png
 *   - app/opengraph-image.tsx → /opengraph-image (no extension)
 *   - app/manifest.ts     → /manifest.webmanifest
 *   - app/robots.ts       → /robots.txt
 *   - app/sitemap.ts      → /sitemap.xml
 */
const METADATA_PATHS = new Set<string>([
  "/icon.png",
  "/apple-icon.png",
  "/opengraph-image",
  "/manifest.webmanifest",
  "/robots.txt",
  "/sitemap.xml",
]);

export function proxy(request: NextRequest): NextResponse {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // 1. Legacy redirects run FIRST so old indexed URLs resolve before the
  //    locale layer touches them. This keeps the 301 contract intact.
  const legacyTarget = LEGACY_REDIRECTS[pathname];
  if (legacyTarget) {
    const target = new URL(legacyTarget + url.search, url);
    return NextResponse.redirect(target, 301);
  }

  // 2. Short-circuit file-based metadata endpoints. The proxyConfig matcher
  //    already excludes `/_next/`, `/api/`, and any path with a file
  //    extension (`.png`, `.xml`, `.txt`, `.webmanifest`…), but the
  //    generated `/opengraph-image` route has no extension, and we rely on
  //    belt-and-braces here in case the matcher regex is ever loosened.
  //    Without this guard, next-intl rewrites `/icon.png` to `/en/icon.png`
  //    and Next.js serves a 404 page (with locale hreflang links) instead
  //    of the actual icon binary.
  if (METADATA_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  // 3. Short-circuit the IndexNow key verification file. It lives at the
  //    web root per the IndexNow ownership-proof rules and must resolve
  //    verbatim.
  if (/^\/[a-f0-9]{32}\.txt$/i.test(pathname)) {
    return NextResponse.next();
  }

  // 4. Everything else flows through next-intl for locale handling.
  return intlMiddleware(request);
}

export const proxyConfig = {
  // Run on all paths EXCEPT:
  //   - /_next/…           (Next.js internals: chunks, image optimizer, HMR)
  //   - /api/…             (Route Handlers like /api/indexnow)
  //   - /icon.png, /apple-icon.png, /manifest.webmanifest, /robots.txt,
  //     /sitemap.xml       (file-based metadata served at the root)
  //   - /opengraph-image   (next/og generated route, no extension)
  //   - anything with a file extension (images, fonts, static assets)
  //
  // The inline METADATA_PATHS guard in proxy() is the authoritative defence
  // — this regex is belt-and-braces so the i18n middleware is simply never
  // invoked on these URLs in the first place.
  matcher: [
    "/((?!_next/|api/|icon\\.png|apple-icon\\.png|opengraph-image|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
