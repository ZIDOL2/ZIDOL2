function returnFalse() {
  console.log('returnFalse() is called');
  return undefined;
}

function returnTrue() {
  console.log('returnTrue() is called');
  return 10;
}

// console.log(returnFalse() && returnTrue());
// console.log(returnFalse() || returnTrue());

// 단락평가 활용 사례
function printName(person) {
  const name = person && person.name;
  console.log(name || 'person 없음');
}

printName();
printName({ name: '정지수' });
