import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["via.placeholder.com"],
    qualities: [10, 25, 50, 60, 70, 75],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
