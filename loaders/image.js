const loaderUtils = require("loader-utils");

function loader(source) {
  console.log(source.byteLength);
  const base64Img = getBase64(source);
  const filePath = getFilePath.bind(this);
  filePath(source);
  return `module.exports = \`${base64Img}\``;
}

loader.raw = true; // 原始數據
module.exports = loader;

function getBase64(buffer) {
  return "data:image/png;base64," + buffer.toString("base64");
}

function getFilePath(buffer) {
  const filePath = loaderUtils.interpolateName(this, "[contenthash:5].[ext]", {
    content: buffer,
  });
  this.emitFile(filePath, buffer);
  return filePath;
}
