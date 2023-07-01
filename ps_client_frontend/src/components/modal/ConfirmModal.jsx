/* Framework & CSS */
import React from "react";
import "./confirmmodal.css";
import { useAppState } from "../../providers/AppStateProvider";
import { SET_TODO, SET_USER } from "../../constants";
import { useMutation } from "@apollo/client";
import { DELETE_TODO } from "../../hooks/mutations/todoMutations";

export default function ConfirmModal() {
  const [{ currentTodo }, appStateDispatch] = useAppState();
  const [deleteTodo] = useMutation(DELETE_TODO, {
    onCompleted: ({ todoResponse }) => {
      appStateDispatch({
        type: SET_TODO,
        payload: { editing: false, delete: false },
      });
      appStateDispatch({
        type: SET_USER,
        payload: { me: todoResponse.user },
      });
    },
    onError: (e) => {
      console.error(`There was an error ${e.message}`);
    },
  });

  function handleCancel() {
    appStateDispatch({
      type: SET_TODO,
      payload: { ...currentTodo, delete: false },
    });
  }

  function handleConfirm() {
    deleteTodo({ variables: { id: currentTodo.id } });
  }
  return (
    <div className="modal-wrapper">
      <p className="modal-text">Are you sure you want to delete this Todo?</p>
      <div className="modal-button-container">
        <div className="md-button" onClick={handleConfirm}>
          Yes
        </div>
        <div className="md-button" onClick={handleCancel}>
          No
        </div>
      </div>
    </div>
  );
}
