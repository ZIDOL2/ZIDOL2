// ESM
import randomColor from 'randomcolor';
import { add, sub } from './math.js';
import mul from './math.js ';

import col from 'randomcolor';

/* CJS
const moduleData = require('./math');
console.log(moduleData.add(1, 2));
console.log(moduleData.sub(1, 2));
*/
//const { add, sub } = require('./math');

// console.log(add(1, 2));
// console.log(sub(1, 2));
// console.log(mul(2, 3));

// ES모듈 시스템은 import 방법이다.
// package.json에 "type":"module"을 추가하면d 된다.

// 라이브러리 이용
const color = randomColor();
console.log(color);
