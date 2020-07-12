// init Express 应用
const app = require("express")();
// 使用http 模块监听端口
const http = require("http").createServer(app);

// 路由, 根据路径处理请求
app.get("/", (req, res) => {
  // 发送字符
  // res.send("Hello World!");
  // 发送文件(路径根据package.json 中定义的入口文件来决定相对路径)
  res.sendFile(__dirname + "/assets/index.html");
});

// 监听端口
http.listen(3000, () => {
  console.log("listening on localhost:3000");
});
