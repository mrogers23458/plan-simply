import React from "react";
import PropTypes from "prop-types";
import "./userDetail.css";

export default function UserDetail({ label, value }) {
  return (
    <div className="detail-container">
      <label className="label">{label}</label>
      <p className="value">{value}</p>
    </div>
  );
}

UserDetail.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};
