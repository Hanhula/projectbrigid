// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig
/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

//   async headers() {
//     return [
//         {
//             // matching all API routes
//             source: "/api/:path*",
//             headers: [
//                 { key: "Access-Control-Allow-Credentials", value: "true" },
//                 { key: "Access-Control-Allow-Origin", value: "*" },
//                 { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
//                 { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
//             ]
//         }
//     ]
// },

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
