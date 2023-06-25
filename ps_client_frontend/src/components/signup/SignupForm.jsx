/* Framework Tools & CSS */
import React from "react";
import "./signupform.css";

/* Hooks */
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import useSignupFormReducer from "../../hooks/useSignupFormReducer";

/* Mutations */
import { CREATE_USER } from "../../hooks/mutations/userMutations";

/* Components */
import Input from "../Input/Input";

/* Constants */
import {
  SET_CONFIRM_PASSWORD,
  SET_EMAIL,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_PASSWORD,
  SET_USERNAME,
} from "../../constants";

export default function SignupForm() {
  const [signupForm, dispatch] = useSignupFormReducer();
  const [createUser, { error, loading, data }] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  if (loading) {
    return "Submitting...";
  }

  if (error) {
    return "There was an error";
  }

  if (data) {
    console.log(data);
    localStorage.setItem("token", data.user.token);
    navigate("/dashboard");
  }

  /* Form Handlers */
  function handleFirstName(value) {
    dispatch({
      type: SET_FIRST_NAME,
      payload: value,
    });
  }

  function handleLastName(value) {
    dispatch({
      type: SET_LAST_NAME,
      payload: value,
    });
  }
  function handleEmail(value) {
    dispatch({
      type: SET_EMAIL,
      payload: value,
    });
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

  function handleConfirmPassowrd(value) {
    dispatch({
      type: SET_CONFIRM_PASSWORD,
      payload: value,
    });
  }

  /* API Handlers */
  async function handleSignup() {
    console.log("firing");
    const { firstName, lastName, username, email, password, confirmPass } =
      signupForm;

    if (password === confirmPass) {
      createUser({
        variables: {
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          password: password,
        },
      });
    }
  }

  return (
    <div className="signup-form">
      <Input
        label="First Name"
        type="text"
        value={signupForm.firstName}
        placeholder="Taylor"
        onChange={(e) => handleFirstName(e.target.value)}
      />
      <Input
        label="Last Name"
        type="text"
        value={signupForm.lastName}
        placeholder="Johnson"
        onChange={(e) => handleLastName(e.target.value)}
      />
      <Input
        label="Email"
        type="email"
        value={signupForm.email}
        placeholder="TJ@emailplaceholder.com"
        onChange={(e) => handleEmail(e.target.value)}
      />
      <Input
        label="Username"
        type="text"
        value={signupForm.username}
        placeholder="TJohnson123"
        onChange={(e) => handleUsername(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        value={signupForm.password}
        placeholder="Password"
        onChange={(e) => handlePassword(e.target.value)}
      />
      <Input
        label="Re-type Password *"
        type="password"
        placeholder="Re-type Password"
        value={signupForm.confirmPass}
        onChange={(e) => handleConfirmPassowrd(e.target.value)}
      />
      <div className="signup-button" onClick={() => handleSignup()}>
        Sign Up
      </div>
    </div>
  );
}
