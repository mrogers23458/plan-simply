import dayjs from "dayjs";
import "./todocard.css";
import { useAppState } from "../../providers/AppStateProvider";
export default function TodoCard({ todo }) {
  const [{ user, currentTodo }, appStateDispatch] = useAppState();

  /* When a card is clicked, this function sets the active todo viewable to the side of the todo list */
  function handleSetTodo(id) {
    const activeTodoItem = user.todos.find((item) => item.id === id);
    appStateDispatch({
      type: "SET_TODO",
      payload: activeTodoItem,
    });
  }
  /* This function will make an update on the todo when checkbox is checked or unchecked */
  function handleUpdateCompleted(value) {
    const prev = value.completed;
    const update = !value.completed;
    console.log({ prev, update, value });
  }

  return (
    <div
      className="card-wrapper"
      style={
        currentTodo.id === todo.id
          ? {
              border: "1px solid rgb(20 184 166)",
              boxShadow: "0px 5px 15px 0px rgb(20 184 166)",
            }
          : {}
      }
      key={todo.id}
      id={todo.id}
      onClick={() => handleSetTodo(todo.id)}
    >
      <input
        id="list-item-checkbox"
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
