import React from "react";
import "./profileBtn.css";
import gearIcon from "../../images/gear-solid.svg";

export default function ProfileBtn(props) {
  return (
    <div
      id="profileBtn"
      style={{ height: `${props.size}`, width: `${props.size}` }}
    >
      <img className="gearIcon" src={gearIcon} alt="gear" />
    </div>
  );
}
