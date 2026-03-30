// 1. if 조건문 (if문)
let num = 1;

if (num >= 10) {
  //   console.log("num은 10 이상입니다.");
} else if (num >= 5) {
  //   console.log("num은 5 이상입니다.");
} else if (num >= 3) {
  //   console.log("num은 3 이상입니다.");
} else {
  //   console.log("조건이 거짓입니다.");
}

// 2. switch 문
// => if문과 기능 자체는 동일
// => 다수의 조건을 처리할 때 직관적으로 처리 가능.
let animal = "owl";
switch (animal) {
  case "cat": {
    console.log("고양이");
    break;
  }
  case "dog": {
    console.log("개");
    break;
  }
  case "bear": {
    console.log("곰");
    break;
  }
  case "snake": {
    console.log("뱀");
    break;
  }
  case "tiger": {
    console.log("호랑이");
    break;
  }
  default: {
    console.log("뿌애앵");
  }
}
