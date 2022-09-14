const { defineConfig } = require("@vue/cli-service");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    options: {
      template: "public/browser-extension.html",
      entry: "./src/options/main.js",
      title: "Options",
    },
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        contentScripts: {
          entries: {
            "content-script": ["src/content-scripts/content-script.js"],
          },
        },
      },
    },
  },
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "node_modules/webextension-polyfill/dist/browser-polyfill.js",
          },
        ],
      }),
    ],
  },
});
