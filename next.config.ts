import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [65, 70, 75],
  },
  experimental: {
    // antd / @ant-design/icons already optimized by Next.js defaults
    optimizePackageImports: ["motion"],
  },
};

export default withNextIntl(nextConfig);
