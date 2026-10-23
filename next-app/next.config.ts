import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Want to avoid CORS while developing against a local backend? Proxy requests to it:
  // async rewrites() {
  //   return [{ source: "/backend/:path*", destination: "http://localhost:8000/:path*" }];
  // },
  // ...then set NEXT_PUBLIC_API_URL=/backend in .env.local.
};

export default nextConfig;
