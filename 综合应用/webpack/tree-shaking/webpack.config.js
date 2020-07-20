// 需要使用node.js 与系统交互
const path = require("path");

module.exports = {
  mode: "production",
  // mode: "development",
  // mode: "none",
  entry: "./main.js",
  output: {
    path: __dirname,
    filename: "result.js"
    // filename: "result-without-three-shaking.js"
  }
};
