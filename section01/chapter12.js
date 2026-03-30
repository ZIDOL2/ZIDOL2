// 1. 함수 표현식
function funcA() {
  console.log("funcA");
}

// 함수도 변수에 담을 수 있음
let varA = funcA;

// 익명함수 (이름이 없음)
let varB = function funcB() {
  console.log("funcB");
};

//varB();

// 2. 화살표 함수
let varC = () => {
  return 1;
};

console.log(varC());

let varD = () => 1;

console.log(varD());

let varE = (value) => {
  console.log(value);
  return value + 1;
};

console.log(varE(10));
