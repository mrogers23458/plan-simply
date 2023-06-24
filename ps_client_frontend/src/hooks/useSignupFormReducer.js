import { useReducer } from "react";
import {
  SET_CONFIRM_PASSWORD,
  SET_EMAIL,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_PASSWORD,
  SET_USERNAME,
} from "../constants";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPass: "",
};

const signupFormReducer = (state, action) => {
  switch (action.type) {
    case SET_FIRST_NAME:
      return {
        ...state,
        firstName: action.payload,
      };

    case SET_LAST_NAME:
      return {
        ...state,
        lastName: action.payload,
      };

    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };

    case SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };

    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };

    case SET_CONFIRM_PASSWORD:
      return {
        ...state,
        confirmPass: action.payload,
      };
    default:
      return initialState;
  }
};

const useSignupFormReducer = () => {
  const [state, dispatch] = useReducer(signupFormReducer, initialState);
  return [state, dispatch];
};

export default useSignupFormReducer;
