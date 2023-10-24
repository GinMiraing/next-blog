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
      {
        protocol: "https",
        hostname: "article.biliimg.com",
      },
    ],
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
};

module.exports = withContentlayer(nextConfig);
