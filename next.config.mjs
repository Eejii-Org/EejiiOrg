/** @type {import('next').NextConfig} */

// Test
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
