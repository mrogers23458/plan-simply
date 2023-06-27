/* Framework & CSS */
import React from "react";
import "./dashboard.css";

/* Hooks */
import { useAppState } from "../../providers/AppStateProvider";
import { Navigate } from "react-router-dom";
import TodoCard from "../../components/todos/TodoCard";

export default function Dashboard() {
  const [{ user }, appStateDispatch] = useAppState();
  console.log({ user });
  console.log({ user, appStateDispatch });

  return (
    <>
      {user && (
        <div id="dashboard-container" className="dashboard-container">
          {user && user.todos && (
            <>
              <div id="todos-container" className="todos-container">
                <h1>{user.username}'s ToDos</h1>
                <div id="todo-card-container" className="todos-card-container">
                  {user.todos.length > 0 &&
                    user.todos.map((todo) => {
                      return <TodoCard todo={todo} key={todo.id} />;
                    })}
                  {!user.todos.length && <p>no todos to show</p>}
                </div>
              </div>
            </>
          )}
          {!user && <p>Loading ToDo List..</p>}
        </div>
      )}
      {!user && <Navigate to="/" />}
    </>
  );
}
