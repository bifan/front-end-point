// init Express 应用
const app = require("express")();
// 使用http 模块监听端口
const http = require("http").createServer(app);

// ⭐socket.io → init
const io = require("socket.io")(http);

// 路由, 根据路径处理请求
app.get("/", (req, res) => {
  // 发送字符
  // res.send("Hello World!");
  // 发送文件(路径根据package.json 中定义的入口文件来决定相对路径)
  res.sendFile(__dirname + "/assets/index.html");
});

// ⭐socket.io → 监听链接
io.on("connection", socket => {
  console.log("a user connected");
  // socket 在io 内部
  // 接收信息
  socket.on("a msg", msg => {
    console.log("msg:", msg);
    // 发送信息
    socket.emit("response", "Got it");
  });
});

// 监听端口
http.listen(3000, () => {
  console.log("listening on localhost:3000");
});
