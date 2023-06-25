/* Framework & CSS */
import React from "react";
import "./dashboard.css";

/* Formatters */
import dayjs from "dayjs";

/* Hooks */
import { useAppState } from "../../providers/AppStateProvider";

export default function Dashboard() {
  const [{ user }, appStateDispatch] = useAppState();
  console.log({ user, appStateDispatch });

  function handleUpdateTodo(value) {
    const prev = value.completed;
    const update = !value.completed;
    console.log({ prev, update, value });
  }
  return (
    <div id="dashboard-container" className="dashboard-container">
      {user && (
        <>
          <div id="todos-container" className="todos-container">
            <h1>{user.username}'s ToDos</h1>
            <div id="todo-card-container" className="todos-card-container">
              {user.todos.map((todo, index) => {
                console.log({ todo });
                return (
                  <div className="card-wrapper">
                    <input
                      className="checkbox"
                      type="checkbox"
                      onChange={() => handleUpdateTodo(todo)}
                      checked={todo.completed}
                    />
                    <div id="todo-card" key={index} className="card">
                      <div id="todo-card-header" className="card-header">
                        <p className="card-header-text">{todo.title}</p>
                        <p className="duedate">
                          complete by:{" "}
                          {dayjs(todo.dueDate).format("MMMM, DD, YYYY")}
                        </p>
                      </div>
                      <div id="todo-card-body" className="card-body">
                        <p>{todo.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {!user && <p>Loading ToDo List..</p>}
    </div>
  );
}
