import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable dev overlay in production
  experimental: {
    turbo: {
      rules: {},
    },
  },
  
  // Security headers to prevent unwanted connections
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https:; img-src 'self' data: https:; font-src 'self';",
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },

  // Production optimizations
  compress: true,
  poweredByHeader: false,
  
  // Environment-specific configs
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
};

export default nextConfig;
