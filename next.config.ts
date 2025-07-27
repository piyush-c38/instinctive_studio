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
            value: process.env.NODE_ENV === 'production' 
              ? "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; connect-src 'self' https: wss:; img-src 'self' data: https:; font-src 'self' https:; frame-src 'none';"
              : "default-src 'self' 'unsafe-eval' 'unsafe-inline'; connect-src 'self' ws: wss: http: https:;",
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
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
  
  // Disable source maps in production for security
  productionBrowserSourceMaps: false,
};

export default nextConfig;
