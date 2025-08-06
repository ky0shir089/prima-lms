import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "prima-lms.t3.storage.dev",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
