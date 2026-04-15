import '../css/TodoItem.css';

const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  // check box 변경
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onDeleteTodo = () => {
    const result = confirm('정말로 삭제하시겠습니까?');

    if (result) {
      onDelete(id);
    }
  };

  return (
    <div className="TodoItem">
      <input type="checkbox" checked={isDone} onChange={onChangeCheckbox} />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onDeleteTodo}>삭제</button>
    </div>
  );
};

export default TodoItem;
