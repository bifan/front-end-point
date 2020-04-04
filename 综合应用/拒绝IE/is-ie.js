// 使用Caddy 服务器判断, 不再使用JS

// 如果是IE 则跳转到拒绝IE 页面
(function() {
  var inBrowser = typeof window !== 'undefined';
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isIE = UA && /msie|trident|edge/.test(UA);
  if (isIE) {
    // window.location.replace("reject-ie.html");
  }
})();
