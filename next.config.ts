/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['https://biijwwehuhtlxzcmfzxd.supabase.co'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig