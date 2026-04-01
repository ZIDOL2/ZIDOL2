// 1. Date 객체를 생성하는 방법
let date1 = new Date(); // 생성자
// console.log(date1); // 현재 날짜와 시간

let date2 = new Date('1997/01/07 10:10:10'); // 문자열로 날짜 생성
// console.log(date2);

// 2. 타임 스탬프
// => 특정 시간이 "1970.01.01 00시 00분 00초"(협정세계시간, UTC)로부터 몇 ms가 지났는지를 나타내는 숫자
let ts1 = date1.getTime(); // date1의 타임 스탬프

let date3 = new Date(ts1);
// console.log(date1, date3);

// 3. 시간 요소 추출 방법
let year = date1.getFullYear(); // 연도
let month = date1.getMonth() + 1; // 월 (0부터 시작하므로 +1)
let date = date1.getDate(); // 일

let hour = date1.getHours(); // 시
let minute = date1.getMinutes(); // 분
let seconds = date1.getSeconds(); // 초

// console.log(year, month, date, hour, minute, seconds);

// 4. 시간 수정하기
date1.setFullYear(2023);
date1.setMonth(2);
date1.setDate(30);
date1.setHours(15);
date1.setMinutes(30);
date1.setSeconds(45);
// console.log(date1);

// 5. 시간을 여러 포맷으로 출력하기
console.log(date1.toDateString()); // 날짜만 출력
console.log(date1.toLocaleString()); // 현지 시간에 맞게 출력
