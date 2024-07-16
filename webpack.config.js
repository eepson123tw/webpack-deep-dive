const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
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
    ],
  },
};
