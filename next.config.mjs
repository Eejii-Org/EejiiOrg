/** @type {import('next').NextConfig} */

// Test
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2mstmber8qwm7.cloudfront.net",
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
