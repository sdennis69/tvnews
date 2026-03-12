/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Standalone output for WP Engine Atlas Node.js server (avoids static generation issues)
  // output: 'standalone', // Removed - causes Html error in Pages Router
  // WP Engine Atlas specific configurations
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.wpengine.com',
      },
      {
        protocol: 'https',
        hostname: '**.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  optimizeFonts: true,
  // Suppress ESLint and TypeScript warnings during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
