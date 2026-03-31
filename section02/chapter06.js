// 1. 배열 순회
let arr = [1, 2, 3];

// 1-1. 배열 인덱스
for (let i = 0; i < arr.length; i++) {
  // console.log(arr[i]);
}

let arr2 = [4, 5, 6, 7, 8];
for (let i = 0; i < arr2.length; i++) {
  // console.log(arr2[i]);
}

// 1-2. for of 반복문
for (let item of arr) {
  console.log(item);
}

// 2. 객체 순회
let person = {
  name: '정지수',
  age: 27,
  hobby: '낮잠자기',
};

// 2-1. Object.keys() : 객체의 키들을 배열로 반환
// => 객체에서 key 값들만 모아서 새로운 배열로 반환
let keys = Object.keys(person);
// console.log(keys); // ['name', 'age', 'hobby']

for (let key of keys) {
  const value = person[key];
  // console.log(key, value);
}

// 2-2. Object.values() : 객체의 값들을 배열로 반환
// => 객체에서 value 값들만 모아서 새로운 배열로 반환
let values = Object.values(person);
// console.log(values); // ['정지수', 27, '낮잠자기']
for (let value of values) {
  // console.log(value);
}

// 2-3. for in
for (let key in person) {
  const value = person[key];
  // console.log(key, value);
}

// of는 배열, in은 객체 !!
