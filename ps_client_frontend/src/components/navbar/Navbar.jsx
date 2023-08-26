/* Framework Tools & CSS */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { handleLogout } from "../../helpers/helpers";
import { useAppState } from "../../providers/AppStateProvider";
import ProfileBtn from "../../components/profileBtn/ProfileBtn";

export default function Navbar() {
  const navigate = useNavigate();
  const [{ user }] = useAppState({});
  console.log({ user });
  function handleNav(path) {
    navigate(`/${path}`);
  }
  return (
    <div id="header-container" className="header">
      <p className="logo-text" onClick={() => handleNav("")}>
        Plan Simply
      </p>
      {user && (
        <div className="button-container">
          <Link to="/" className="button">
            Home
          </Link>
          <div className="button" onClick={handleLogout}>
            Logout
          </div>
          <div className="align">
            <Link to="/profile">
              <ProfileBtn size="2vh" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
