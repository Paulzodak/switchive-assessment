/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["https://cdn.dummyjson.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
    ],
  },
};

export default nextConfig;
