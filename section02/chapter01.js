// 1. Falsy한 값
let f1 = undefined;
let f2 = null;
let f3 = 0;
let f4 = -0;
let f5 = NaN;
let f6 = '';
let f7 = 0n; // BigInt의 0

// 2. Truthy한 값
// ->  Falsy한 값을 제외한 모든 값
let t1 = 'hello';
let t2 = 123;
let t3 = [];
let t4 = {};
let t5 = () => {};

// 3. 활용사례
/*
function printName(person) {
  if (person === undefined || person === null) {
    console.log('person 없음');
    return;
  }
  console.log(person.name);
}
*/

function printName(person) {
  if (!person) {
    // person이 falsy한 값이면
    console.log('person 없음');
    return;
  }
  console.log(person.name);
}

let person = { name: '정지수' };
printName(person); // 정지수

let person2 = null;
printName(person2); // TypeError: Cannot read property 'name' of undefined
