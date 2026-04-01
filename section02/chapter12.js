/*
function add(a, b, callback) {
  setTimeout(() => {
    const sum = a + b;
    callback(sum);
  }, 3000);
}

add(5, 3, (value) => {
  console.log('히히', value, '뿌뿌');
});
*/

// 음식을 주문하는 상황
function orderFood(menu, callback) {
  setTimeout(() => {
    const food = menu;
    callback(food);
  }, 3000);
}

function cooldownFood(food, callback) {
  setTimeout(() => {
    const cooledFood = food;
    callback(cooledFood);
  }, 2000);
}

function freezeFood(cooldownFood, callback) {
  setTimeout(() => {
    const freezedFood = cooldownFood;
    callback(freezedFood);
  }, 1500);
}

// callback 지옥
orderFood('마라탕', (food) => {
  console.log('음식이 도착했습니다:', food);

  cooldownFood(food, (cooldownFood) => {
    console.log(`${cooldownFood} 식었어요 환불 해주세요.`);

    freezeFood(cooldownFood, (freezedFood) => {
      console.log(`${freezedFood} 얼려드시면 개꿀맛 입니다.`);
    });
  });
});
