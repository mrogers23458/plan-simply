/* Framework Tools & Client */
import { createContext, useReducer, useContext, useEffect } from "react";
import client from "../apolloClient";
/* Hooks */
import { GET_ME } from "../hooks/queries/userQueries";

/* Constants */
import { SET_USER, SET_TODO, SET_TODO_LIST } from "../constants";
const initialState = {
  user: null,
  currentTodo: {},
  todos: [],
};

const AppStateContext = createContext(null);

const appStateReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      console.log("set user");
      return {
        ...state,
        user: action.payload.me,
      };
    case SET_TODO:
      return {
        ...state,
        currentTodo: action.payload,
      };
    case SET_TODO_LIST: {
      return { ...state, todos: action.payload };
    }
    default:
      return initialState;
  }
};

export const AppStateProvider = ({ children }) => {
  const [appState, dispatch] = useReducer(appStateReducer, initialState);
  const token = localStorage.getItem("ps_token");

  useEffect(() => {
    async function getMe() {
      try {
        const { data: me } = await client.query({ query: GET_ME });
        if (me) {
          console.log("me here", me);
          dispatch({
            type: SET_USER,
            payload: me,
          });
        }
      } catch (e) {
        console.error("there was an error", e.message);
        return;
      }
    }

    if (token) {
      getMe();
    }

    if (!token) {
      return;
    }
  }, [token]);

  return (
    <AppStateContext.Provider value={[appState, dispatch]}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
