import React from "react";
import "./input.css";

export default function Input({ label, type, onChange, value, placeholder }) {
  return (
    <div className="field-container">
      <label className="label">{label}</label>
      <input
        className="input-field"
        type={type}
        onChange={onChange}
        value={value ?? ""}
        placeholder={placeholder}
      />
    </div>
  );
}
