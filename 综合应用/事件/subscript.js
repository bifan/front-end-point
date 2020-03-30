// 订阅/发布模式实现

class Subscribe {
  // static msg = "hi"; // static → Subscribe.msg, Subscribe 作为对象
  // fn() {console.log(1);} // Subscribe.prototype.fn, 函数只能写在constructor 外面
  constructor() {}
  _pool = new Set();
  // _pool = []; //new Set();
  // _poolDelBuffer = []; 本想用来解决数组塌陷, 不过用Set 解决了
  get pool() {
    return this._pool;
  }
  add(fn) {
    // this._pool.push(fn);
    this._pool.add(fn); // Set 去重
  }
  del(fn) {
    // this._pool.splice(this._pool.indexOf(fn), 1)
    this._pool.delete(fn); // Set 不怕塌陷
    // this._poolDelBuffer.push(fn);
  }
  fire(...args) {
    this._pool.forEach(fn => {
      fn.call(this, ...args);
    });
    // while (this._poolDelBuffer.length > 0) {
    //   this._pool.delete(this._poolDelBuffer.pop());
    // }
  }
}