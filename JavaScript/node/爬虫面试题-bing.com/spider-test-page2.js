const axios = require("axios");
const cheerio = require("cheerio");

const axiosObj = axios.create({
  baseURL: "https://cn.bing.com",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
  }
});

// 检测每次的请求url
axiosObj.interceptors.request.use(function (config) {
  console.log("config.url:", config.url);
  return config;
});

axiosObj
  .get("/search", {
    params: {
      q: "股市行情",
      first: 11
    }
  })
  .then(resp => {
    // console.log('resp.data:', resp.data)
    const $ = cheerio.load(resp.data);
    const targetNodes = $("li.b_algo");
    if (targetNodes.length === 0) {
      const msg = $("#b_results li.b_no h1").eq(0).text();
      console.log("msg:", msg);
    }

    const items = [];
    saveInfo(items, targetNodes);

    console.log("items:", items[0]);
  });

const saveInfo = (items, targetNodes) => {
  for (let i = 0; i < targetNodes.length; i++) {
    const node = targetNodes.eq(i);
    const item = {
      itemName: node.find("h2 a").text().trim(),
      itemUrl: node.find("h2 a").attr("href").trim()
    };
    items.push(item);
  }
};
