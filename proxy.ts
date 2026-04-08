import { NextResponse, type NextRequest } from "next/server";

/**
 * Permanent (301) redirects for legacy URLs that were indexed by search engines
 * under previous versions of myatps.com. Each entry maps the legacy path to the
 * closest equivalent page on the current site so we preserve the link equity
 * accumulated by the domain (which has existed since 2011).
 *
 * Add new entries here as Google Search Console reports more legacy 404s under
 * "Pages > Not indexed > Not found (404)".
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

const PRIMARY_HOST = "myatps.com";

export function proxy(request: NextRequest): NextResponse {
  const url = request.nextUrl;
  const host = request.headers.get("host") ?? "";

  // 1. Force 301 from www.myatps.com to apex. Vercel's built-in redirect for
  //    secondary domains uses 307, which does not transfer SEO authority.
  //    A permanent redirect at the application layer fixes that.
  if (host === `www.${PRIMARY_HOST}`) {
    const target = new URL(url.pathname + url.search, `https://${PRIMARY_HOST}`);
    return NextResponse.redirect(target, 301);
  }

  // 2. Permanent redirects for legacy paths from previous owners of the domain.
  const legacyTarget = LEGACY_REDIRECTS[url.pathname];
  if (legacyTarget) {
    const target = new URL(legacyTarget + url.search, url);
    return NextResponse.redirect(target, 301);
  }

  return NextResponse.next();
}

export const proxyConfig = {
  // Run on all paths except Next.js internals, the API proxy, and static assets.
  matcher: ["/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)"],
};
