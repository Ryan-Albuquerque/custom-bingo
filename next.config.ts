import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "custombingo.s3.us-east-1.amazonaws.com",
      },
      {
        hostname: "custombingo.s3.amazonaws.com",
      },
      {
        hostname: "custombingo.s3.amazonaws.com",
      },
      {
        hostname: "custombingo.s3.us-east-2.amazonaws.com",
      },
    ],
  },
  serverRuntimeConfig: {
    AWS_ACCESSKEY_ID: process.env.AWS_ACCESSKEY_ID,
    AWS_SECRETACCESS_KEY: process.env.AWS_SECRETACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    API_KEY: process.env.API_KEY,
    URL: process.env.URL,
  },
};

export default nextConfig;
