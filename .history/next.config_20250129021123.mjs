/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["dibimbing-cdn.sgp1.cdn.digitaloceanspaces.com"],
  },
  eslint: {
    ignoreDuringBuilds: true, // Menonaktifkan ESLint selama build di Vercel
  },
};

export default nextConfig;
