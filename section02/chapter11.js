console.log(1);

// 비동기 작업들은 자바스크립트 엔진이 아닌 Web APIs에서 처리한다.
// js 엔진은 쓰레드가 1개밖에 없기 때문에, 비동기 작업이 js 엔진에서 처리되면, js 엔진이 멈춰버린다.
setTimeout(() => {
  console.log(2);
}, 3000);

console.log(3);
