import React from "react";
import PropTypes from "prop-types";
import "./input.css";

export default function Input({ label, type, onChange, value, placeholder }) {
  return (
    <div className="field-container">
      <label className="label">{label}</label>
      {type !== "textarea" && (
        <input
          className="input-field"
          type={type}
          onChange={onChange}
          value={value ?? ""}
          placeholder={placeholder}
        />
      )}
      {type === "textarea" && <textarea className="todo-description-area" />}
    </div>
  );
}

Input.propTypes = {
  // String to lable what the input is for e.g. "Username"
  label: PropTypes.string,
  // String that defines what type of input is accepted e.g. "text" or "checkbox"
  type: PropTypes.string,
  // Function to handle onChange actions
  onChange: PropTypes.func,
  // String to track what the user inputs
  value: PropTypes.string,
  // String for default text in input field
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  label: "input",
  type: "text",
  onChange: undefined,
  value: undefined,
  placeholder: "input",
};
