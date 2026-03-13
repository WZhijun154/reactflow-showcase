import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/reactflow-showcase",
  assetPrefix: "/reactflow-showcase",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
