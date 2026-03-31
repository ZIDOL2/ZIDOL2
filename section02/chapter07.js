// 6가지의 요소 조작 메서드

// 1. push() : 배열의 끝에 요소 추가
let arr = [1, 2, 3];
arr.push(4); // [1, 2, 3, 4]
arr.push(5, 6); // [1, 2, 3, 4, 5, 6]

const newLength = arr.push(9); // [1, 2, 3, 4, 5, 6, 9]
// console.log(newLength); // 7

// 2. pop() : 배열의 끝에 요소 제거
let arr2 = [1, 2, 3];
const popeditem = arr2.pop(); // [1, 2]
// console.log(popeditem, arr2); // 3 [1, 2]

// 3. shift() : 배열의 앞에 요소 제거
let arr3 = [1, 2, 3];
const shifteditem = arr3.shift(); // [2, 3]

// console.log(shifteditem, arr3); // 1 [2, 3]

// 4. unshift() : 배열의 앞에 요소 추가
let arr4 = [1, 2, 3];
const newLength2 = arr4.unshift(0); // [0, 1, 2, 3]
// console.log(newLength2, arr4); // 4 [0, 1, 2, 3]

// 5. slice() : 배열의 일부분을 잘라서 새로운 배열로 반환
let arr5 = [1, 2, 3, 4, 5];
let sliced = arr5.slice(2, 5); // [3, 4, 5]
let sliced2 = arr5.slice(2); // [3, 4, 5]
let sliced3 = arr5.slice(-1); // [5]
// console.log(sliced); // [3, 4, 5]
// console.log(sliced2); // [3, 4, 5]
// console.log(sliced3); // [5]
// console.log(arr5); // [1, 2, 3, 4, 5] -> 원본 배열은 변경되지 않는다.

// 6. concat() : 배열과 배열을 합쳐서 새로운 배열로 반환
let arr6 = [1, 2];
let arr7 = [3, 4];

let concatedArr = arr6.concat(arr7); // [1, 2, 3, 4]
// console.log(concatedArr); // [1, 2, 3, 4]
