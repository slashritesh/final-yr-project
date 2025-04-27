import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tan-worthy-guppy-533.mypinata.cloud',
      },
    ],
  }
};

export default nextConfig;
