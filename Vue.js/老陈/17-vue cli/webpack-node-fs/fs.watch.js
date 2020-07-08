// 利用node.js 的fs 模块监听文件变化
// 此乃修改代码后自动触发webpack 打包的原理

const fs = require("fs");
fs.watch("./file.txt", (eventType, filename) => {
  if (filename) {
    console.log(filename);
    console.log(eventType);
  }
});

// test
// 运行当前js → node ./fs.watch.js
// 修改同文件夹下的file.txt