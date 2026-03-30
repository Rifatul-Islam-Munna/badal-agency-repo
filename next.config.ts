import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
    qualities: [10, 25, 50, 60, 70, 75],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
