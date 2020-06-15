const app = require("express")();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // 允许跨域请求
  if (req.method === "OPTIONS") {
    return res.send();
  }
  next();
});

app.get("/getFileNames", ({ res }) => {
  res.json([
    { fileName: "test1.txt", key: 1 },
    { fileName: "text2.txt", key: 2 },
    { fileName: "text3.txt", key: 3 },
    { fileName: "text4.txt", key: 4 },
    { fileName: "texttest5.txt", key: 5 }
  ]);
});

app.listen(2001);
