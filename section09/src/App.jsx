import './css/App.css';
import { useState, useRef, useReducer } from 'react';
import List from './components/List';
import Editor from './components/Editor';
import Header from './components/Header';
import Exam from './components/Exam';

// const mockData = [
//   {
//     id: 0,
//     isDone: true,
//     content: 'React 공부하기',
//     date: new Date().getTime(),
//   },
//   {
//     id: 1,
//     isDone: false,
//     content: '빨래하기',
//     date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     isDone: false,
//     content: '끝내주게 낮잠자기',
//     date: new Date().getTime(),
//   },
// ];

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item,
      );
    case 'DELETE':
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  const onCreate = (content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };

  const onUpdate = (targetId) => {
    // todos State의 값들 중에
    // targetId와 일치하는 id를 갖는 투두 아이템의 isDone 변경
    dispatch({
      type: 'UPDATE',
      targetId,
    });
  };

  const onDelete = (targetId) => {
    // targetId 아닌 요소만 모아서 새 배열 생성
    dispatch({ type: 'DELETE', targetId });
  };

  return (
    <div className="App">
      {/* <Exam /> */}
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
