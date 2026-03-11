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
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  // Enable ISR (Incremental Static Regeneration) for WP Engine
  experimental: {
    isrMemoryCacheSize: 52 * 1024 * 1024, // 52MB
  },
}

module.exports = nextConfig
