/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["dibimbing-cdn.sgp1.cdn.digitaloceanspaces.com"], // Menambahkan domain eksternal
  },
};

export default nextConfig;
