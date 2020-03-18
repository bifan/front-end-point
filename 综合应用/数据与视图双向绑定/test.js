// 双向绑定<input>

const bidirectional = (() => {
  let _scope = "";
  const _positions = {}; // 记录模板变量的位置
  const _inputsWithKey = {}; // 复用input 元素
  let _data = {};
  let _dataProxy = null;

  // 解析模板 → {{}}
  function parseTemplate() {
    _scope.innerHTML = _scope.innerHTML.replace(
      /\{\{(?:\s+)?(\w+)(?:\s+)?}}/g,
      /*...[]   →  先用剩余语法把所有参数放在一起
        [, $1]  →  再用展开语法只要第二个参数*/
      function(...[, $1]) {
        _positions[$1] = null;
        return `<span position-${$1}></span>`;
      }
    );
    for (const key in _positions) {
      if (_positions.hasOwnProperty(key)) {
        _positions[key] = _scope.querySelectorAll(`span[position-${key}]`);
      }
    }
  }

  // 绑定input 和data
  function bindInput() {
    const inputs = _scope.querySelectorAll("input[learn-bidirectional]");
    for (let input of inputs) {
      input.key = input.getAttribute("learn-bidirectional");
      _inputsWithKey[input.key] = input;
      input.addEventListener("input", function() {
        _dataProxy[this.key] = this.value;
      });
    }
  }

  function setDataProxy() {
    _dataProxy = new Proxy(_data, {
      set(obj, key, value) {
        // fill inputs
        _inputsWithKey[key].value = value;
        // fill template
        _positions[key].forEach(element => {
          element.innerText = value;
        });
        obj[key] = value;
      }
    });
  }

  // 使用代理模式设置data, 以便更新视图
  function setData(data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        _dataProxy[key] = data[key];
      }
    }
  }

  return function init({ scope, data }) {
    _scope = document.querySelector(scope);
    parseTemplate();
    bindInput();
    setDataProxy();
    setData(data);
  };
})();

bidirectional({
  scope: "#scope",
  data: {
    info: "22"
  }
});
