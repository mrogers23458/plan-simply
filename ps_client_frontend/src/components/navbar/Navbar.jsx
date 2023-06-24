/* Framework Tools & CSS */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  function handleNav(path) {
    navigate(`/${path}`);
  }
  return (
    <div id="header-container" className="header">
      <p className="logo-text" onClick={() => handleNav("")}>
        Plan Simply
      </p>
    </div>
  );
}
