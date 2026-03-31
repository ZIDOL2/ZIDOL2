// 5가지 요소 순회 및 탐색 메서드
// 1. forEach() : 배열의 각 요소에 대해 주어진 함수를 실행
let arr1 = [1, 2, 3];
arr1.forEach((item, idx, arr) => {
  // console.log(item, idx);
  // console.log(idx, item * 2, arr);
});

let doubledArr = [];

arr1.forEach((item) => {
  doubledArr.push(item * 2);
});

// console.log(doubledArr); // [2, 4, 6]

// 2. includes() : 배열이 특정 요소를 포함하고 있는지 여부를 반환
let arr2 = [1, 2, 3];
let isInclude1 = arr2.includes(2); // true
let isInclude2 = arr2.includes(4); // false
// console.log(isInclude1, isInclude2); // true false

// 3. indexOf() : 배열에서 특정 요소를 찾을 수 있는 첫 번째 인덱스를 반환
let arr3 = [1, 2, 3, 2];
let index1 = arr3.indexOf(2); // 1
let index2 = arr3.indexOf(4); // -1
// console.log(index1, index2); // 1 -1

// 4. findIndex() : 배열에서 특정 조건을 만족하는 첫 번째 요소의 인덱스를 반환
let arr4 = [1, 2, 3, 4, 5];
const findIndex = arr4.findIndex((item) => item % 2 !== 0);
// console.log(findIndex); // 0

// 5. find() : 배열에서 특정 조건을 만족하는 첫 번째 요소를 반환
let arr5 = [1, 2, 3, 4, 5];
const findItem = arr5.find((item) => item % 2 === 0);
// console.log(findItem); // 2

let arr51 = [{ name: '정지수' }, { name: '홍길동' }, { name: '김철수' }];
const fined = arr51.find((item) => item.name === '김철수'); // { name: '김철수' }
console.log(fined);
