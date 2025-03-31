/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["storage.googleapis.com", "flagcdn.com", "lh3.googleusercontent.com", "f005.backblazeb2.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  reactStrictMode: false,
};

export default nextConfig;
