/* Framework & CSS */
import React from "react";
import "./profile.css";
import { useAppState } from "../../providers/AppStateProvider";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const [{ user }, appStateDispatch] = useAppState();
  return (
    <>
      {!user && <Navigate to="/" />}
      <p>This is the profile page.</p>
    </>
  );
}
