import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  skipTrailingSlashRedirect: true,

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

export default nextConfig;
