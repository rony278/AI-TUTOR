/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Prevents double speech synthesis in dev
  images: {
    domains: ["images.unsplash.com", "api.dicebear.com"],
  },
};

export default nextConfig;
