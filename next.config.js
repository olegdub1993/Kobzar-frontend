/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost','192.168.1.102','https://kobzar.onrender.com']
  },
}

module.exports = nextConfig
