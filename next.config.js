/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public'
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { esmExternals: true },
  distDir: 'build'
};

module.exports = withPWA(nextConfig);
