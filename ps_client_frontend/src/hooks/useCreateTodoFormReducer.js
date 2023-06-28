import { useReducer } from "react";
import {
  SET_TODO_DESCRIPTION,
  SET_TODO_DUE_DATE,
  SET_TODO_TITLE,
} from "../constants";

const initialState = {
  title: "",
  description: "",
  dueDate: "",
};

const createTodoReducer = (state, action) => {
  switch (action.type) {
    case SET_TODO_TITLE:
      return { ...state, title: action.payload };
    case SET_TODO_DESCRIPTION:
      return { ...state, description: action.payload };
    case SET_TODO_DUE_DATE:
      return { ...state, dueDate: action.payload };
    default:
      return initialState;
  }
};

const useCreateTodoReducer = () => {
  const [state, dispatch] = useReducer(createTodoReducer, initialState);
  return [state, dispatch];
};

export default useCreateTodoReducer;
