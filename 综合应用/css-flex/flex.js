(function() {
  function show(event) {
    const codeWrap = event.target.nextElementSibling;
    if (codeWrap) event.target.nextElementSibling.classList.add("show");
  }
  function hide(event) {
    event.target.classList.remove("show");
  }
  document.querySelectorAll(".flex-wrap").forEach(ele => {
    ele.addEventListener("mouseenter", show);
  });
  document.querySelectorAll(".flex-code").forEach(ele => {
    ele.addEventListener("mouseleave", hide);
  });
})();

/*

window.innerWidth // 包含页面区域和滚动条
window.outerWidth // 包括页面以外的浏览器区域
document.documentElement.clientWidth // 不包含滚动条 √

*/

/* 
you must try 😂


  使得ctrl+a 只复制局部 → 不如直接用css user-select: all;
  function handleCtrlA(event) {
    // ctrl 按下 且 a 按下
    if (event.ctrlKey && event.keyCode == 65) {
      event.preventDefault();
      const range = document.createRange();
      range.selectNode(event.target);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
  key 事件 需要  tabindex="0" 可以是焦点的元素才行
  ele.addEventListener("keydown", handleCtrlA);


`calc(-67px+5)` 不能用?
   //"-67px"; // `calc(${codeWrapStyle["top"]}-${domRect.top}+5)`;
ctrl+a 控制在一个区域内
*/
/* 

  function getStyleValue(ele, property) {
    let value = getComputedStyle(ele)[property];
    // 带单位的值去掉单位
    const reg = /-?\d+(\.\d+)?(px|rem|em)?/i;
    reg.test(value) ? (value = parseFloat(value)) : null;
    return value;
  }

    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    const codeWrapStyle = getComputedStyle(codeWrap);
    const domRect = codeWrap.getBoundingClientRect();
    console.log("codeWrap:", codeWrap);
    // 如果代码区域头部看不到了, 移动代码区域到视口内
    if (domRect.top < 0) {
      codeWrap.style["bottom"] = domRect.top + -5 + "px";
      // TODO 应该只在视口空间足够容纳的情况下才一地哦那个
    }

    if (domRect.top < 0) {
    }

     const width = getStyleValue(flexWrap, "width");
      const height = getStyleValue(flexWrap, "height");
      const offset = getComputedStyle(flexWrap)["offset"];
      console.log('offset:', offset)
      console.log('width:', width)
      console.log('height:', height)
*/
