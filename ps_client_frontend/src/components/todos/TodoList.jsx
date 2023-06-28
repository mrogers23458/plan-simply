import { useState } from "react";
import { SET_TODO } from "../../constants";
import { useAppState } from "../../providers/AppStateProvider";
import TodoCard from "./TodoCard";
import "./todolist.css";

export default function TodoList() {
  const [{ user }, appStateDispatch] = useAppState();
  const [filter, setFilter] = useState({
    all: true,
    completed: false,
    incomplete: false,
  });
  function handleAddATodoView() {
    appStateDispatch({
      type: SET_TODO,
      payload: {},
    });
  }
  return (
    <div id="todos-container" className="todos-container">
      <h1>{user.username}'s ToDos</h1>
      <div className="tab-container">
        <div
          className="tab"
          style={filter.all ? { background: "teal", color: "white" } : {}}
          onClick={() =>
            setFilter({
              ...filter,
              all: true,
              completed: false,
              incomplete: false,
            })
          }
        >
          All
        </div>
        <div
          className="tab"
          style={filter.completed ? { background: "teal", color: "white" } : {}}
          onClick={() =>
            setFilter({
              ...filter,
              all: false,
              completed: true,
              incomplete: false,
            })
          }
        >
          Completed
        </div>
        <div
          style={
            filter.incomplete ? { background: "teal", color: "white" } : {}
          }
          className="tab"
          onClick={() =>
            setFilter({
              ...filter,
              all: false,
              completed: false,
              incomplete: true,
            })
          }
        >
          Incomplete
        </div>
      </div>
      <div id="todo-card-container" className="todos-card-container">
        {filter.all &&
          user.todos.length > 0 &&
          user.todos.map((todo) => {
            return <TodoCard todo={todo} key={todo.id} />;
          })}
        {filter.completed &&
          user.todos.length > 0 &&
          user.todos
            .filter((item) => item.completed)
            .map((todo) => {
              return <TodoCard todo={todo} key={todo.id} />;
            })}
        {filter.incomplete &&
          user.todos.length > 0 &&
          user.todos
            .filter((item) => !item.completed)
            .map((todo) => {
              return <TodoCard todo={todo} key={todo.id} />;
            })}
        {!user.todos.length && <p>no todos to show</p>}
      </div>
      <div className="button-container">
        <div className="add-button" onClick={handleAddATodoView}>
          Add a todo
        </div>
      </div>
    </div>
  );
}
