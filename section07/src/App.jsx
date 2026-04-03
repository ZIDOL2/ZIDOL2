import './App.css';
import { useState, useEffect, useRef } from 'react';
import Viewer from './components/Viewer';
import Controller from './components/Controller';
import Even from './components/Even';

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  const isMount = useRef(false);

  /*
  // state 변경될 때 마다 콜백함수 호출
  useEffect(() => {
    console.log(`count = ${count} / input = ${input}`);
    }, [count, input]);
    // 의존성 배열
    // dependency array
    // deps
    */

  // 1. 마운트 : 탄생
  useEffect(() => {
    console.log('mount');
  }, []); // deps 빈배열
  // 2. 업데이트 : 변화, 리렌더링
  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }
    console.log('update');
  });
  // 3. 언마운트 : 죽음

  const onClickBtn = (value) => {
    setCount(count + value);
  };

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </section>
      <section id="viewr">
        <Viewer count={count} />
        {count % 2 === 0 ? <Even /> : null}
      </section>
      <section>
        <Controller onClickBtn={onClickBtn} />
      </section>
    </div>
  );
}

export default App;
