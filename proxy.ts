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

  // 1. Short-circuit `/api/...` so Route Handlers never go through
  //    next-intl's locale rewriting. The proxyConfig matcher tries to
  //    exclude `api/` via a negative lookahead, but that regex form is
  //    unreliable in Next.js 16 + next-intl: the middleware still runs
  //    on `/api/indexnow` and gets rewritten to `/en/api/indexnow`
  //    which then 404s with hreflang-polluted response headers. This
  //    inline guard is the authoritative defence — it MUST come before
  //    everything else because API routes must work even if a legacy
  //    path collides with an API route name.
  if (pathname.startsWith("/api/") || pathname === "/api") {
    return NextResponse.next();
  }

  // 2. Same defence for Next.js internals. The matcher already excludes
  //    `/_next/` but we keep the guard for symmetry and resilience.
  if (pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }

  // 3. Legacy redirects for URLs indexed under previous versions of
  //    the domain. These must run BEFORE the locale layer so the 301
  //    contract is preserved (legacy URLs 301 to the current
  //    equivalent, they don't first get wrapped in a locale rewrite).
  const legacyTarget = LEGACY_REDIRECTS[pathname];
  if (legacyTarget) {
    const target = new URL(legacyTarget + url.search, url);
    return NextResponse.redirect(target, 301);
  }

  // 4. Short-circuit file-based metadata endpoints. Without this guard,
  //    next-intl rewrites `/icon.png` to `/en/icon.png` and Next.js
  //    serves a 404 page (with locale hreflang links) instead of the
  //    actual icon binary.
  if (METADATA_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  // 5. Short-circuit the IndexNow key verification file. It lives at
  //    the web root per the IndexNow ownership-proof rules and must
  //    resolve verbatim.
  if (/^\/[a-f0-9]{32}\.txt$/i.test(pathname)) {
    return NextResponse.next();
  }

  // 6. Everything else flows through next-intl for locale handling.
  return intlMiddleware(request);
}

/**
 * Next.js 16 requires the matcher config to be exported under the name
 * `config`, not `proxyConfig`. Earlier drafts of this file used
 * `proxyConfig` which Next.js silently ignored — the compiled
 * middleware-manifest.json had an empty `middleware: {}` entry, meaning
 * the proxy ran on EVERY request regardless of the intended matcher.
 * That's why legacy redirects, metadata files, static assets in
 * /images, /assets, /fonts, and /api/* were all being funneled through
 * next-intl's locale rewriter and returning 404 with hreflang pollution.
 *
 * The matcher below is the AUTHORITATIVE filter — it restricts the
 * proxy to page paths only. The inline guards at the top of proxy()
 * remain as belt-and-braces defence in case this matcher is ever
 * accidentally loosened.
 *
 * Excluded from the proxy:
 *   - /_next/…           (Next.js internals: chunks, image optimizer, HMR)
 *   - /api/…             (Route Handlers like /api/indexnow)
 *   - /icon.png, /apple-icon.png, /manifest.webmanifest, /robots.txt,
 *     /sitemap.xml       (file-based metadata served at the root)
 *   - /opengraph-image   (next/og generated route, no extension)
 *   - anything whose pathname contains a dot followed by a 1–6 char
 *     extension (images, fonts, css, js, maps, videos, pdfs…)
 */
export const config = {
  matcher: [
    "/((?!_next/|api/|icon\\.png|apple-icon\\.png|opengraph-image|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|.*\\.[a-zA-Z0-9]{1,6}$).*)",
  ],
};
