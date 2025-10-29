/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Fix for Windows path issues with Next.js type generation
  experimental: {
    typedRoutes: false,
  },
}

module.exports = nextConfig
