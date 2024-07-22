/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', '192.168.1.102','kobzar.onrender.com','kobzar-s3-bucket.s3.eu-central-1.amazonaws.com']
  },
  i18n:{
    locales:["en","uk"],
    defaultLocale:"uk",
    localeDetection:false
  }
}

module.exports = nextConfig
