// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_BASE_URL:
      process.env.NODE_ENV === "production"
        ? "https://intern-platform-backend.onrender.com/api/v1"
        : "http://localhost:3001/api/v1",
  },
  // CORS設定
  async headers() {
    return [
      {
        // すべてのルートに適用
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value:
              process.env.NODE_ENV === "production"
                ? "https://intern-platform-backend.onrender.com"
                : "http://localhost:3001",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
        ],
      },
    ];
  },
  // 出力の設定
  output: "standalone",
};

export default nextConfig;
