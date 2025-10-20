/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // static export mode

  images: {
    unoptimized: true, // required for static export
    formats: ["image/avif", "image/webp"],
  },

  compiler: {
    removeConsole: true, // strip console logs in prod
  },

  trailingSlash: true, // better SEO and static hosting paths
  productionBrowserSourceMaps: false,
};

export default nextConfig;
