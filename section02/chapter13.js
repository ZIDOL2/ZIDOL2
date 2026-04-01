// Promise는 비동기 작업을 감싸는 객체이다.

function add10(num) {
  const promise = new Promise((resolve, reject) => {
    // 비동기 작업
    // excutor

    setTimeout(() => {
      if (typeof num === 'number') {
        resolve(num + 10);
      } else {
        reject('num은 숫자가 아닙니다.');
      }
    }, 2000);
  });

  return promise;
}

/*
// promise chaining(then, catch..)
promise
  .then((val) => {
    console.log(val);
  })
  .catch((err) => {
    console.log(err);
  });

  */

const p = add10(0);
p.then((result) => {
  console.log(result); // 10
  return add10(result);
}).then((result) => {
  console.log(result); // 20
});

add10(5)
  .then((result) => {
    console.log(result); // 15
    return add10(result);
  })
  .then((result) => {
    console.log(result); // 25
    return add10('뿌뿌');
  })
  .then((result) => {
    console.log(result); // 35
  })
  .catch((err) => {
    console.log(err);
  });
