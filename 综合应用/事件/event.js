
/**
 * 鼠标点击事件的冒泡效果
 * 每0.5 秒显示一次冒泡动画
 */

// const subscribe = new Subscribe();

// 冒泡动画效果, 每0.5 显示一个冒泡
let count = 0;
const bubble = document.querySelector(".bubble");
const bubbleShieldStyle = document.querySelector(".bubble .shield").style;
function animate(ele) {
  // 任意点击后, 撑盾防御多次点击 → 节流(Throttling)
  bubbleShieldStyle.zIndex = 1;
  bubbleShieldStyle.cursor = "progress";
  setTimeout(function() {
    if (ele.classList.contains("bubble")) {
      count = 0;
      bubbleShieldStyle.zIndex = -1;
      bubbleShieldStyle.cursor = "";
    } else {
      ele.classList.remove("animated", "flip");
      ele.scrollWidth; // 有时候, DOM 操作优化队列并不是你想要的 😀
      ele.classList.add("animated", "flip");
    }
  }, count);
  count += 500;
}

// 三个方框点击时触发动画, 以展示事件冒泡顺序
document
  .querySelector(".bubble>div")
  .addEventListener("click", function(event) {
    animate(this.firstElementChild);
  });
document
  .querySelector(".bubble>div>div")
  .addEventListener("click", function(event) {
    animate(this.firstElementChild);
  });

document
  .querySelector(".bubble>div>div>div")
  .addEventListener("click", function(event) {
    animate(this.firstElementChild);
  });

// 冒泡至容器时, 初始化状态, 以备下一次冒泡展示
document.querySelector(".bubble").addEventListener("click", function() {
  animate(this);
});
