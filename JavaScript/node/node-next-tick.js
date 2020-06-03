// macro-task 宏任务, node.js
setImmediate(function () {
  console.log(1);
}, 16);
setTimeout(function () {
  console.log(2);
}, 16);
new Promise(function (resolve) {
  console.log(3);
  resolve();
  console.log(4);
}).then(function () {
  console.log(5);
});
console.log(6);
// micro-task 微任务, node.js
process.nextTick(function () {
  console.log(7);
});
console.log(8);

/*
同步代码执行顺序优先级高于异步代码执行顺序优先级；
new Promise(fn)中的fn是同步执行；
process.nextTick()>Promise.then()>setTimeout>setImmediate。

/// https://www.jianshu.com/p/a39d3e878d06
*/