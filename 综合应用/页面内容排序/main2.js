const animesView = (() => {
  let animesData = null,
    buttons = null,
    buttionsSign = null,
    ul = null,
    animesLi = null;

  let loadData = null,
    bindHTML = null,
    sort = null,
    bindSortButtions = null;

  loadData = url => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", url, false);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        animesData = JSON.parse(xhr.responseText).anime;
      }
    };
    xhr.send();
  };

  bindHTML = container => {
    let tagLI = `<ul class="anime-list__ul">`;
    animesData.forEach(({ image_url, title, airing_start, score }) => {
      // if (score < 6) return; // 只要评分6以上的动画片
      // 2020-02-02 → 2020
      airing_start = airing_start ? airing_start.slice(0, 4) : 0;
      tagLI += `
        <li data-score="${Math.floor(
          score * 100
        )}" data-airing="${airing_start}">
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
    tagLI += `</ul>`;
    document.querySelector(container).innerHTML = tagLI;
  };

  sort = function(animesLi) {
    return [...animesLi].sort((curEle, nextEle) => {
      const a = curEle.dataset[this.orderType];
      const b = nextEle.dataset[this.orderType];
      return (a - b) * this.flag;
    });
  };

  bindSortButtions = () => {
    buttons = document.querySelectorAll(".sorting-orders__li>button");
    buttionsSign = document.querySelectorAll(".up-or-down");
    ul = document.querySelector(".anime-list__ul");
    animesLi = document.querySelectorAll(".anime-list__ul>li");
    buttons.forEach(btn => {
      btn.flag = 1;
      btn.orderType = btn.dataset.type;
      btn.onclick = function() {
        // init other button
        buttons.forEach(cleaningEle => {
          if (cleaningEle === btn) return;
          cleaningEle.flag = 1;
        });
        buttionsSign.forEach(ele => (ele.innerText = ""));

        // change flag
        btn.flag *= -1;
        // 显示flag 对应的排序标志
        btn.flag < 0
          ? (btn.firstElementChild.innerText = "👇")
          : (btn.firstElementChild.innerText = "👆");

        // 排序
        animesLi = sort.call(btn, animesLi);
        const fragment = document.createDocumentFragment(); // 减少reflow
        animesLi.forEach(li => {
          fragment.appendChild(li);
        });
        ul.appendChild(fragment);
      };
    });
  };

  return {
    init: ({ url, container }) => {
      loadData(url);
      bindHTML(container);
      bindSortButtions();
    }
  };
})();

animesView.init({
  url: "https://api.jikan.moe/v3/producer/21/1",
  container: "#animes-container"
});
