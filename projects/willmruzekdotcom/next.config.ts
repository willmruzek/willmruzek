import type { NextConfig } from "next";
import withNextra from "nextra";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withNextra({
  defaultShowCopyCode: true,
})(nextConfig);
