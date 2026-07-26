import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  devIndicators: false,
  experimental: {
    useTypeScriptCli: true,
  },
};

export default nextConfig;
