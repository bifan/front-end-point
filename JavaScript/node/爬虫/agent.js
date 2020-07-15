// 引入所需要的第三方包
const superagent = require("superagent");

let hotNews = []; // 热点新闻
let localNews = []; // 本地新闻

/**
 * index.js
 * [description] - 使用superagent.get()方法来访问百度新闻首页
 */
superagent.get("http://news.baidu.com/").end((err, res) => {
  if (err) {
    // 如果访问失败或者出错，会这行这里
    console.log(`热点新闻抓取失败 - ${err}`);
  } else {
    // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res
    // 抓取热点新闻数据
    hotNews = getHotNews(res);
  }
});
