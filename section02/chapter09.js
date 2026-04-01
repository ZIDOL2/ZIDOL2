// 5가지 배열 변형 메서드
// 1. filter() : 배열에서 특정 조건을 만족하는 모든 요소를 새로운 배열로 반환
let arr1 = [
  { name: '홍길동', hobby: '테니스' },
  { name: '정지수', hobby: '테니스' },
  { name: '김철수', hobby: '축구' },
];

const tennisPeople = arr1.filter((item) => item.hobby === '테니스');
// console.log(tennisPeople); // [{ name: '홍길동', hobby: '테니스' }, { name: '정지수', hobby: '테니스' }]

// 2. map() : 배열의 모든 요소를 순회하면서, 각각 콜백함수를 실행하고 그 결과값을 모아 새로운 배열로 변환
let arr2 = [1, 2, 3];
const mapResult1 = arr2.map((item, idx, arr) => {
  return item * 2;
});

// console.log(mapResult1); // [2, 4, 6]

let names = arr1.map((item) => item.name);
// console.log(names); // ['홍길동', '정지수', '김철수']

// 3. sort() : 배열을 사전순으로 정렬하는 메서드
let arr3 = ['b', 'c', 'a', '1', '3', '2'];
let arr4 = [30, 1, 2];
arr3.sort();
arr4.sort(); // 사전순으로 정렬됨 => [30, 1, 2]

// sort() 메서드는 콜백함수에서 양수를 반환하면 a가 b보다 뒤에 오도록,
// 음수를 반환하면 a가 b  보다 앞에 오도록,
// 0을 반환하면 순서를 바꾸지 않도록 동작한다.
arr4.sort((a, b) => {
  if (a < b) {
    // b가 a보다 크면 b가 앞으로 오도록
    return 1;
  } else if (a > b) {
    // a가 b보다 크면 a가 앞으로 오도록
    return -1;
  } else {
    // a와 b가 같으면 순서를 바꾸지 않음
    return 0;
  }
});

// console.log(arr4);

// 내림차순
arr4.sort((a, b) => {
  if (a > b) {
    return -1;
  } else if (a < b) {
    return 1;
  } else {
    return 0;
  }
});

// console.log(arr4);

// 4. toSorted() : 원본 배열은 변경하지 않고, 정렬된 새로운 배열을 반환하는 메서드
let arr5 = ['c', 'b', 'a'];
const sorted = arr5.toSorted();
// console.log(arr5); // ['c', 'b', 'a']
// console.log(sorted); // ['a', 'b', 'c']

// 5. join() : 배열의 모든 요소를 하나의 문자열로 합쳐서 반환하는 메서드
let arr6 = ['hi', 'im', 'winterlood'];
const joined = arr6.join('/'); // 구분자 없이 합쳐짐 () 안에 구분자 입력 가능
console.log(joined); // 'hi/im/winterlood'
