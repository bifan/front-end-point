const axios = require("axios");
const cheerio = require("cheerio");

const axiosObj = axios.create({
  baseURL: "https://cn.bing.com",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
    cookie:
      "DUP=Q=2PVijysfekmA7RyiJvSUuQ2&T=395742877&A=2&IG=61A50FC02EDE43AD912332034857B9EA; MUID=244D4A2619A16C5F04C4470E1DA16F14; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=A6B701C6E5494289AF2B29270FE300C2&dmnchg=1; PPLState=1; ANON=A=3332D0811F6A643DFD416D55FFFFFFFF&E=1776&W=1; ENSEARCH=BENVER=1; SerpPWA=reg=1; MUIDB=244D4A2619A16C5F04C4470E1DA16F14; KievRPSSecAuth=FABaARRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACKC2OvPXhJRYGAHfLXgbpbiZkBE%2BAYf6HD0iR8%2BKoK5j8HhiMZwq2hktc17P26H3BD6AUe0IDhij1MSsgCKKt2QY5dTCn8ViKYb%2B6KB3eeOn5h093efk0jTidKcDKCpVUKEqYjY6htvKm4UEFJv%2BgWia6Xd3bMjoVDvZ%2BnMg%2BpQ70gd6Q2rAMo7zZikKKzPg0bcuTf8MihhTAVzLKCAqRIt1UmC0%2BauJBvwgwwu6cRhuQftZwKEH5pKA2N6e327Dvu/8dg9JqEBri/jkqfhuKv1BkiSE2IrwwAQJQSDhAcshYh5mLsztYU7qgTMFiqjVM48UjU5rjoFnoz%2B2mZfHJXUkG96yqL6bFvs3r1RGuIQZz6JUHac1gi0Dwx3IXblcUlLPFAAxk%2Bnotjsxmu0F06zqeTXSxj4kAQ%3D%3D; NAP=V=1.9&E=17bc&C=4a06H-2NDMZDpb8WVedVehNnAQtykjTdbpPxkqKObZMCMw0DxhiWbw&W=1; _EDGE_S=mkt=zh-cn&ui=zh-cn&SID=14011D09D298690039241200D3B668A8; SNRHOP=I=&TS=; _SS=SID=14011D09D298690039241200D3B668A8&bIm=861; ULC=P=117C4|6:4&H=117C4|6:4&T=117C4|6:4:2; _FP=hta=on; SRCHUSR=DOB=20190323&T=1594888325000&POEX=W; ipv6=hit=1594891927351&t=6; SRCHHPGUSR=CW=1853&CH=212&DPR=1&UTC=480&WTS=63730485125&HV=1594888478&DM=1; dsc=order=News"
  }
});

// 检测每次的请求url
// axiosObj.interceptors.request.use(function (config) {
//   console.log("request URI:", axios.getUri(config));
//   return config;
// });

axiosObj
  .get("/search", {
    params: {
      q: "股市行情"
    }
  })
  .then(resp => {
    const $ = cheerio.load(resp.data);
    const targetNodes = $("li.b_algo");
    // if (targetNodes.length === 0) {
    //   const msg = $("#b_results li.b_no h1").eq(0).text();
    //   // 触发反爬机制会显示 → 没有与此相关的结果: 股市行情
    //   console.log("msg:", msg);
    // }

    const items = [];
    saveItem(items, targetNodes);

    const pageUrlNodes = $("ul.sb_pagF a.b_widePag");
    for (let i = 1; i < 5; i++) {
      const node = pageUrlNodes.eq(i);
      const url = node.attr("href").trim();
      handlePagination(url, items);
    }
  });
// .catch();

const saveItem = (items, targetNodes) => {
  for (let i = 0; i < targetNodes.length; i++) {
    const node = targetNodes.eq(i);
    const item = {
      itemName: node.find("h2 a").text().trim(),
      itemUrl: node.find("h2 a").attr("href").trim()
    };
    items.push(item);
  }
};

const handlePagination = (url, items) => {
  axiosObj.get(url).then(resp => {
    const $ = cheerio.load(resp.data);
    const targetNodes = $("li.b_algo");
    saveItem(items, targetNodes);

    // 最后一个请求完毕, 打印结果
    if (items.length > 45) {
      console.log("items:", items);
      console.log("items.length:", items.length);
    }
  });
};
