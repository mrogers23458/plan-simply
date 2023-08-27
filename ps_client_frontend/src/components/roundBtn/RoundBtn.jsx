import React from "react";
import PropTypes from "prop-types";
import "./roundBtn.css";

export default function RoundBtn({ size, icon }) {
  return (
    <div id="roundBtn" style={{ height: size, width: size }}>
      <img className={icon} src={icon} alt={icon} />
    </div>
  );
}

RoundBtn.propTypes = {
  // String of sizes to be passed to inline style e.g. "50px"
  size: PropTypes.string,
  // String of path to icon e.g. "../../images/icon.svg"
  icon: PropTypes.string,
};

RoundBtn.defaultProps = {
  // can be undefined or px
  size: "2vh",
  icon: undefined,
};
