import { useReducer } from "react";
import { SET_PASSWORD, SET_USERNAME } from "../constants";

const initialState = {
  username: "",
  password: "",
};

const loginFormReducer = (state, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    default:
      return initialState;
  }
};

const useLoginFormReducer = () => {
  const [state, dispatch] = useReducer(loginFormReducer, initialState);
  return [state, dispatch];
};

export default useLoginFormReducer;
