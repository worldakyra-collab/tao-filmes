import type { NextConfig } from "next";
import path from "node:path";

const painel = "/fuiejvudnvpsfu3ruwrv2fuefvjp9f30dvr@d22fevui";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: painel.replace("@", "%40"),
          destination: painel,
        },
      ],
    };
  },
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  devIndicators: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
