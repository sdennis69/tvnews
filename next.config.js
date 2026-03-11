/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  // Enable ISR (Incremental Static Regeneration) for WP Engine
  experimental: {
    cacheMaxMemorySize: 52 * 1024 * 1024, // 52MB
  },
  // Optimize for modern browsers only
  swcMinify: true,
  compress: true,
  // Enable automatic static optimization
  optimizeFonts: true,
}

module.exports = nextConfig
