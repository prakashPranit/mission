import type { NextConfig } from "next";
import { type PrismaClient } from "@prisma/client";

// Validate environment variables during build
if (
  process.env.NODE_ENV === "production" &&
  !process.env.DATABASE_URL
) {
  throw new Error(
    "DATABASE_URL is missing. Please add it to your environment variables."
  );
}


const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
