/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jcyitaxnxoxtrnnmilnb.supabase.co", // Corrected hostname
        pathname: "/storage/v1/object/public/images/**", // Match all paths under this domain
      },
    ],
  },
};

module.exports = nextConfig;
