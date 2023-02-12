/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // experimental: { esmExternals: true },
  distDir: "build",
};

module.exports = nextConfig;
