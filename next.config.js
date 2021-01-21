const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

const isProduction = process.env.NODE_ENV === "production";

module.exports = withPWA({
  pwa: {
    disable: !isProduction,
    dest: "public",
    register: true,
    runtimeCaching,
  },
});

module.exports = withPlugins([[optimizedImages, {}]]);
