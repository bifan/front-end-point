function swap(array, index1, index2) {
  const tmp = array[index1];
  array[index1] = array[index2];
  array[index2] = tmp;
}

function bubbleSort(array) {
  let isNotSorted = true;
  let arrayLength = array.length;
  while (isNotSorted) {
    isNotSorted = false;
    for (let i = 0; i < arrayLength - 1; i++) {
      // 边界控制: <, -1
      if (array[i] > array[i + 1]) {
        swap(array, i, i + 1);
        isNotSorted = true; // 继续下一轮
      }
    }
    arrayLength--; // 已经排序完毕的那部分不再参与比较了
  }
}

export { bubbleSort };
