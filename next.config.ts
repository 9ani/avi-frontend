import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {},
  /* config options here */
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@app": path.join(__dirname, "app"),
      "@components": path.join(__dirname, "app/components"),
      "@constants": path.join(__dirname, "app/constants"),
      "@utils": path.join(__dirname, "app/utils"),
      "@types": path.join(__dirname, "app/types"),
      "@services": path.join(__dirname, "app/services"),
      "@pages": path.join(__dirname, "app/PagesComponents"),
      "@public": path.join(__dirname, "public"),
    };
    return config;
  },
};

export default nextConfig;
