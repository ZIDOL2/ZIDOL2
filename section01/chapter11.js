// 함수 선언
/*
function greeting(num) {
  console.log(`안녕하세요! ${num}`);
}

console.log("호출 전");
greeting(10);
console.log("호출 후");
*/

// 호이스팅(끌어올리다)
// => 선언문을 호출문보다 아래에 두어도 정상적으로 실행된다.
let area1 = getArea(10, 20); // 인수
let area2 = getArea(30, 60); // 인수

console.log(area1, area2);

function getArea(width, height) {
  function another() {
    console.log("another");
  }

  another();
  // 매개변수
  let area = width * height;

  return area; // 반환값(한수 홀출의 결과값)
  //console.log("끝났어요");
}
