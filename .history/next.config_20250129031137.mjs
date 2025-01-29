/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Matikan strict mode
  images: {
    domains: ["dibimbing-cdn.sgp1.cdn.digitaloceanspaces.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
