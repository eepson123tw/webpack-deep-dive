const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBundleAnalyzer =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const Webpack = require("webpack");

module.exports = {
  entry: {
    main: "./src/index.js",
    other: "./src/other.js",
  },
  // devtool: "source-map",
  mode: "production",
  output: {
    filename: "[name].[chunkhash:5].js",
  },
  plugins: [
    new CleanWebpackPlugin({
      // 排除掉dll目錄
      cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/*"],
    }),
    new WebpackBundleAnalyzer(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "chunk-[id].css",
    }),
    // 手動分包
    // new Webpack.DllReferencePlugin(
    //   {
    //     manifest: require(path.resolve(
    //       __dirname,
    //       "dll",
    //       "jquery.manifest.json"
    //     )),
    //   },
    //   {
    //     manifest: require(path.resolve(
    //       __dirname,
    //       "dll",
    //       "lodashES.manifest.json"
    //     )),
    //   }
    // ),
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
      // {
      //   test: /\.js$/,
      //   use: ["./loaders/loader3.js", "./loaders/loader4.js"],
      // },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.jpg$/,
        use: ["./loaders/image.js"],
      },
    ],
  },
  optimization: {
    // 自動分包的分包策略
    splitChunks: {
      chunks: "all", // 所有 chunk 都要用到的策略 async只有非同步的 initial 針對普通 chunk
      // minSize: 0,
      // maxSize: 60000, //60kb =>> 只能分到 module (JQ 這種大的不會被分)
      automaticNameDelimiter: ".", // 分包名稱的分隔符號
      // minChunks: 1, //至少被引用幾次才會被分包
      // minSize: 0, // 最小的分包大小,必須要超過才會真的分包 default 30kb
      // 緩存組策略
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 當配對到這個條件時, 會被分到 vendors 單獨打包
          priority: -10, // 優先級越高越先被打包
          name: "vendorJS",
        },
        // default: {
        //   minChunks: 2, // 覆蓋配置,將最小引用次數改為2
        //   priority: -20,
        //   reuseExistingChunk: true, // 如果一個模塊已經被打包過了, 會被重用, 不會再次被打包
        // },
        styles: {
          // 將css文件單獨打包
          minSize: 0,
          test: /\.css$/,
          minChunks: 2,
          name: "commonCss",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  stats: {
    colors: true,
    chunks: false,
    modules: false,
  },
};
