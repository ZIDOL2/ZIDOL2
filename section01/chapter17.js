// 1. 배열 생성
let arrA = new Array();
let arrB = []; // 배열 리터럴 (대부분 사용)

let arrC = [
  1,
  2,
  3,
  true,
  null,
  'hello',
  [4, 5, 6],
  { name: '정지수' },
  undefined,
  () => {},
];
//console.log(arrC); // [1, 2, 3]

// 2. 배열 요소 접근
let item1 = arrC[0];
let item2 = arrC[1];

//console.log(item1, item2);

arrC[0] = 'hello';
console.log(arrC);
