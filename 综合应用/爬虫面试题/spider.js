// 记录爬取的内容
const saveItem = (items, targetNodes) => {
  for (let node of targetNodes) {
    const title = node.querySelector("h2").innerText;
    const url = node.querySelector("a").href;
    items.push({ title, url });
  }
};

// 分页的搜索结果
const handlePagination = (url, items) => {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      const divTag = document.createElement("div");
      divTag.innerHTML = data;
      const targetNodes = divTag.querySelectorAll("ol#b_results li.b_algo");
      saveItem(items, targetNodes);

      // 最后一个请求完毕, 打印结果
      if (items.length > 45) {
        console.log("items:", items);
        console.log("items.length:", items.length);
      }
    });
};

fetch("https://cn.bing.com/search?q=股市行情")
  .then(response => response.text())
  .then(data => {
    const divTag = document.createElement("div");
    divTag.innerHTML = data;

    // 第一页搜索结果
    const targetNodes = divTag.querySelectorAll("ol#b_results li.b_algo");
    const items = [];
    saveItem(items, targetNodes);

    // 从第一页中获取其它分页的URL
    const pageUrlNodes = divTag.querySelectorAll("ul.sb_pagF a.b_widePag");
    for (let i = 1; i < 5; i++) {
      const url = pageUrlNodes[i].href;
      handlePagination(url, items);
    }
  });