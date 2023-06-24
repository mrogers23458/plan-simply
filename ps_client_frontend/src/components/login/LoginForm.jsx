import React from "react";
import { useNavigate } from "react-router-dom";
import "./loginform.css";
import Input from "../Input/Input";
import useLoginFormReducer from "../../hooks/useLoginFormReducer";
import { SET_PASSWORD, SET_USERNAME } from "../../constants";

export default function LoginForm() {
  const navigate = useNavigate();
  const [loginForm, dispatch] = useLoginFormReducer();

  function handleNav(path) {
    console.log("click");
    navigate(`/${path}`);
  }

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

  return (
    <div className="form">
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
        <div className="button">Login</div>
        <div className="button" onClick={() => handleNav("signup")}>
          Sign Up
        </div>
      </div>
    </div>
  );
}
