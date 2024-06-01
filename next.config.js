// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/communityprojects/facesofabyssinia",
  assetPrefix: "/communityprojects/facesofabyssinia/",
  async rewrites() {
    return [
      {
        source: `/communityprojects/facesofabyssinia/_next/:path*`,
        destination: '/_next/:path*'
      }
    ]
  }
  };
  
  module.exports = nextConfig;
  