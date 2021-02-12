const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const withAntdLess = require("next-plugin-antd-less");

const isProduction = process.env.NODE_ENV === "production";

module.exports = withPlugins([
  [optimizedImages],
  [
    withPWA,
    {
      pwa: {
        disable: !isProduction,
        dest: "public",
        register: true,
        runtimeCaching,
      },
    },
  ],
  [
    withAntdLess,
    {
      lessVarsFilePath: "./theme/less/theme.less",
    },
  ],
]);
