export function add(a, b) {
  return a + b;
}

export function sub(a, b) {
  return a - b;
}

// CJS (Common JS 모듈 시스템)
// 객체 형태로 내보낸다.
// key:value(함수명) -> 값이 같으면 생략 가능
/*
module.exports = {
  add,
  sub,
};
*/

//export { add, sub };

// 모듈을 대표하는 default값을 내보내는 방법
export default function multiply(a, b) {
  return a * b;
}
