import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/assets/:path*",
        destination: "http://localhost:4000/assets/:path*", // seu backend
      },
    ];
  }
};
module.exports = nextConfig;
