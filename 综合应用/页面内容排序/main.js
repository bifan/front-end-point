(() => {
  /***********
   * 获取数据
   ***********
   */
  /*
	创建XHR 对象, 可以与服务器交互
	- 支持任何数据类型
	- 支持多种协议(HTTP, file://, ftp)
  */
  const xhr = new XMLHttpRequest();

  /*
  XMLHttpRequest.open(), 初始化一个请求
  - 参数1, HTTP 请求方法
  - 参数2, 服务器地址
  - 参数3, 是否使用异步, 默认使用异步
*/
  xhr.open("get", "https://api.jikan.moe/v3/producer/21/1", false);

  let jikanAPIStringResult = null;
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      jikanAPIStringResult = xhr.responseText; // 获取到的数据
    }
  };
  xhr.send();

  /***********
   * 渲染数据
   ***********
   */
  const jikanAPIObjectResult = JSON.parse(jikanAPIStringResult);
  /*
  吉卜力工作室(Ghibli) 作品列表
  API https://api.jikan.moe/v3/producer/21/1
  API 文档 https://jikan.docs.apiary.io/
  数据内容可参考此页面 https://myanimelist.net/anime/producer/21/Studio_Ghibli
  anime keys:
    image_url 动画封面图片
    title 动画名称
    members 参与评分人数
    score 评分
    airing_start 初次公映时间
  */
  const animes = jikanAPIObjectResult.anime;
  // const partsOfanimes = animes.slice(0, 3);
  let htmlString = `<ul class="anime-list__ul">`;
  animes.forEach(anime => {
    // if (anime.score < 8.2) return;
    let { image_url, title, airing_start, score } = anime;
    airing_start = airing_start ? airing_start.slice(0, 4) : 0;
    htmlString += `
    <li data-score="${Math.floor(score * 100)}" data-airing="${airing_start}">
      <figure class="anime-list__figure">
        <img src="${image_url}" alt="动画名称: ${title}"></img>
        <figcaption class="anime-list__figcaption">
          <p class="anime-list__anime-info">${
            airing_start ? airing_start : "unknown"
          }/<span class="anime-list__emoji-star">⭐</span>${score}</p>
        </figcaption>
      </figure>
    </li>`;
  });
  htmlString += `</ul>`;
  // const ul = document.createElement(htmlString);
  // document.getElementById("img-container").appendChild(ul);
  document.getElementById("img-container").innerHTML = htmlString;
})();

(() => {
  /***********
   * 重新排序
   ***********
   */
  function sort(animeElements) {
    const animeArray = Array.from(animeElements);
    const sortedArray = animeArray.sort((curEle, nextEle) => {
      // 箭头函数中的this 就是普通变量, 从上一层作用域中找
      // 这个this 就是调用sort.call 传入的
      // const { flag, type } = this;
      // nextEle 位置的项, 继续参与下一轮比较
      // 如果return 一个 >0 的数, 则cur 与next 的值交换位置
      // 如果return 一个 <=0 的数, 则什么都不做
      // 哪一项比较大, 就继续参与下一轮比较
      // if (flag > 0) return nextEle.dataset[type] - curEle.dataset[type];
      // else return curEle.dataset[type] - nextEle.dataset[type];
      const a = curEle.dataset[this.orderType];
      const b = nextEle.dataset[this.orderType];
      // 两数相减, 结果*1 保持不变, 结果*-1 则改变排序顺序
      return (a - b) * this.flag;

      // curEle.getAttribute("data-score") → curEle.dataset.score
      // return nextEle.dataset.score - curEle.dataset.score;
    });
    // return sortedArray;
    sortedArray.forEach(element => {
      // 虽然改了集合的数据类型 → 类数组变成了数组
      // 但是每个DOM 对象和HTML 标签的映射关系并没有断
      // 所以添加元素操作只是把原有元素挪到了容器末尾
      // 第一个元素排序前排序后位置没变, 两者指向同一堆内存说明排序后还是原来的元素对象
      // animeElements[0] === sortedArray[0] // true
      animeElementsContainer.appendChild(element);
    });
  }

  /***********
   * 点击按钮触发重新排序
   ***********
   - 按时间顺序时, 第一次从新到旧
   - 按评分大小时, 第一次从大到小
   - 选择一种排序方式时, 清除其它排序方式
   */

  // 复用元素存放起来, 避免重复查找
  // 排序按钮的向上向下标志
  const upOrDownElements = document.querySelectorAll(".up-or-down");
  // 所有的排序按钮
  const buttons = document.querySelectorAll(".sorting-orders__li>button");
  // 所有li, 重新排序
  const animeElements = document.querySelectorAll(".anime-list__ul>li");
  // 所有li 的容器, 用来重新渲染
  const animeElementsContainer = document.querySelector(".anime-list__ul");

  buttons.forEach(btnEle => {
    btnEle.flag = 1;
    btnEle.orderType = btnEle.dataset.type;
    // 函数一直被引用着, 函数依赖的上一级执行栈也不会销毁, 这也是闭包啊
    btnEle.onclick = function() {
      // init other button
      buttons.forEach(cleaningEle => {
        if (cleaningEle === btnEle) return;
        cleaningEle.flag = 1;
      });
      upOrDownElements.forEach(ele => (ele.innerText = ""));

      // change flag
      btnEle.flag *= -1;
      // 显示flag 对应的排序标志
      btnEle.flag < 0
        ? (btnEle.firstElementChild.innerText = "👇")
        : (btnEle.firstElementChild.innerText = "👆");

      // reorder
      sort.call(btnEle, animeElements);
    };
  });
})();
