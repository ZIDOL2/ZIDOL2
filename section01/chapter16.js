// 1. 상수 객체
const animal = {
  type: '고양이',
  name: '나비',
  color: 'black',
};

// animal = { a: 1 };  // 에러

animal.age = 2; // 추가
animal.name = '냥이'; // 수정
delete animal.color; // 삭제

// 2. 메서드
// => 객체의 프로퍼티 중에서 함수인 프로퍼티를 메서드라고 부른다.

const person = {
  name: '정지수',
  // 메서드 선언 : 객체의 동작을 정의할 때 사용
  sayhi: function () {
    console.log(`안녕하세요, 저는 ${this.name}입니다.`);
  },
};

person.sayhi(); // 안녕하세요, 저는 정지수입니다.
person['sayhi'](); // 안녕하세요, 저는 정지수입니다.
