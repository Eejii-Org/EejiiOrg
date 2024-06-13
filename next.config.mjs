/** @type {import('next').NextConfig} */

// Test
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eejii.s3.amazonaws.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
