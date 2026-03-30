// 1. 콜백함수
function main(value) {
  //   console.log(1);
  //   console.log(2);
  //   value();
  //   console.log("end");
}

// function sub() {
//   console.log("I am sub");
// }

// main(sub);

main(function () {
  //   console.log("i am sub");
});

main(() => {
  //   console.log("I am sub");
});

// 2. 콜백함수의 활용
/*
function repeat(cnt) {
  for (let idx = 1; idx <= cnt; idx++) {
    console.log(idx);
  }
}

function repeatDouble(cnt) {
  for (let idx = 1; idx <= cnt; idx++) {
    console.log(idx * 2);
  }
}
  */

function repeat(cnt, callback) {
  for (let idx = 1; idx <= cnt; idx++) {
    callback(idx);
  }
}
repeat(5, function (idx) {
  console.log(idx);
});

repeat(5, function (idx) {
  console.log(idx * 2);
});

// 콜백함수 화살표 표현
repeat(5, (idx) => {
  console.log(idx * 3);
});
