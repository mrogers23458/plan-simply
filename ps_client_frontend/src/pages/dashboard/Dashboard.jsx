/* Framework & CSS */
import React from "react";
import "./dashboard.css";

/* Hooks */
import { useAppState } from "../../providers/AppStateProvider";
import { Navigate } from "react-router-dom";

/* Components */
import TodoList from "../../components/todos/TodoList";
import ViewTodo from "../../components/todos/ViewTodo";

export default function Dashboard() {
  const [{ user }, appStateDispatch] = useAppState();

  return (
    <>
      {user && user.todos && (
        <div id="dashboard-container" className="dashboard-container">
          <TodoList />
          <ViewTodo />
        </div>
      )}
      {!user && <Navigate to="/" />}
    </>
  );
}
