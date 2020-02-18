// 从指定范围内随机得到一个十进制数字
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}

// 产生一个随机数组. 数组长度随机; 数组中每一项的值随机
function getRandomArray(
  minArrayLength = 5,
  MaxArrayLength = 15,
  minValue = 1,
  MaxValue = 20
) {
  const array = [];
  for (
    let i = getRandomIntInclusive(minArrayLength, MaxArrayLength);
    i > 0;
    i--, array.push(getRandomIntInclusive(minValue, MaxValue))
  );
  return array;
}

export { getRandomArray };

// consoleeee("err here")
