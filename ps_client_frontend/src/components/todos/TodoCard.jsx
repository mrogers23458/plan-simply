/* Framework Tools & CSS*/
import React from "react";
import { useMutation } from "@apollo/client";
import dayjs from "dayjs";
import "./todocard.css";

/* Hooks */
import { useAppState } from "../../providers/AppStateProvider";
import { UPDATE_TODO_COMPLETED } from "../../hooks/mutations/todoMutations";

/* Icons and Images */
import editIcon from "../../images/editIcon.svg";
import deleteIcon from "../../images/deleteIcon.svg";

/* Constants */
import { SET_TODO, SET_USER } from "../../constants";
import ConfirmModal from "../modal/ConfirmModal";

export default function TodoCard({ todo }) {
  const [{ user, currentTodo }, appStateDispatch] = useAppState();
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
      appStateDispatch({
        type: SET_TODO,
        payload: updatedTodo,
      });
    },
    onError: (e) => {
      console.error("there was an error", e);
    },
  });

  /* When a card is clicked, this function sets the active todo viewable to the side of the todo list */
  function handleSetTodo(value) {
    if (value.id !== "edit" && value.id !== "delete") {
      appStateDispatch({
        type: "SET_TODO",
        payload: todo,
      });
    }
  }
  /* This function will make an update on the todo when checkbox is checked or unchecked */
  function handleUpdateCompleted(value) {
    updateCompleted({
      variables: { todoId: value.id, completed: !value.completed },
    });
  }

  function handleEditClick() {
    appStateDispatch({
      type: SET_TODO,
      payload: { ...todo, editing: true },
    });
  }

  function handleDeleteClick() {
    appStateDispatch({
      type: SET_TODO,
      payload: { ...todo, delete: true },
    });
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
      onClick={(e) => handleSetTodo(e.target)}
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
            Due on - {dayjs(todo.dueDate).format("MMMM, DD, YYYY")}
          </p>
          <div id="action-icons" className="action-icons-container">
            <img
              id="edit"
              onClick={handleEditClick}
              className="card-edit-icon"
              src={editIcon}
              alt="pencil-edit-icon"
            />
            <img
              id="delete"
              onClick={handleDeleteClick}
              className="card-edit-icon"
              src={deleteIcon}
              alt="trash-delete-icon"
            />
          </div>
        </div>
        <div id="todo-card-body" className="card-body">
          <p>{todo.description}</p>
        </div>
      </div>
      {currentTodo.delete && currentTodo.id === todo.id && <ConfirmModal />}
    </div>
  );
}
