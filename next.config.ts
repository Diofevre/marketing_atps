import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // Configuration des rewrites pour éviter les problèmes CORS
  // Les requêtes vers /api/* seront redirigées vers business_atps
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    return [
      {
        source: '/api/blog/:path*',
        destination: `${apiUrl}/api/blog/:path*`,
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
