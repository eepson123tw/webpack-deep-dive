// dynamic link library
const webpack = require("webpack");
const path = require("path");
module.exports = {
  mode: "production",
  entry: {
    jquery: ["jquery"],
    lodashES: ["lodash-es"],
  },
  output: {
    filename: "dll/[name].js",
    library: "[name]", // 暴露给外部使用
    libraryTarget: "var", // 通过script标签引入
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]", // 暴露给外部使用
      path: path.resolve(__dirname, "dll", "[name].manifest.json"), // 支援清單描述
    }),
  ],
};
