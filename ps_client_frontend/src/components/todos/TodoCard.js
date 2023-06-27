import dayjs from "dayjs";
import "./todocard.css";
export default function TodoCard({ todo }) {
  function handleUpdateCompleted(value) {
    const prev = value.completed;
    const update = !value.completed;
    console.log({ prev, update, value });
  }

  return (
    <div className="card-wrapper">
      <input
        className="checkbox"
        type="checkbox"
        onChange={() => handleUpdateCompleted(todo)}
        checked={todo.completed}
      />
      <div id="todo-card" className="card">
        <div id="todo-card-header" className="card-header">
          <p className="card-header-text">{todo.title}</p>
          <p className="duedate">
            complete by: {dayjs(todo.dueDate).format("MMMM, DD, YYYY")}
          </p>
        </div>
        <div id="todo-card-body" className="card-body">
          <p>{todo.description}</p>
        </div>
      </div>
    </div>
  );
}
