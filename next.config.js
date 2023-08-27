/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  disable: process.env.NODE_ENV === "development",
  dest: "public",
  register: true,
  reloadOnOnline: true,
  skipWaiting: true,
});

const nextConfig = {
  images: { domains: ["lh3.googleusercontent.com"] },
};

module.exports = withPWA({
  nextConfig,
});
