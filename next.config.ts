import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["via.placeholder.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
