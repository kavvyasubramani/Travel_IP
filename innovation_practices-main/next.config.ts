import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"], // ✅ Allow Unsplash images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows any domain (use with caution)
      },
    ],
  },
};

export default nextConfig;
