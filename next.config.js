/** @type {import('next').NextConfig} */

const nextConfig = {
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
    serverComponentsExternalPackages: ["shiki"],
  },
};

module.exports = nextConfig;
