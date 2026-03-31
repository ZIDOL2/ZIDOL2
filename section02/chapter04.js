// 1. Spread 연산자
// => Spread : 흩뿌리다, 펼치다
// => 객체나 배열에 저장된 여러개의 값을 개별로 흩뿌려주는 역할

let arr1 = [1, 2, 3];
let arr2 = [4, ...arr1, 5];
// console.log(arr2); // [4, 1, 2, 3, 5]

let obj1 = {
  a: 1,
  b: 2,
};

let obj2 = {
  ...obj1,
  c: 3,
  d: 4,
};

//console.log(obj2); // { a: 1, b: 2, c: 3, d: 4 }

function funcA(p1, p2, p3) {
  console.log(p1, p2, p3);
}

funcA(...arr1); // 1 2 3

// 2 Rest 매개변수
// => Rest : 나머지, 나머지 매개변수

function funcB(one, ...rest) {
  // 함수를 호출하면서 전달한 모든 인수들이 배열형태로 저장된다.
  // rest 매개변수 뒤에는 다른 매개변수를 사용할 수 없다.
  console.log(rest, one);
}
funcB(1, ...arr1);
