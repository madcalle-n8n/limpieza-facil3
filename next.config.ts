import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  env: {
    N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL,
  },
};

export default nextConfig;
