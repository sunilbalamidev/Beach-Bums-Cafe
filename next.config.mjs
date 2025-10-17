/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // puts the static site in /out
  images: { unoptimized: true }, // required for static export
  trailingSlash: true, // safer for GitHub Pages routing
};

export default nextConfig;
