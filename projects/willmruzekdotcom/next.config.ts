import type { NextConfig } from "next";
import withNextra from "nextra";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    rules: {
      "*.yml": {
        loaders: ["yaml-loader"],
        as: "*.js",
      },
      "*.yaml": {
        loaders: ["yaml-loader"],
        as: "*.js",
      },
    },
  },
};

export default withNextra({
  defaultShowCopyCode: true,
})(nextConfig);
