import React from "react";
import "./signupform.css";

export default function SignupForm() {
  return (
    <div className="form">
      <div className="field-container">
        <label className="label" htmlFor="username">
          Username
        </label>
        <input className="input-field" type="text" />
      </div>
      <div className="field-container">
        <label className="label" htmlFor="password">
          Password
        </label>
        <input className="input-field" type="password" />
      </div>
      <div className="button-container">
        <div className="button">Login</div>
        <div className="button">Sign Up</div>
      </div>
    </div>
  );
}
