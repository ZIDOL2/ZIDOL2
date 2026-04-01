// async
// 어떤 함수를 비동기 함수로 만들어주는 키워드
// 함수가 프로미스를 반환하도록 변환해주는 그런 키워드

async function getData() {
  // 객체를 결과값으로 같는 새로운 promise를 만들어서 반환
  return {
    name: '정지수',
    id: 'jisu',
  };
}

// console.log(getData()); // Promise { { name: '정지수', id: 'jisu' } }

async function getP() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'jisu',
        id: 'jisu',
      });
    }, 1500);
  });
}

// console.log(getP()); // Promise { <pending> }

// await : async 함수 안에서만 사용할 수 있는 키워드
// 비동기 함수가 다 처리되기를 기다리는 역할

async function printData() {
  const data = await getP();
  console.log(data);
}

printData();
