import '../css/List.css';
import TodoItem from './TodoItem.jsx';
import { useState } from 'react';

const List = ({ todos, onUpdate, onDelete }) => {
  const [search, setSarch] = useState('');

  const onChgSearch = (e) => {
    setSarch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === '') {
      return todos;
    }

    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase()),
    );
  };

  const filteredTodos = getFilteredData();

  return (
    <div className="List">
      <h4>Todo List ⏰</h4>
      <input placeholder="검색어를 입력하세요." onChange={onChgSearch} />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
