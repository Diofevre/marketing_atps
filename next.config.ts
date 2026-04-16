import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Point the next-intl plugin at the server-side request config so it can
// inject the right messages bundle on every request.
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Note: `skipTrailingSlashRedirect` was removed — keeping it meant `/news`
  // and `/news/` coexist as two distinct URLs in search engines, which causes
  // duplicate-content dilution. Next.js now 308-redirects the trailing-slash
  // variants to the canonical form, matching per-page `alternates.canonical`.

  // Security headers applied to all responses.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Rewrites proxy blog/news API calls to the backend API.
  // If NEXT_PUBLIC_API_URL is not set, register no rewrites — otherwise requests
  // to /api/blog/* would loop back to this very server and hang.
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return [];

    return [
      { source: '/api/blog', destination: `${apiUrl}/api/blog` },
      { source: '/api/blog/:path*', destination: `${apiUrl}/api/blog/:path*` },
      { source: '/api/news', destination: `${apiUrl}/api/news` },
      { source: '/api/news/:path*', destination: `${apiUrl}/api/news/:path*` },
    ];
  },

  // Configuration des images distantes si nécessaire
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'app.myatps.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.myatps.com',
      },
      {
        protocol: 'https',
        hostname: 'myatps.com',
      },
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: '*.r2.cloudflarestorage.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
