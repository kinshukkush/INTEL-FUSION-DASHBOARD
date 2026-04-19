import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for react-leaflet (avoids "window is not defined" SSR build errors on Vercel)
  transpilePackages: ["leaflet", "react-leaflet"],

  // Allow images from Unsplash / Leaflet CDN in production
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdnjs.cloudflare.com",
      },
    ],
  },
};

export default nextConfig;
