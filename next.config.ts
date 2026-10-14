import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `npm run build` writes plain HTML, CSS, JS, and images to out/.
  output: "export",
  reactStrictMode: true,
};

export default nextConfig;
