import { getRandomArray } from "./random-array.js";
import { bubbleSort } from "./bubble-sort.js";

const array = getRandomArray();
console.log(`original array: ${array}`);
document.body.innerHTML = `original array: ${array}<br>`
bubbleSort(array);
console.log(`sorted array: ${array}`);
document.body.append(`sorted array: ${array}`)
console.log(`version: 2.0`)