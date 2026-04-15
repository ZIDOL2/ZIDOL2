import './css/App.css';
import { useState, useRef } from 'react';
import List from './components/List';
import Editor from './components/Editor';
import Header from './components/Header';

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

function App() {
  const [todos, setTodos] = useState([]);
  const idRef = useRef(0);

  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    setTodos([...todos, newTodo]);
  };

  const onUpdate = (targetId) => {
    // todos State의 값들 중에
    // targetId와 일치하는 id를 갖는 투두 아이템의 isDone 변경
    setTodos(
      todos.map((todo) =>
        todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo,
      ),
    );
  };

  const onDelete = (targetId) => {
    // targetId 아닌 요소만 모아서 새 배열 생성
    const afterRemove = todos.filter((todo) => todo.id !== targetId);
    setTodos(afterRemove);
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} removeTodo={onDelete} />
    </div>
  );
}

export default App;
