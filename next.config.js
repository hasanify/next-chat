/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

const nextConfig = {
  ...withPWA({
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    register: true,
    reloadOnOnline: true,
    skipWaiting: true,
  }),
  images: { domains: ["lh3.googleusercontent.com"] },
};

module.exports = nextConfig;
