// 1. 배열의 구조 분해 할당
let arr = [1, 2, 3];

let [one, two, three, four] = arr;

// 2. 객체의 구조 분해 할당
let person = {
  name: '정지수',
  age: 27,
  hobby: '낮잠자기',
};

let { name, age: myAge, hobby, address, extra = 'hello' } = person;
// console.log(name, myAge, hobby, address, extra); // 정지수 27 낮잠자기 undefined hello

// 3. 객체 구조분해 할당을 이용해서 함수의 매개변수를 받는 방법
const func = ({ name, age, hobby, address, extra }) => {
  console.log(name, age, hobby, address, extra);
};

// 객체를 넘겼을때만 구조분해 할당을 사용할 수 있다.
func(person);
