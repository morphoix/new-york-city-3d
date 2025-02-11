import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: "dist",
  output: "standalone",
};

export default nextConfig;
