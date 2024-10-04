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
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
