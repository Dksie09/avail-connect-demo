import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://api.dicebear.com/**")],
  },
};

export default nextConfig;
