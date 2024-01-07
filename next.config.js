/** @type {import('next').NextConfig} */
const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.zengjunyin.com",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = withContentlayer(nextConfig);
