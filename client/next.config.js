/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Will only be available on the server side
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
