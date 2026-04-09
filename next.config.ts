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

  // Rewrites to proxy blog/news API calls to the main app
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    return [
      // Match both /api/blog and /api/blog/anything
      {
        source: '/api/blog',
        destination: `${apiUrl}/api/blog`,
      },
      {
        source: '/api/blog/:path*',
        destination: `${apiUrl}/api/blog/:path*`,
      },
      {
        source: '/api/news',
        destination: `${apiUrl}/api/news`,
      },
      {
        source: '/api/news/:path*',
        destination: `${apiUrl}/api/news/:path*`,
      },
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
        hostname: '**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
