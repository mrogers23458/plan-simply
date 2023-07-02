/* Framework tools & CSS */
import React, { useEffect } from "react";
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
import { UPDATE_TODO } from "../../hooks/mutations/todoMutations";
import { useAppState } from "../../providers/AppStateProvider";

export default function EditTodo({ title, description, dueDate }) {
  const [todoForm, dispatch] = useCreateTodoReducer();
  const [{ currentTodo }, appStateDispatch] = useAppState();

  useEffect(() => {
    dispatch({
      type: SET_TODO_TITLE,
      payload: title,
    });
    dispatch({
      type: SET_TODO_DESCRIPTION,
      payload: description,
    });
    const formatted = dayjs(dueDate).endOf("day").format();
    dispatch({
      type: SET_TODO_DUE_DATE,
      payload: formatted,
    });
  }, [title, description, dueDate, dispatch]);

  const [updateTodo] = useMutation(UPDATE_TODO, {
    onCompleted: ({ todoResponse }) => {
      const updated = todoResponse.todo;
      appStateDispatch({
        type: SET_USER,
        payload: { me: todoResponse.user },
      });
      appStateDispatch({
        type: SET_TODO,
        payload: { ...updated, editing: false },
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

  function handleSaveTodo() {
    updateTodo({
      variables: {
        editTodoId: currentTodo.id,
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
        value={todoForm.title}
      />
      <label>Description</label>
      <textarea
        className="description-text-area"
        onChange={(e) => handleDescription(e.target.value)}
        value={todoForm.description}
      />
      <div className="due-date-button-wrapper">
        <div className="due-date-wrapper">
          <label>Due Date</label>
          <input
            type="date"
            className="create-date-picker"
            onChange={(e) => handleDueDate(e.target.value)}
            value={dayjs(todoForm.dueDate).format("YYYY-MM-DD")}
          />
        </div>
        <div className="button create-button" onClick={handleSaveTodo}>
          Save
        </div>
      </div>
    </div>
  );
}
