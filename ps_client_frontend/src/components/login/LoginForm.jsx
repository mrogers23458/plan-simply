/* Framework Tools & CSS */
import React from "react";
import "./loginform.css";

/* Hooks */
import { Link, useNavigate } from "react-router-dom";
import useLoginFormReducer from "../../hooks/useLoginFormReducer";
import { useMutation } from "@apollo/client";

/* Components */
import Input from "../Input/Input";

/* Constants */
import { SET_PASSWORD, SET_USER, SET_USERNAME } from "../../constants";
import { LOGIN } from "../../hooks/mutations/userMutations";
import { useAppState } from "../../providers/AppStateProvider";

export default function LoginForm() {
  const navigate = useNavigate();
  const [loginForm, dispatch] = useLoginFormReducer();
  const [{ user }, appStateDispatch] = useAppState();

  const [login, { error }] = useMutation(LOGIN, {
    onError: (e) => {
      console.error("there was error", e.message);
    },
    onCompleted: ({ data }) => {
      localStorage.setItem("ps_token", data.token);
      appStateDispatch({
        type: SET_USER,
        payload: { me: data.user },
      });
      navigate("/dashboard");
    },
  });

  function handleUsername(value) {
    dispatch({
      type: SET_USERNAME,
      payload: value,
    });
  }

  function handlePassword(value) {
    dispatch({
      type: SET_PASSWORD,
      payload: value,
    });
  }

  async function handleLogin(value) {
    const { username, password } = value;
    login({
      variables: {
        username: username,
        password: password,
      },
    });
  }

  /* To log user out, remove token from storage, and refresh window */
  function handleLogout() {
    localStorage.removeItem("ps_token");
    window.location.reload();
  }

  return (
    <div className="form">
      {!user && (
        <>
          {error && <p>{error.message}</p>}
          <Input
            type="text"
            label="Username"
            onChange={(e) => handleUsername(e.target.value)}
            value={loginForm.username}
            placeholder="Username"
          />
          <Input
            type="password"
            label="Password"
            onChange={(e) => handlePassword(e.target.value)}
            value={loginForm.password}
            placeholder="Password"
          />
          <div className="button-container">
            <div className="button" onClick={() => handleLogin(loginForm)}>
              Login
            </div>
            <Link className="button" to="/signup">
              Signup
            </Link>
          </div>
        </>
      )}
      {user && (
        <div className="loggedIn">
          <p>You are already logged in as {user.username}</p>
          <div className="button-container">
            <Link to="/dashboard" className="button">
              Dash
            </Link>
            <div className="button" onClick={handleLogout}>
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
