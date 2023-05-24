/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    YELP_KEY: 'YOURAPIKEYHERE',
  },
}

module.exports = nextConfig
