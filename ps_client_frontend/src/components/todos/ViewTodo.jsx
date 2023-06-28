import React, { useState } from "react";
import "./viewtodo.css";

import { useAppState } from "../../providers/AppStateProvider";
import { useMutation } from "@apollo/client";
import { UPDATE_TODO_COMPLETED } from "../../hooks/mutations/todoMutations";
import { SET_TODO, SET_TODO_LIST, SET_USER } from "../../constants";

export default function ViewTodo() {
  const [{ currentTodo, user }, appStateDispatch] = useAppState();
  const [updateCompleted] = useMutation(UPDATE_TODO_COMPLETED, {
    onCompleted: ({ updatedTodo }) => {
      const updatedTodolist = user.todos.map((item) => {
        if (item.id !== updatedTodo.id) {
          return item;
        }
        return updatedTodo;
      });
      appStateDispatch({
        type: SET_USER,
        payload: { me: { ...user, todos: updatedTodolist } },
      });
    },
    onError: (e) => {
      console.log("there was an error", e);
    },
  });

  function handleComplete() {
    updateCompleted({
      variables: { todoId: currentTodo.id, completed: true },
    });
    appStateDispatch({
      type: SET_TODO,
      payload: { ...currentTodo, completed: true },
    });
  }
  function handleUndo() {
    console.log("fired off");
    updateCompleted({
      variables: { todoId: currentTodo.id, completed: false },
    });
    appStateDispatch({
      type: SET_TODO,
      payload: { ...currentTodo, completed: false },
    });
  }
  console.log({ currentTodo });

  return (
    <div className="view-todo-container">
      {currentTodo.id && (
        <div className="view-todo-item">
          <div className="todo-item">
            <p className="todo-title-text">{currentTodo.title}</p>
            <p>{currentTodo.description}</p>
          </div>
          <div id="status" className="status-container">
            <p className="status-text">
              Status: {currentTodo.completed ? "Complete" : "Incomplete"}
            </p>
            {currentTodo.completed && (
              <div className="status-button" onClick={handleUndo}>
                Undo
              </div>
            )}
            {!currentTodo.completed && (
              <div className="status-button" onClick={handleComplete}>
                Complete
              </div>
            )}
          </div>
        </div>
      )}
      {!currentTodo.id && (
        <div className="create-todo-container">
          <label>Title</label>
          <input type="text" />
          <label>Description</label>
          <textarea />
        </div>
      )}
    </div>
  );
}
