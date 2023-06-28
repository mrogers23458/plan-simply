/* Framework tools & CSS */
import React from "react";
import "./createtodo.css";
import useCreateTodoReducer from "../../hooks/useCreateTodoFormReducer";
import {
  SET_TODO,
  SET_TODO_DESCRIPTION,
  SET_TODO_DUE_DATE,
  SET_TODO_TITLE,
  SET_USER,
} from "../../constants";
import dayjs from "dayjs";
import { useMutation } from "@apollo/client";
import { CREATE_TODO } from "../../hooks/mutations/todoMutations";
import { useAppState } from "../../providers/AppStateProvider";

export default function CreateTodo() {
  const [todoForm, dispatch] = useCreateTodoReducer();
  const [, appStateDispatch] = useAppState();

  const [createTodo] = useMutation(CREATE_TODO, {
    onCompleted: ({ todoResponse }) => {
      appStateDispatch({
        type: SET_USER,
        payload: { me: todoResponse.user },
      });
      appStateDispatch({
        type: SET_TODO,
        payload: todoResponse.todo,
      });
    },
    onError: (e) => {
      console.error(`There was an error ${e.message}`);
    },
  });

  /* updates title input */
  function handleTitle(val) {
    dispatch({
      type: SET_TODO_TITLE,
      payload: val,
    });
  }

  /* updates description input */
  function handleDescription(val) {
    dispatch({
      type: SET_TODO_DESCRIPTION,
      payload: val,
    });
  }

  /* updates dueDate input */
  function handleDueDate(val) {
    const formatted = dayjs(val).endOf("day").format();
    dispatch({
      type: SET_TODO_DUE_DATE,
      payload: formatted,
    });
  }

  function handleCreateTodo() {
    createTodo({
      variables: {
        title: todoForm.title,
        description: todoForm.description,
        dueDate: todoForm.dueDate,
      },
    });
  }

  return (
    <div className="create-todo-container">
      <label>Title</label>
      <input
        type="text"
        className="create-input-area"
        onChange={(e) => handleTitle(e.target.value)}
      />
      <label>Description</label>
      <textarea
        className="description-text-area"
        onChange={(e) => handleDescription(e.target.value)}
      />
      <div className="due-date-button-wrapper">
        <div className="due-date-wrapper">
          <label>Due Date</label>
          <input
            type="date"
            className="create-date-picker"
            onChange={(e) => handleDueDate(e.target.value)}
          />
        </div>
        <div className="button create-button" onClick={handleCreateTodo}>
          Create
        </div>
      </div>
    </div>
  );
}
