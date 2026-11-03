import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Fotos (8 MB) y fichas técnicas PDF (15 MB) se suben desde /admin.
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
