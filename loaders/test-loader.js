const loaderUtils = require("loader-utils");

module.exports = function (source) {
  console.log("test-loader");
  console.log(
    loaderUtils.interpolateName(this, (resourcePath, resourceQuery) => {
      console.log({
        resourcePath,
        resourceQuery,
      });
      return "js/[contenthash].script.[ext]";
    })
  );
  return source;
};
