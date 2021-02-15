const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const withAntdLess = require("next-plugin-antd-less");

const isProduction = process.env.NODE_ENV === "production";

const optimizedImgConfig = {
  optipng: {
    optimizationLevel: 7,
  },
};

const pwaConfig = {
  pwa: {
    disable: !isProduction,
    dest: "public",
    register: true,
    runtimeCaching,
  },
};

const antdLessConfig = {
  lessVarsFilePath: "./theme/less/theme.less",
};

module.exports = withPlugins([
  [optimizedImages, optimizedImgConfig],
  [withPWA, pwaConfig],
  [withAntdLess, antdLessConfig],
]);
