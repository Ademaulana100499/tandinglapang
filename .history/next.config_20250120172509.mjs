/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: ["dibimbing-cdn.sgp1.cdn.digitaloceanspaces.com"], // Menambahkan domain eksternal yang diizinkan
  },
};
export default nextConfig;
