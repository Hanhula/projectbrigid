// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig
/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,

  swcMinify: true,

  // Disable css--modules component styling

  // Source: https://cwtuan.blogspot.com/2022/10/disable-css-module-in-nextjs-v1231-sept.html

  webpack(config) {
    config.module.rules.forEach((rule) => {
      const { oneOf } = rule;

      if (oneOf) {
        oneOf.forEach((one) => {
          if (!`${one.issuer?.and}`.includes("_app")) return;

          one.issuer.and = [path.resolve(__dirname)];
        });
      }
    });

    return config;
  },
};

module.exports = nextConfig;
