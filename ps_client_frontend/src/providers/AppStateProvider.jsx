import { createContext, useReducer, useContext, useEffect } from "react";
import { SET_USER } from "../constants";
import { GET_ME } from "../hooks/queries/userQueries";
import client from "../apolloClient";
const initialState = {
  user: null,
};

const AppStateContext = createContext(null);

const appStateReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.me,
      };
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
          console.log(me);
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
