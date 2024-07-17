const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBundleAnalyzer =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const Webpack = require("webpack");

module.exports = {
  entry: {
    main: "./src/index.js",
    other: "./src/other.js",
  },
  // devtool: "source-map",
  // mode: "production",
  output: {
    filename: "[name].[chunkhash:5].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin({
      // 排除掉dll目錄
      cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/*"],
    }),
    new WebpackBundleAnalyzer(),
    new Webpack.DllReferencePlugin(
      {
        manifest: require(path.resolve(
          __dirname,
          "dll",
          "jquery.manifest.json"
        )),
      },
      {
        manifest: require(path.resolve(
          __dirname,
          "dll",
          "lodashES.manifest.json"
        )),
      }
    ),
  ],
  module: {
    rules: [
      {
        test: /index\.js$/,
        use: ["./loaders/test-loader.js"],
        // use: {
        //   loader: path.resolve(
        //     __dirname,
        //     "./loaders/test-loader?changeVar=iiii"
        //   ),
        // options: {
        //   changeVar: "iiii",
        // },
        // },
      },
      {
        test: /\.js$/,
        use: ["./loaders/loader3.js", "./loaders/loader4.js"],
      },
      {
        test: /\.jpg$/,
        use: ["./loaders/image.js"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      // chunks: "all",
      // minSize: 0,
      // maxSize: 6000,
      // automaticNameDelimiter: "-",
      // cacheGroups: {
      //   styles: {
      //     minSize: 0,
      //     test: /\.css$/,
      //     minChunks: 1,
      //     chunks: "all",
      //   },
      // },
    },
  },
};
