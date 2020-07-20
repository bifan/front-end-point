const targetNode = document.querySelector("#target");
targetNode.style = "position: relative";
const clickPoint = document.createElement("div");

// 任意位置, 这里假设了一个
const position = `
  left: 50px;
  top: 60px;
`;

const style = `
  position: absolute;
  width:10px;
  height:10px;
  background-color: white;
`;
// 实际使用要使得元素不可见, 不过为了面试官方便看, 就不隐藏了
// display:none;

clickPoint.style = style + position;

targetNode.appendChild(clickPoint);

clickPoint.click();
