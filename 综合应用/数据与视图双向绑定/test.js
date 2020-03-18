// 双向绑定<input>
const bidirectional = (() => {
  let _data = {};
  let _scope = "";
  const _positions = {};

  function parseTemplate() {
    /*
    ...[, $1]
        ...[]   →  先用剩余语法把所有参数放在一起
        [, $1]  →  再用展开语法只要第二个参数
    */
    _scope.innerHTML = _scope.innerHTML.replace(/\{\{(\w+)}}/g, function(
      ...[, $1]
    ) {
      _positions[$1] = null;
      return `<span position-${$1}></span>`;
    });
    for (const key in _positions) {
      if (_positions.hasOwnProperty(key)) {
        _positions[key] = _scope.querySelectorAll(`span[position-${key}]`);
      }
    }
  }

  function dataToInput() {
    for (const key in _data) {
      if (_data.hasOwnProperty(key)) {
        const input = _scope.querySelector(
          `input[learn-bidirectional="${key}"]`
        );
        input.value = _data[key];
      }
    }
  }

  function fillTemplate(key, value) {
    _data[key] = value;
    _positions[key].forEach(element => {
      element.innerText = value;
    });
  }

  function inputToData() {
    const inputs = _scope.querySelectorAll("input[learn-bidirectional]");
    for (const input of inputs) {
      input.key = input.getAttribute("learn-bidirectional");
      fillTemplate(input.key, input.value); // init page

      input.addEventListener("input", function() {
        fillTemplate(this.key, this.value);
      });
    }
  }

  return function init({ scope, data }) {
    _scope = document.querySelector(scope);
    _data = data;
    parseTemplate();
    dataToInput();
    inputToData();
  };
})();

bidirectional({
  scope: "#scope",
  data: {
    info: "22"
  }
});
